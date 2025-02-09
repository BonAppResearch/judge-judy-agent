"use client";
import React from "react";
import { useParams } from "next/navigation";
import { proposeWithdrawTransaction } from "@/app/utils/safeHelper";

export default function page() {
  const params = useParams();
  const { safeWalletAddr } = params;
  return <div></div>;
}
