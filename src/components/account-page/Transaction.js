import React from "react";

const Transaction = (props) => {
  const { setSelect } = props;
  return (
    <button
      className="w-full bg-[#272945] rounded-xl min-h-[10%] h-[15%] mb-4 shadow-md hover:translate-y-1 transition ease-in-out"
      onClick={() => {
        setSelect(true);
      }}
    >
      <div className="w-[100%] h-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-300 clip-transaction-bg-style">
        <div className="grid grid-cols-3 px-2 py-2 h-full justify-items-start">
          <div className="text-white ">
            <h1 className="font-[SarabunMed] flex justify-start text-lg">
              ชื่อบ้าน
            </h1>
            <h1 className="ml-2 flex justify-start text-lg">ชื่อผู้เช่า</h1>
            <h1 className="ml-2 flex justify-start text-lg">
              วันที่เริ่มต้นอยู่อาศัย
            </h1>
          </div>
          <div></div>
          <div>model</div>
        </div>
      </div>
    </button>
  );
};

export default Transaction;
