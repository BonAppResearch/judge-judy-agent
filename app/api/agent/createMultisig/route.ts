import { NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma";
import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";
import { createSafeFromAgent } from "@/app/utils/agentHelper";

const walletData = {
  walletId: "06be1f44-0b15-45a9-afd6-23d9a2817791",
  seed: "",
  networkId: "base-sepolia",
};

const provider = await CdpWalletProvider.configureWithWallet({
  // Optional: Provide API key details. If not provided, it will attempt to configure from JSON.
  apiKeyName: process.env.CDP_API_KEY_NAME,
  apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,

  networkId: "base-sepolia", // other options: "base-mainnet", "ethereum-mainnet", "arbitrum-mainnet", "polygon-mainnet".
  cdpWalletData: JSON.stringify(walletData),
});

const agentKit = await AgentKit.from({
  walletProvider: provider,
});

console.log(agentKit);

export async function POST(request: Request) {
  try {
    const { employerAddress, employeeAddress } = await request.json();

    if (!employerAddress || !employeeAddress) {
      return NextResponse.json({ error: "Safe address and owner address are required" }, { status: 400 });
    }

    const safeAddress = await createSafeFromAgent(provider, employerAddress, employeeAddress);
    // Create a new multisig agent in the database
    const newMultisigAgent = await prisma.safeAccount.create({
      data: {
        address: safeAddress,
        employerAddress,
        employeeAddress,
      },
    });

    return NextResponse.json(newMultisigAgent, { status: 201 });
  } catch (error) {
    console.error("Error creating multisig agent:", error);
    return NextResponse.json({ error: "Failed to create multisig agent." }, { status: 500 });
  }
}
