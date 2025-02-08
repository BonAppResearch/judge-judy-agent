import Safe from "@safe-global/protocol-kit";
import { Address, Client, WalletClient } from "viem";
import { baseSepolia } from "viem/chains";

export const getAgentSigner = async () => {
  return null;
};

// TODO: get the agent signer address from agentkit / env
const AGENT_SIGNER_ADDRESS = "0x0000000000000000000000000000000000000000";
const RPC_URL = "https://sepolia.base.org";

// listing from apis
export const listRecordsForEmployer = async (employerAddress: Address) => {
  const response = await fetch(`/api/safe?employerAddress=${employerAddress}`);
  const data = await response.json();
  console.log(data);

  return data;
};

export const listRecordsForEmployee = async (employeeAddress: Address) => {
  const response = await fetch(`/api/safe?employeeAddress=${employeeAddress}`);
  const data = await response.json();
  console.log(data);

  return data;
};

// get / create the safe clients
export const getDeployedSafeClient = async (safeAddress: Address, signer: Address) => {
  const safeClient = await Safe.init({
    provider: RPC_URL,
    safeAddress: safeAddress,
    signer: signer,
  });

  if (!(await safeClient.isSafeDeployed())) {
    throw new Error("Safe not deployed");
  }

  return safeClient;
};

// assuming only employer will start this process, employer = signer.
export const getNewSafeClient = async (employerAccount: WalletClient, employeeAddress: Address) => {
  console.log(employerAccount.transport);

  const employerAddress = (await employerAccount.requestAddresses())[0];
  console.log(employerAddress);

  const safeClient = await Safe.init({
    provider: RPC_URL,
    signer: employerAccount,
    predictedSafe: {
      safeAccountConfig: {
        owners: [employerAddress, employeeAddress, AGENT_SIGNER_ADDRESS],
        threshold: 1,
      },
    },
  });

  if (await safeClient.isSafeDeployed()) {
    console.log("safe already deployed");
    return safeClient;
  }

  const deploymentTransaction = await safeClient.createSafeDeploymentTransaction();

  const transactionHash = await employerAccount.sendTransaction({
    to: deploymentTransaction.to,
    value: BigInt(deploymentTransaction.value),
    data: deploymentTransaction.data as `0x${string}`,
    chain: baseSepolia,
    account: employerAddress,
  });

  console.log("safeclient", deploymentTransaction, await safeClient.isSafeDeployed(), await safeClient.getAddress(), safeClient.getPredictedSafe());

  return safeClient;
};

export const storeSafeRecord = async (safeAddress: string, employerAddress: string, employeeAddress: string) => {
  const response = await fetch("/api/safe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      safeAddress: safeAddress,
      employerAddress,
      employeeAddress,
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
