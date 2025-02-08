"use client";
import { useState } from "react";

const tempSpecialReqs = [
  {
    requirement: "Req 1",
    deadline: "1",
    clause_reference: "Clause reference 1",
  },
  {
    requirement: "Req 2",
    deadline: "2",
    clause_reference: "Clause reference 2",
  },
];

const postObligations = [
  {
    obligation:
      "Maintain confidentiality of employer's proprietary information",
    duration: "Continues after employment ends",
    clause_reference: "Section 8",
  },
  {
    obligation:
      "Maintain confidentiality of employer's proprietary information",
    duration: "Continues after employment ends",
    clause_reference: "Section 8",
  },
];

const complianceConsequences = [
  "consequence 1",
  "consequence 2",
  "consequence 3",
];

function UploadButton() {
  async function handleFileChange(event) {
    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await fetch(
        "https://judge-judy-fastapi.vercel.app/api/analyze-contract",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      const data = await response.json;
      console.log(data);

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <>
      <label
        className="bg-blue-300 rounded-lg p-2 text-xs text-center cursor-pointer"
        htmlFor="employmentContract"
      >
        Upload Employment Contract
      </label>
      <input
        hidden
        type="file"
        accept="application/pdf"
        id="employmentContract"
        onChange={handleFileChange}
      />
    </>
  );
}

export default function page() {
  return (
    <>
      <div className="flex flex-col w-full mx-auto px-10 py-10 items-center gap-10">
        <h1 className="font-bold text-2xl bg-slate-300 w-full text-center">
          Create Contract
        </h1>
        <div className="flex gap-4 w-full justify-start items-center">
          <p className="font-bold text-lg w-20">Step 1:</p>
          <UploadButton />
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg w-20">Step 2:</p>
          <div className="flex flex-col gap-4 justify-end items-start w-full">
            <p>Review Resignation Checklist</p>
            <p className="text-xl font-bold border-b-2 border-gray-500">
              Notice Period
            </p>
            <div className="w-full">
              <div className="flex gap-4">
                <p className="font-bold">Duration:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Clause Reference:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Exceptions:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Clause Reference:</p>
                <p>{/**/}</p>
              </div>
            </div>
            <p className="text-xl font-bold border-b-2 border-gray-500">
              Resignation Letter
            </p>
            <div className="w-full">
              <div className="flex gap-4">
                <p className="font-bold">Required:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Format:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Required:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Submission Method:</p>
                <p>{/**/}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Recipients:</p>
                <div className="flex flex-col px-5">
                  <div className="flex">
                    <p>Primary:</p>
                    <p>{/**/}</p>
                  </div>
                  <div className="flex">
                    <p>Alternative:</p>
                    <p>{/**/}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Deadline:</p>
                <p>{/**/}</p>
              </div>
            </div>
            <p className="text-xl font-bold border-b-2 border-gray-500">
              Special Requirements
            </p>
            <div className="w-full">
              {tempSpecialReqs.map((req, i) => (
                <div className="py-3" key={i}>
                  <p className="font-bold text-lg italic">
                    Requirement {i + 1}
                  </p>
                  <div className="flex gap-4">
                    <p className="font-bold">Requirement:</p>
                    <p>{req.requirement}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold">Deadline:</p>
                    <p>{req.deadline}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold">Clause Reference:</p>
                    <p>{req.clause_reference}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xl font-bold border-b-2 border-gray-500">
              Post Resignation Requirements
            </p>
            <div className="w-full">
              {postObligations.map((postOb, i) => (
                <div className="py-3" key={i}>
                  <p className="font-bold text-lg italic">Obligation {i + 1}</p>
                  <div className="flex gap-4">
                    <p className="font-bold">Obligation:</p>
                    <p>{postOb.obligation}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold">Duration:</p>
                    <p>{postOb.duration}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="font-bold">Clause Reference:</p>
                    <p>{postOb.clause_reference}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xl font-bold border-b-2 border-gray-500">
              Compliance Consequences
            </p>
            <div className="w-full">
              <ul>
                {complianceConsequences.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg w-20">Step 3:</p>
          <div className="flex flex-col">
            <label htmlFor="employeeWalletAdd">
              Enter Employee's Wallet Address
            </label>
            <input
              id="employeeWalletAdd"
              type="text"
              className="border-black border-solid border-2"
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg w-20">Step 4:</p>
          <div className="flex flex-col">
            <p>Sign Transaction to confirm the contract</p>
            <button className="bg-blue-300 rounded-lg p-2 w-[50%] text-xs">
              Sign Transaction
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg w-20">Step 5:</p>
          <div className="flex flex-col">
            <button className="bg-blue-300 rounded-lg p-2 w-[90%] text-xs">
              Deposit ETH
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
