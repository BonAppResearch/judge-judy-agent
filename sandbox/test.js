import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";
import dotenv from "dotenv";

dotenv.config();

// check if walletData.json exists
import fs from "fs";
const walletData = JSON.parse(fs.readFileSync("walletData.json", "utf8"));

const provider = await CdpWalletProvider.configureWithWallet({
  // Optional: Provide API key details. If not provided, it will attempt to configure from JSON.
  apiKeyName: process.env.CDP_API_KEY_NAME,
  apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,

  // Optional: Provide network ID (defaults to base-sepolia if not specified)
  networkId: "base-sepolia", // other options: "base-mainnet", "ethereum-mainnet", "arbitrum-mainnet", "polygon-mainnet".

  // Optional: Provide existing wallet data as JSON string
  cdpWalletData: JSON.stringify(walletData),
});

console.log("address:", provider.getAddress());

const agentKit = await AgentKit.from({
  walletProvider: provider
});

console.log(agentKit.walletProvider.getAddress());