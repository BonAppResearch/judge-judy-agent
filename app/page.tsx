"use client";
import Transaction from "@/app/_components/Transaction";
import Link from "next/link";
import { useWallets } from "@privy-io/react-auth";
import {
  listRecordsForEmployee,
  listRecordsForEmployer,
} from "./utils/safeHelper";
import { useEffect, useState } from "react";

interface Transaction {
  createdAt: string;
  employeeAddress: string;
  address: string;
}

export default function Home() {
  const { wallets } = useWallets();
  const wallet = wallets[0] || null;
  const [employerTx, setEmployerTx] = useState<Transaction[]>([]);

  const handleGetEmployerTransactions = async () => {
    const transactions = await listRecordsForEmployer(wallet.address);
    setEmployerTx(transactions);
  };

  useEffect(() => {
    handleGetEmployerTransactions();
  }, [wallet]);

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
        {employerTx?.map((tx, i) => (
          <Transaction
            key={i}
            createdDate={tx.createdAt}
            walletAddress={tx.employeeAddress}
            safeWalletAddress={tx.address}
          />
        ))}
      </section>
      <section className="item-center mx-auto flex flex-col justify-between p-10">
        <div className="item-center flex w-full justify-between">
          <h2 className="text-xl font-bold">Employee</h2>
        </div>
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          safeWalletAddress="123"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          safeWalletAddress="123"
        />
        <Transaction
          createdDate="2025-01-01"
          walletAddress="0x1234"
          safeWalletAddress="123"
        />
      </section>
    </>
  );
}
