import React from "react";

const Step3 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 3 :&nbsp;รอผู้ให้เช่ายืนยันการจองที่พัก
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10">
            <img
              src={require("../../../img/estate-state/tenant2.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold ">ผู้เช่า</h1>
          </div>
          <div className="w-full grid place-content-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide justify-self-center">
              เมื่อ<b>ผู้เช่า</b>ชำระเงินสำเร็จ
              สามารถย้ายเข้าพักได้ตามวันเวลาที่กำหนดไว้ในตอนต้น
              ผู้เช่าสามารถติดต่อสอบถามกับผู้ให้เช่าได้ผ่านทางการสนทนาส่วนตัว
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
