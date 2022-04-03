import React from "react";

const WaitForResponse = (props) => {
  const { setSelect, itemContract } = props;
  return (
    <div className="mx-6">
      <div className="">
        <h1 className="font-bold text-2xl flex justify-center mb-2">
          สถานะ :{" "}
          {itemContract.tr_state === "waitLandlordConfirm"
            ? "รอยืนยันการเช่าที่พักของคุณ"
            : ""}
        </h1>
        <h1 className="flex justify-center text-lg mt-4">
          {itemContract.tr_state === "waitLandlordConfirm"
            ? "กรุณารอ 2-3 วัน เพื่อให้ผู้ให้เช่ายืนยันการเช่าที่พักของคุณ"
            : ""}
        </h1>
        <div className="flex justify-center mt-4">
          <button
            className="text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 py-1 rounded-lg border-[1px] border-grey-300"
            onClick={() => {
              setSelect(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitForResponse;
