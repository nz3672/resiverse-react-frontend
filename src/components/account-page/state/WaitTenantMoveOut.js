import { useState } from "react";
import { waitLandlordCheckInsur } from "../SubmitEvent";

const WaitTenantMoveOut = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  return (
    <>
      <div className="mx-6">
        <div className="grid">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              อยู่ระหว่างการพักอาศัย
            </h1>

            <h1 className="text-xl leading-10 flex justify-center text-pink-500 font-bold">
              กรุณากดย้ายออกเมื่อผู้เช่าทำการย้ายออก
            </h1>
          </div>
          <p>
            ผู้เช่าสามารถถ่ายภาพสภาพห้องเก็บไว้เพื่อโต้แย้งความเสียหายที่อาจจะคำนวนผิดพลาดจากผู้ให้เช่าได้
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              //   update mongo
              if (itemContract.tr_state === "waitTenantMoveOut") {
                // console.log("dd");
                waitLandlordCheckInsur(
                  { tr_state: "waitLandlordCheckInsur" },
                  itemContract._id
                )
                  .then((res) => {
                    let arr = [];
                    translists.map((item) => {
                      if (res._id === item._id) {
                        arr.push(res);
                      } else {
                        arr.push(item);
                      }
                    });
                    setTranslist(arr);
                  })
                  .catch((err) => console.log(err));
              }
              setSelect(false);
            }}
            className=" text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 hover:from-pink-600 hover:to-yellow-400 py-1 rounded-lg border-[1px] border-grey-300"
          >
            ยืนยันการย้ายออก
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

export default WaitTenantMoveOut;
