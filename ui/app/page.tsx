"use client";
import Transaction from "@/_components/Transaction";
import { useWallets, usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();
  const wallet = wallets[0] || null;
  const address = wallet?.address || "";
  const addressConcat =
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 4, address.length);

  return (
    <>
      <nav className="item-center mx-auto flex justify-between p-10">
        <h1 className="text-4xl font-bold">Judge Judy Agent</h1>
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
      <section className="item-center mx-auto flex flex-col justify-between p-10">
        <div className="item-center flex w-full justify-between">
          <h2 className="text-xl font-bold">Employer</h2>
          <button className="rounded-lg bg-green-400 p-4">
            Request Withdrawal
          </button>
        </div>
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
      </section>
      <section className="item-center mx-auto flex justify-between p-10">
        <div className="item-center flex w-full justify-between">
          <h2 className="text-xl font-bold">Employee</h2>
          <button className="rounded-lg bg-green-400 p-4">
            Request Withdrawal
          </button>
        </div>
      </section>
    </>
  );
}
