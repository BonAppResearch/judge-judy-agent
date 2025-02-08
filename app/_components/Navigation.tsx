"use client";

import { useWallets, usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function Navigation() {
  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();
  const wallet = wallets[0] || null;
  const address = wallet?.address || "";
  const addressConcat =
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 4, address.length);

  return (
    <nav className="item-center mx-auto flex justify-between p-10 border-b-2">
      <Link href="/">
        <h1 className="text-4xl font-bold">Judge Judy Agent</h1>
      </Link>
      <div className="flex">
        <p>{wallet ? addressConcat : ""}</p>
        <button
          className="rounded-xl bg-blue-400 p-4"
          onClick={wallet ? wallet.disconnect : connectWallet}
        >
          {wallet ? "Disconnect" : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}
