import React from "react";

const Step6 = () => {
  return (
    <div className="h-full">
      <div className="text-2xl font-bold flex bg-white rounded-3xl py-3 px-4 self-start">
        <h1 className="text-pink-500">
          สถานะที่ 6 :&nbsp;รอผู้เช่าดำเนินการยินยอมรับเงินค่าประกัน
        </h1>
      </div>
      <div className="grid content-center h-full">
        <div className="flex flex-row">
          <div className="w-[300px] ml-10 ">
            <img
              src={require("../../../img/estate-state/loan.png")}
              className=""
            />
            <h1 className="flex justify-center mt-4 font-semibold ">ผู้เช่า</h1>
          </div>
          <div className="w-full grid place-content-center">
            <p className="w-[70%] text-justify text-lg self-center leading-relaxed indent-10 tracking-wide justify-self-center">
              ผู้เช่าจะได้รับการแจ้งเตือนรายละเอียดเงินค่าประกันที่จะได้รับหลังจากผู้ให้เช่ากรอกบันทึกค่าความเสียหายเรียบร้อย
              ผู้เช่าสามารถตัดสินใจได้ว่าค่าประกันที่ตนจะได้รับคืนนั้นมีความเหมาะสมหรือไม่
              หากเหมาะสม และต้องการยินยอม สามารถกดยินยอมรับเงินได้ทันที
              หากมีข้อโต้แย้งต่อค่าประกัน สามารถกดปุ่มโต้แย้ง
              และกรอกเหตุผลเพื่อเปิดข้อพิพาท หากมีการเปิดข้อพิพาท
              ระบบจะคำนวนค่าความเสียหายจากอัตราค่าบำรุงรักษาของเสียหายที่ระบบได้เป็นผู้กำหนดด้วยตนเอง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6;
