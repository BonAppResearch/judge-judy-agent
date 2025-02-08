/* eslint no-use-before-define: 0 */ // --> OFF

import Safe from "@safe-global/protocol-kit";
import { Address, Client, WalletClient } from "viem";
import { baseSepolia } from "viem/chains";

export const getAgentSigner = async () => {
  return null;
};

// TODO: get the agent signer address from agentkit / env
const AGENT_SIGNER_ADDRESS = "0x0000000000000000000000000000000000000000";
const RPC_URL = "https://sepolia.base.org";

export const createSafeClient = async (
  currentSigner: WalletClient,
  counterPartySigner: Address
) => {
  console.log(currentSigner.transport);

  const address = (await currentSigner.requestAddresses())[0];
  console.log(address);
  const safeClient = await Safe.init({
    provider: RPC_URL,
    signer: address,
    predictedSafe: {
      safeAccountConfig: {
        owners: [address],
        threshold: 1,
      },
    },
  });

  if (await safeClient.isSafeDeployed()) {
    console.log("safe already deployed");
    return safeClient;
  }

  const deploymentTransaction =
    await safeClient.createSafeDeploymentTransaction();

  const transactionHash = await currentSigner.sendTransaction({
    to: deploymentTransaction.to,
    value: BigInt(deploymentTransaction.value),
    data: deploymentTransaction.data as `0x${string}`,
    chain: baseSepolia,
    account: address,
  });

  console.log(
    "safeclient",
    deploymentTransaction,
    await safeClient.isSafeDeployed(),
    await safeClient.getAddress(),
    safeClient.getPredictedSafe()
  );

  return safeClient;
};

// Create a new Safe account
export const storeSafeRecord = async (
  safeAddress: string,
  ownerAddress: string
) => {
  const response = await fetch("/api/safe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      safeAddress: "0x...",
      ownerAddress: "0x...",
    }),
  });
  const data = await response.json();
  console.log(data);
};

// Fetch all Safe accounts
export const getSafesRecords = async () => {
  const response = await fetch("/api/safe");
  const data = await response.json();
  console.log(data);
};
