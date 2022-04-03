import { useState } from "react";
import { waitForConfirmInsur } from "../SubmitEvent";

const WaitForConfirmInsur = (props) => {
  const { itemContract, setTranslist, setSelect } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [formDebate, setFormDebate] = useState("");
  const [isDebate, setIsDebate] = useState(false);

  const onChange = (e) => {
    setFormDebate(e.target.value);
  };

  const debateBtn = () => {
    if (isDebate) {
      setIsDebate(false);
    } else if (!isDebate) {
      setIsDebate(true);
    }
  };
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ยืนยันรับเงินค่าประกันคืน
            </h1>
          </div>
          <div className="bg-stone-300/75 rounded-lg mt-3 py-3 px-4 text-lg">
            <div className="mb-3">
              <p>
                <b>ค่าความเสียหายของห้อง:</b> xxx บาท
              </p>
            </div>
            <div className="flex mb-3">
              <p>
                <b>ค่าน้ำ:</b> xx หน่วย
                <br />
                <b>ยอดค่าใช้จ่าย:</b> xx บาท
              </p>
            </div>
            <div className="flex ">
              <p>
                <b>ค่าไฟ:</b> xx หน่วย
                <br />
                <b>ยอดค่าใช้จ่าย:</b> xx บาท
              </p>
            </div>
            <div className="text-xl mt-2  font-bold">
              <p className="text-pink-500 flex justify-center">
                เงินค่าประกัน {itemContract.insurance_price} - xxx = xxxx บาท
              </p>
              <p className="flex justify-center leading-10">
                คุณจะได้รับเงินคืน xxx บาท
              </p>
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
              ยินยอมรับเงินค่าประกันคืน
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            disabled={!isCheck}
            onClick={() => {
              //   update mongo
              if (
                itemContract.tr_state === "waitForConfirmInsur" &&
                !formDebate
              ) {
                // console.log("dd");
                waitForConfirmInsur({ tr_state: "success" }, itemContract._id)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }
              setSelect(false);
            }}
            className="disabled:opacity-50 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-600 to-yellow-400 px-2 py-1 rounded-lg border-[1px] border-grey-300"
          >
            ยินยอม
          </button>
          <button
            className="ml-4 text-white text-lg font-[SarabunBold] bg-stone-600/75 hover:bg-stone-600 px-2 py-1 rounded-lg border-[1px] border-grey-300"
            onClick={() => debateBtn()}
          >
            โต้แย้งเงินค่าประกันหรือค่าอื่นๆ
          </button>
        </div>
        {isDebate && (
          <div className="flex justify-center mt-4 ">
            <textarea
              name="debate-reason"
              placeholder="เหตุผลของการโต้แย้ง"
              className="border-[2px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500 focus:ring-0 w-[80%]"
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WaitForConfirmInsur;
