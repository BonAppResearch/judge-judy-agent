// import React from "react";

type TxProp = {
  createdDate: string;
  walletAddress: string;
  safeWalletAddress: string;
};

export default function Transaction({
  createdDate,
  walletAddress,
  safeWalletAddress,
}: TxProp) {
  return (
    <div className="p-4 flex justify-between border-b-2">
      <div className="flex gap-10 w-full items-center">
        <div className="flex flex-col justify-start">
          <p className="font-bold">Created Date</p>
          <p>{createdDate}</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="font-bold">Wallet Address</p>
          <p>{walletAddress /* Employee*/}</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="font-bold">Safe Wallet Address</p>
          <p>{safeWalletAddress}</p>
        </div>
      </div>
      <button className="rounded-lg bg-green-400 px-4 py-2 text-xs">
        Request Withdrawal
      </button>
    </div>
  );
}
