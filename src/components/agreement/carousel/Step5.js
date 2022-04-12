import React from "react";

const Step5 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 5 :&nbsp;รอผู้ให้เช่ากรอกค่าความเสียหาย
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10 ">
            <img
              src={require("../../../img/estate-state/assets.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold ">
              ผู้ให้เช่า/เจ้าของที่พัก
            </h1>
          </div>
          <div className="w-full grid place-content-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide justify-self-center">
              เมื่อ<b>ผู้เช่า</b>ย้ายออกสำเร็จ &nbsp;
              <b>ผู้ให้เช่าจะต้องประเมินความเสียหาย</b>
              และกรอกบันทึกค่าความเสียหายลงสู่ระบบ
              เพื่อให้ระบบทำการคำนวนค่าความเสียหาย
              และโอนเงินค่าประกันคืนแก่ผู้ให้เช่า
              หรือผู้เช่าตามค่าประกันที่ควรจะได้รับ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
