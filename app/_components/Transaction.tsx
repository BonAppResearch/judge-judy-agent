// import React from "react";

type TxProp = {
  createdDate: string;
  walletAddress: string;
  txHash: string;
  txStatus: string;
};

export default function Transaction({
  // role = "employer",
  createdDate,
  walletAddress,
  txHash,
  txStatus,
}: TxProp) {
  return (
    <div className="p-4 flex justify-between border-b-2">
      <div className="flex gap-10 w-full items-center">
        <p>{createdDate}</p>
        <p>{walletAddress /* Employee*/}</p>
        <p>{txHash}</p>
        <p>{txStatus}</p>
      </div>
      <button className="rounded-lg bg-green-400 px-4 py-2 text-xs">
        Request Withdrawal
      </button>
    </div>
  );
}
