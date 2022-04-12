import React from "react";

const Step2 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 2 :&nbsp;รอผู้เช่ายืนยันการชำระเงิน
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10 self-center">
            <img
              src={require("../../../img/estate-state/money.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold text-xl">
              ผู้เช่า
            </h1>
          </div>

          <div className="w-full grid place-content-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide justify-self-center">
              หลังจากผู้ให้เช่ายืนยันการจองที่พักเสร็จเรียบร้อย
              ผู้เช่าสามารถดำเนินการชำระเงินได้ทันที โดยค่าใช้จ่ายจะประกอบไปด้วย
              ค่าที่พัก และค่าประกันของเสียหาย
            </p>
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed tracking-wide justify-self-center">
              <b>ค่าที่พัก</b> : เมื่อลูกค้าย้ายเข้าที่พัก
              หรือกดยืนยันในสถานะที่ 3 ค่าใช้จ่ายในส่วนของค่าที่พัก
              จะถูกโอนให้แก่ผู้ให้เช่า/เจ้าของที่พัก <br />
              <b>ค่าประกันของเสียหาย</b> : หลังจากผู้เช่าย้ายออกในสถานะที่ 4
              และผู้ให้เช่าบันทึกข้อมูลค่าความเสียหายของที่พักอาศัยเสร็จเรียบร้อยในสถานะที่
              5 แล้ว ค่าประกันของเสียหายจะถูกแบ่งจ่ายให้ทั้งผู้เช่า
              และผู้ให้เช่าทันที
              โดยจะนำค่าประกันของเสียหายมาหักลบกับค่าความเสียหายที่ผู้เช่าบันทึกลงสู่ระบบ
              เมื่อผู้เช่ายินยอมต่อค่าความเสียหาย
              สามารถกดยินยอมตกลงเพื่อดำเนินการรับเงินประกันส่วนที่เหลือ
              หากไม่ยินยอม สามารถโต้แย้งได้
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
