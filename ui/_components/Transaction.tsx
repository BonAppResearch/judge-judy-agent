import React from "react";

type TxProp = {
  createdDate: string;
  walletAddress: string;
  txHash: string;
  txStatus: string;
};

export default function Transaction({
  createdDate,
  walletAddress,
  txHash,
  txStatus,
}: TxProp) {
  return (
    <div className="px-4 flex justify-between">
      <div className="flex gap-4">
        <p>{createdDate}</p>
        <p>{walletAddress /* Employee*/}</p>
        <p>{txHash}</p>
        <p>{txStatus}</p>
      </div>
      <button className="rounded-lg bg-green-400 p-4 text-xs">
        Request Withdrawal
      </button>
    </div>
  );
}
