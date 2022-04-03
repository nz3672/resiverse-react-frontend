import { useState } from "react";
import { waitMoveInEvent } from "../SubmitEvent";

const WaitTenantMoveIn = (props) => {
  const { itemContract, setTranslist, setSelect } = props;
  const [isCheck, setIsCheck] = useState(false);
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ยืนยันการย้ายเข้าพัก
            </h1>

            <h1 className="text-xl leading-10 text-pink-500 font-bold">
              ข้อตกลงในการย้ายเข้า
            </h1>
            <p className="text-lg leading-7 mb-4">
              1. วันที่ทำการย้ายเข้า
              ผู้เช่าจะต้องทำการยืนยันการย้ายเข้าผ่านเว็บไซต์ก่อนย้ายของเข้า
              <br />
              2.{" "}
              <i>
                ผู้ให้เช่าจะได้รับเงินค่าเช่าล่วงหน้าเมื่อผู้เช่ากดยืนยันการย้ายเข้า
                <b>เท่านั้น</b>
              </i>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              //   update mongo
              if (itemContract.tr_state === "waitTenantMoveIn") {
                // console.log("dd");
                waitMoveInEvent(
                  { tr_state: "waitTenantMoveOut" },
                  itemContract._id
                )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }
              setSelect(false);
            }}
            className=" text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 hover:from-pink-600 hover:to-yellow-400 py-1 rounded-lg border-[1px] border-grey-300"
          >
            ยืนยันการย้ายเข้า
          </button>
          <button
            className="ml-4 text-white text-lg font-[SarabunBold] bg-stone-600/75 hover:bg-stone-600 px-2 py-1 rounded-lg border-[1px] border-grey-300"
            onClick={() => setSelect(false)}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitTenantMoveIn;
