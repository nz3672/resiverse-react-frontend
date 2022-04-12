import React from "react";

const DetailsInsurance = () => {
  return (
    <div className="grid place-content-center h-full">
      <h1 className="font-bold text-xl ">อัตราค่าบำรุงรักษาของเสียหาย</h1>
      <table className="mt-4">
        <thead className="bg-pink-300">
          <tr className="">
            <th className="p-2 rounded-t-xl">เฟอนิเจอร์/วัสดุ</th>
            <th className="p-2 rounded-t-xl">ค่าบำรุงรักษา (บาท)</th>
            <th className="p-2 rounded-t-xl">ขนาดรอยวัสดุ (ซม.)</th>
          </tr>
        </thead>
        <tbody className="bg-pink-200">
          <tr className="">
            <td className="p-2">เนื้อไม้</td>
            <td className="p-2">100</td>
            <td className="p-2">น้อยกว่าเท่ากับ 2</td>
          </tr>
          <tr className="">
            <td className="p-2">ผนัง</td>
            <td className="p-2">50</td>
            <td className="p-2">น้อยกว่าเท่ากับ 5</td>
          </tr>
          <tr className="">
            <td className="p-2 rounded-b-xl">รอยตะปู</td>
            <td className="p-2 rounded-b-xl">200</td>
            <td className="p-2 rounded-b-xl">น้อยกว่าเท่ากับ 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsInsurance;
