export default function page() {
  return (
    <>
      <div className="flex flex-col w-full mx-auto px-10 py-10 items-center gap-10">
        <h1 className=" font-bold text-2xl">Create Contract</h1>
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
