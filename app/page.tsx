"use client";
import Transaction from "@/app/_components/Transaction";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="item-center mx-auto flex flex-col justify-between p-10">
        <div className="item-center flex w-full justify-between">
          <h2 className="text-xl font-bold">Employer</h2>
          <Link href="/create">
            <button className="bg-gray-500 rounded-lg text-white text-xs p-4">
              Create Contract
            </button>
          </Link>
        </div>
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
      </section>
      <section className="item-center mx-auto flex flex-col justify-between p-10">
        <div className="item-center flex w-full justify-between">
          <h2 className="text-xl font-bold">Employee</h2>
        </div>
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          txHash="123"
          txStatus="lkjsdf"
        />
      </section>
    </>
  );
}
