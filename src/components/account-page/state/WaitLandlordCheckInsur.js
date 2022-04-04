import { useState } from "react";
import { waitLandlordCheckInsur } from "../SubmitEvent";

const WaitLandlordCheckInsur = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [formInsur, setFormInsur] = useState({});
  const [numberOfPay, setNumberOfPay] = useState();

  const onChange = (e) => {
    setFormInsur((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculate = () => {
    setNumberOfPay(
      parseInt(formInsur.electAfLeft) +
        parseInt(formInsur.insuranceAfLeft) +
        parseInt(formInsur.waterAfLeft)
    );
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
            <div className="flex justify-center">
              <button
                className="mt-4 text-pink-500 text-lg font-[SarabunBold] hover:bg-pink-100 bg-white px-2 py-1 rounded-lg border-[1px] border-grey-500"
                onClick={() => {
                  calculate();
                }}
              >
                calculate
              </button>
            </div>
            {numberOfPay && (
              <h1 className="text-pink-500 text-lg flex justify-center mt-2 font-bold">
                ค่าความเสียหายและค่าอุปโภคบริโภครวม:&nbsp;<i>{numberOfPay}</i>
                &nbsp;บาท
              </h1>
            )}
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
                  {
                    tr_state: "waitForConfirmInsur",
                    tr_insur_after_left: formInsur,
                    tr_getBackInsurForTenant:
                      itemContract.insurance_price - numberOfPay <= 0
                        ? 0
                        : itemContract.insurance_price - numberOfPay,
                  },
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
