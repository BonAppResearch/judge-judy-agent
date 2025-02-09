"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { Address, createWalletClient, custom, Hex } from "viem";
import { proposeWithdrawTransaction, getDeployedSafeClient } from "@/app/utils/safeHelper";

export default function Page() {
  const [withdrawalValue, setWithdrawalValue] = useState<bigint | null>(null);
  const params = useParams();

  const { safeWalletAddr } = params;
  const { wallets } = useWallets();
  const employerPrivyWallet = wallets[0] || null;

  async function getEmployerWalletClient() {
    await employerPrivyWallet.switchChain(baseSepolia.id);
    const provider = await employerPrivyWallet.getEthereumProvider();

    const walletClient = createWalletClient({
      account: employerPrivyWallet.address as Hex,
      chain: baseSepolia,
      transport: custom(provider),
    });

    console.log("walletclient", walletClient);

    const safeClient = await getDeployedSafeClient(safeWalletAddr as Address, walletClient);

    console.log("safeclient", { safeClient });
    return safeClient;
  }

  async function handleProposeWithdraw() {
    console.log("hahaha");
    const employerSafeClient = await getEmployerWalletClient();

    console.log("employerSafeClient", employerSafeClient);
    if (!employerSafeClient || !withdrawalValue) return;
    console.log("babab");
    const response = await proposeWithdrawTransaction(employerSafeClient, employerPrivyWallet.address, withdrawalValue);

    return response;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl w-full text-center py-5">Propose Withdrawal</h1>
      <div className="flex flex-col p-5 w-[50%]">
        <div className="p-5">
          <p className="font-bold">Safe Wallet Contract Address:</p>
          <p>{safeWalletAddr}</p>
        </div>
        <div className="p-5">
          <p className="font-bold">Propose to withdraw to address:</p>
          <p>{employerPrivyWallet?.address}</p>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <p className="font-bold">Withdrawal Amount (ETH):</p>
          <input
            type="number"
            className="border-solid border-black border-2"
            onChange={(e) => setWithdrawalValue(e.target.value ? BigInt(e.target.value) : null)}
          />
          <button className="bg-blue-300 p-3" onClick={handleProposeWithdraw}>
            Propose Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}
