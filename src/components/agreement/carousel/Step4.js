import React from "react";

const Step4 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 4 :&nbsp;ผู้เช่าอยู่ระหว่างพักอาศัย รอผู้เช่าย้ายออก
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10 ">
            <img
              src={require("../../../img/estate-state/house.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold ">ผู้เช่า</h1>
          </div>
          <div className="w-full grid place-content-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide justify-self-center">
              เมื่อ<b>ผู้เช่าต้องการย้ายออก</b>
              &nbsp;ผู้เช่าสามารถแจ้งวันย้ายออกให้ผู้ให้เช่าได้ทราบก่อนวันย้ายออกเป็นอย่างต่ำ
              1 เดือน เมื่อผู้เช่าย้ายออกเรียบร้อย
              ผู้เช่าต้องกลับมายืนยันการย้ายออกที่เว็บไซต์
              เพื่อเปลี่ยนสถานะให้เป็นสถานะลำดับที่ 5
              ซึ่งคือสถานะรอผู้ให้เช่าบันทึกค่าความเสียหายลงระบบ
              เพื่อนำมาคิดคำนวนการหักค่าประกันความเสียหายคืนแก่ผู้ให้เช่า
              และผู้เช่า
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
