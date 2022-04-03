import { useState } from "react";
import { waitLandlordCheckInsur } from "../SubmitEvent";

const WaitLandlordCheckInsur = (props) => {
  const { itemContract, setTranslist, setSelect } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [formInsur, setFormInsur] = useState({});

  const onChange = (e) => {
    setFormInsur((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ผู้ให้เช่ากรอกค่าความเสียหาย
            </h1>
          </div>
          <div className="bg-pink-300/75 rounded-lg mt-3 py-3 px-4">
            <div className="mb-3">
              <label>
                ค่าความเสียหายของห้อง
                <input
                  placeholder="ค่าความเสียหายของห้อง"
                  className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                  onChange={onChange}
                  name="insuranceAfLeft"
                />
              </label>
            </div>
            <div className="flex mb-3">
              <label>
                {" "}
                ค่าน้ำ
                <input
                  placeholder="หน่วยค่าน้ำ"
                  className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                  onChange={onChange}
                  name="waterUnitAfLeft"
                />
                <input
                  placeholder="ค่าน้ำ"
                  className="border-[1px] border-stone-500 p-1 rounded-lg focus:outline-0 focus:border-pink-500"
                  onChange={onChange}
                  name="waterAfLeft"
                />
              </label>
            </div>
            <div className="flex ">
              <label>
                {" "}
                ค่าไฟ
                <input
                  placeholder="หน่วยค่าไฟ"
                  className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                  onChange={onChange}
                  name="electUnitAfLeft"
                />
                <input
                  placeholder="ค่าไฟ"
                  className="border-[1px] border-stone-500 p-1 rounded-lg focus:outline-0 focus:border-pink-500"
                  onChange={onChange}
                  name="electAfLeft"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-rows mt-3 pt-3">
            <input
              type="checkbox"
              className="focus:ring-0 focus:ring-offset-0 border-1 w-6 h-6 border-gray-400  text-pink-500 focus:text-pink-500 self-center "
              onChange={(e) => {
                setIsCheck(e.target.checked);
              }}
            />
            <span className="text-lg pl-4 leading-7">
              ยืนยันค่าความเสียหายทั้งหมดที่ระบุนั้นถูกต้อง
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            disabled={!isCheck}
            onClick={() => {
              //   update mongo
              if (itemContract.tr_state === "waitLandlordCheckInsur") {
                // console.log("dd");
                waitLandlordCheckInsur(
                  { tr_state: "waitForConfirmInsur" },
                  itemContract._id
                )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }
              setSelect(false);
            }}
            className="disabled:opacity-50 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 py-1 rounded-lg border-[1px] border-grey-300"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitLandlordCheckInsur;
