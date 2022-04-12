import React from "react";

const Step1 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 1 :&nbsp;รอผู้ให้เช่ายืนยันการจองที่พัก
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10">
            <img
              src={require("../../../img/estate-state/landlord.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold ">
              ผู้ให้เช่า/เจ้าของที่พัก
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide">
              หลังจาก<b>ผู้เช่า</b>กดจองที่พักเพื่อเข้าอยู่เรียบร้อย
              ผู้ให้เช่าจะได้รับการแจ้งเตือนการจองที่พัก
              โดยรายละเอียดนั้นจะแสดงข้อมูลของการจอง เช่น วันที่ต้องการเข้าพัก
              ชื่อผู้เข้าพัก ในสถานะนี้ <b>ผู้ให้เช่า</b>
              จะต้องทำการตรวจสอบข้อมูลของผู้เช่า และบันทึกภาพห้องพักที่แท้จริง
              รวมถึงรอยความเสียหายดั้งเดิม
              หากผู้ให้เช่าตรวจสอบรายละเอียดเสร็จสิ้นเรียบร้อย
              สามารถอนุมัติการจองที่พักดังกล่าว
              เพื่อเข้าสู่สถานะถัดไปได้โดยกดปุ่ม ยืนยัน
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
