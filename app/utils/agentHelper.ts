import { createPublicClient, createWalletClient, custom, http } from "viem";
import { Address } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import Safe, { getSafeAddressFromDeploymentTx } from "@safe-global/protocol-kit";
import { CdpWalletProvider } from "@coinbase/agentkit";

const RPC_URL = "https://sepolia.base.org";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
});

// forward standard eip1193 methods to CDP Wallet Provider
const transformTransport = (cdpProvider: CdpWalletProvider) => {
  const transport = custom({
    async request({ method, params }) {
      if (method === "eth_sendTransaction") {
        return cdpProvider.sendTransaction(params);
      }

      // Signing methods
      if (method === "personal_sign") {
        return cdpProvider.signMessage(params[0]);
      }

      if (method === "eth_signTypedData_v4") {
        return cdpProvider.signTypedData(params[0]);
      }
    },
  });

  return transport;
};

// create a safe from agent account (cdp wallet provider)
export const createSafeFromAgent = async (agentAccount: CdpWalletProvider, employerAddress: Address, employeeAddress: Address) => {
  console.log(employerAddress);

  const client = createWalletClient({ chain: baseSepolia, transport: transformTransport(agentAccount) });

  const agentAddress = await agentAccount.getAddress();
  const safeClient = await Safe.init({
    provider: client.transport,
    signer: agentAddress,
    predictedSafe: {
      safeAccountConfig: {
        owners: [employerAddress, employeeAddress, agentAddress],
        threshold: 1,
      },
    },
  });

  if (await safeClient.isSafeDeployed()) {
    console.log("safe already deployed");
  }

  const deploymentTransaction = await safeClient.createSafeDeploymentTransaction();

  const transactionHash = await agentAccount.sendTransaction({
    to: deploymentTransaction.to,
    value: BigInt(deploymentTransaction.value),
    data: deploymentTransaction.data as `0x${string}`,
  });

  // wait for the transaction to be done
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: transactionHash,
  });

  const safeAddress = getSafeAddressFromDeploymentTx(receipt, "1.4.1");

  console.log("safeclient", deploymentTransaction, await safeClient.isSafeDeployed(), await safeClient.getAddress(), safeClient.getPredictedSafe());

  return safeAddress;
};

// we should have another way to provide actions to CDP agent kit instead
