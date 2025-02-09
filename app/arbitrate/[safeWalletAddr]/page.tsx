"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const { safeWalletAddr } = params;
  const [arbResult, setArbResult] = useState<{
    status: string;
    message: string;
    details: {
      notice_period: {
        passed: boolean;
        details: string;
        required_days: string;
      };
      format: {
        is_valid: boolean;
        details: string;
      };
      special_notes: string[];
    };
    safe_address: string;
  } | null>(null);

  async function handleArbitrationFile(selectedFile: File) {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `https://judge-judy-fastapi.vercel.app/api/validate-resignation?safe_address=${safeWalletAddr}`,
        {
          method: "POST",
          body: formData,
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data type:", typeof data);
      console.log("Data structure:", JSON.stringify(data, null, 2));

      // If data is a string, try to parse it
      let parsedData = data;
      if (typeof data === "string") {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.log("Could not parse data as JSON");
        }
      }

      setArbResult(parsedData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className="p-10 flex flex-col gap-10">
      <h1 className="font-bold text-2xl w-full bg-slate-400 text-center">
        Arbitration
      </h1>
      <div className="w-full flex flex-col gap-2">
        <p className="text-3xl">
          Please provide supporting documentation to initiate the arbitration
        </p>
        <p className="text-lg">
          Provide your documentation and our AI agent will determine the
          eligibility of the request
        </p>
        <p className="text-md italic">Supported file types: .eml</p>
      </div>
      <div className="border-b-2 border-slate-500 p-6">
        <input
          type="file"
          hidden
          accept="message/rfc822"
          id="arbitrationDoc"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;

            if (selectedFile) {
              handleArbitrationFile(selectedFile);
            }
          }}
        />
        <label
          htmlFor="arbitrationDoc"
          className="bg-blue-300 rounded-lg p-4 text-md text-center cursor-pointer"
        >
          Upload Document
        </label>
      </div>
      {arbResult && (
        <div className="p-6">
          <p className="font-semibold text-4xl border-b-2 border-slate-400 py-3">
            Result:
          </p>
          <div className="space-y-2 flex flex-col gap-3 py-3">
            <p>
              <span className="font-semibold">Status:</span> {arbResult.status}
            </p>
            <p>
              <span className="font-semibold">Message:</span>{" "}
              {arbResult.message}
            </p>
            <div>
              <p className="font-semibold text-4xl border-b-2 border-slate-400 py-3">
                Details:
              </p>
              <div className="flex flex-col gap-3 py-3">
                <p className="font-semibold">Notice Period:</p>
                <div className="flex gap-2 ">
                  <p>Passed:</p>
                  {arbResult.details.notice_period.passed ? "True" : "False"}
                </div>
                <div className="flex gap-2">
                  <p>Details:</p>
                  {arbResult.details.notice_period.details}
                </div>
                <div className="flex gap-2">
                  <p>Required Days:</p>
                  {arbResult.details.notice_period.required_days}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Document Format:</p>
                <div className="flex gap-2">
                  <p>Format Validity</p>
                  {arbResult.details.format.is_valid ? "True" : "False"}
                </div>
                <div className="flex gap-2">
                  <p>Details:</p>
                  {arbResult.details.format.details}
                </div>
              </div>
            </div>

            <div className="">
              <p className="font-semibold">Special Notes:</p>
              {arbResult.details.special_notes?.map((note, i) => (
                <div className="flex gap-2" key={i}>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
          <p>
            <span className="font-semibold">Safe Address:</span>{" "}
            {arbResult.safe_address}
          </p>
        </div>
      )}
    </div>
  );
}
