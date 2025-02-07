function UploadButton() {
  return (
    <>
      <label
        className="bg-blue-300 rounded-lg p-2 text-xs text-center cursor-pointer"
        for="employmentContract"
      >
        Upload Employment Contract
      </label>
      <input
        hidden
        type="file"
        accept="application/pdf"
        id="employmentContract"
      />
    </>
  );
}

export default function page() {
  return (
    <>
      <div className="flex flex-col w-full mx-auto px-10 py-10 items-center gap-10">
        <h1 className="font-bold text-2xl">Create Contract</h1>
        <div className="flex gap-4 w-full justify-start items-center">
          <p className="font-bold text-lg">Step 1:</p>
          <UploadButton />
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg">Step 2:</p>
          <div className="flex flex-col gap-4 justify-end items-start">
            <p>Copy Arbitration Checklist</p>
            <ul className="">
              <li>Item 1</li>
              <li>Item 1</li>
              <li>Item 1</li>
              <li>Item 1</li>
            </ul>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg">Step 3:</p>
          <div className="flex flex-col">
            <label for="employeeWalletAdd">
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
          <p className="font-bold text-lg">Step 4:</p>
          <div className="flex flex-col">
            <p>Sign Transaction to confirm the contract</p>
            <button className="bg-blue-300 rounded-lg p-2 w-[50%] text-xs">
              Sign Transaction
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <p className="font-bold text-lg">Step 5:</p>
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

// {role === "employer" ? (
//   <>
// <label
//   className="bg-blue-300 rounded-lg p-2 text-xs text-center cursor-pointer"
//   for="employmentContract"
// >
//   Upload Employment Contract
// </label>
// <input
//   hidden
//   type="file"
//   accept="application/pdf"
//   id="employmentContract"
// />
//     <button className="bg-yellow-300 rounded-lg p-2 text-xs">
//       Deposit ETH
//     </button>
//   </>
// ) : null}
