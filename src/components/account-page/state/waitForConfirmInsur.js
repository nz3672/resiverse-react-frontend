import { useState } from "react";
import { waitForConfirmInsur } from "../SubmitEvent";

const WaitForConfirmInsur = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [formDebate, setFormDebate] = useState("");
  const [isDebate, setIsDebate] = useState(false);
  const [picInsur, setPicInsur] = useState([]);
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
  const onChangePic = (e) => {
    setPicInsur(e.target.files);
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
                <b>ค่าความเสียหายของห้องรวม:</b>{" "}
                {itemContract.tr_insur_after_left.insuranceAfLeft} บาท
                โดยแบ่งตามวัสดุได้ดังนี้
              </p>
            </div>
            <div className="mb-3">
              <p>
                <b>วัสดุไม้</b> จำนวน{" "}
                {itemContract.tr_insur_left_type.wood.woodCountDamage} รอย{" "}
                รวมเป็นเงินทั้งสิ้น{" "}
                {itemContract.tr_insur_left_type.wood.woodMoneyDamage} บาท
              </p>
              <p>
                <b>ผนัง</b> จำนวน{" "}
                {itemContract.tr_insur_left_type.wall.wallCountDamage} รอย{" "}
                รวมเป็นเงินทั้งสิ้น{" "}
                {itemContract.tr_insur_left_type.wall.wallMoneyDamage} บาท
              </p>
              <p>
                <b>รอยตะปู</b> จำนวน{" "}
                {itemContract.tr_insur_left_type.nail.nailCountDamage} รอย{" "}
                รวมเป็นเงินทั้งสิ้น{" "}
                {itemContract.tr_insur_left_type.nail.nailMoneyDamage} บาท
              </p>
            </div>
            <div className="flex justify-evenly">
              <div className="flex mb-3">
                <p>
                  <b>ค่าน้ำ:</b>{" "}
                  {itemContract.tr_insur_after_left.waterUnitAfLeft}&nbsp;หน่วย
                  <br />
                  <b>ยอดค่าใช้จ่าย:</b>{" "}
                  {itemContract.tr_insur_after_left.waterAfLeft} บาท
                </p>
              </div>
              <div className="flex ">
                <p>
                  <b>ค่าไฟ:</b>{" "}
                  {itemContract.tr_insur_after_left.electUnitAfLeft}
                  &nbsp;หน่วย
                  <br />
                  <b>ยอดค่าใช้จ่าย:</b>{" "}
                  {itemContract.tr_insur_after_left.electAfLeft} บาท
                </p>
              </div>
            </div>

            <div className="text-xl font-bold">
              <p className="text-pink-500 flex justify-center">
                เงินค่าประกัน {itemContract.insurance_price} -{" "}
                {parseInt(itemContract.tr_insur_after_left.electAfLeft) +
                  parseInt(
                    itemContract.tr_insur_left_type.wall.wallMoneyDamage
                  ) +
                  parseInt(
                    itemContract.tr_insur_left_type.wood.woodMoneyDamage
                  ) +
                  parseInt(
                    itemContract.tr_insur_left_type.nail.nailMoneyDamage
                  ) +
                  parseInt(itemContract.tr_insur_after_left.waterAfLeft)}{" "}
                = {itemContract.tr_getBackInsurForTenant} บาท
              </p>
              <p className="flex justify-center leading-10">
                คุณจะได้รับเงินคืน {itemContract.tr_getBackInsurForTenant} บาท
              </p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <img
              className="object-cover w-[50%] pt-2"
              src={itemContract.room_insur_pic}
            />
          </div>
          {!itemContract.tr_landlord_debate && (
            <p className="text-red-600 pt-2 font-bold text-xl">
              ผู้ให้เช่าไม่ยินยอมในการแก้ไขค่าประกัน
            </p>
          )}

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
        <div className="flex justify-center mt-2">
          <button
            disabled={!isCheck}
            onClick={() => {
              //   update mongo
              if (itemContract.tr_state === "waitForConfirmInsur") {
                // console.log("dd");

                waitForConfirmInsur(
                  {
                    tr_state: "success",
                    tr_debate_reason: formDebate,
                    tr_isDebate: isDebate,
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
            className="disabled:opacity-50 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-600 to-yellow-400 px-2 py-1 rounded-lg border-[1px] border-grey-300"
          >
            ยินยอม
          </button>
          <button
            className="ml-3 text-white text-lg font-[SarabunBold] bg-stone-600/75 hover:bg-stone-600 px-2 py-1 rounded-lg border-[1px] border-grey-300"
            onClick={() => debateBtn()}
          >
            {isDebate ? "ยกเลิกการโต้แย้ง" : "โต้แย้งเงินค่าประกันหรือค่าอื่นๆ"}
          </button>
          {isDebate && (
            <button
              className="ml-3 bg-pink-500 hover:bg-pink-400 text-white font-semibold p-2 h-fit self-center rounded-xl"
              onClick={() => {
                if (isDebate) {
                  waitForConfirmInsur(
                    {
                      tr_state: "debateInsur",
                      tr_debate_reason: formDebate,
                      tr_isDebate: isDebate,
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
                  setSelect(false);
                }
              }}
            >
              ยืนยันการโต้แย้ง
            </button>
          )}
        </div>
        {isDebate && (
          <div className="flex justify-center mt-4 ">
            <div className="w-full">
              <div className="flex justify-center">
                <textarea
                  name="debate-reason"
                  placeholder="เหตุผลของการโต้แย้ง"
                  className="border-[2px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500 focus:ring-0 w-[80%] "
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-center ">
                {/* {console.log(picInsur)} */}
                <div className="mt-2">
                  <label className="mt-2 self-center bg-pink-500 font-medium outline-0 mr-4 rounded-lg px-2 py-1 shadow-md shadow-pink-300 justify-between text-white font-medium cursor-pointer font-bold">
                    <input type="file" onChange={onChangePic} />
                    Choose file
                  </label>
                </div>
                <p className="self-center">
                  {picInsur.length > 0 ? picInsur[0].name : "Choose file"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WaitForConfirmInsur;
