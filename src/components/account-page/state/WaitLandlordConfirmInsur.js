import { useState } from "react";
import { waitForLandlordConfirmInsur } from "../SubmitEvent";

const WaitLandlordConfirmInsur = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [woodPay, setWoodPay] = useState(0);
  const [wallPay, setWallPay] = useState(0);
  const [nailPay, setNailPay] = useState(0);
  const [formDebate, setFormDebate] = useState("");
  const [picInsur, setPicInsur] = useState([]);
  const [editInsur, seteditInsur] = useState(false);
  const [formInsurType, setFormInsurType] = useState({
    wood: itemContract.tr_insur_left_type.wood,
    wall: itemContract.tr_insur_left_type.wall,
    nail: itemContract.tr_insur_left_type.nail,
  });

  const handleOpenedit = () => {
    seteditInsur(!editInsur);
  };

  const onChange = (e) => {
    setFormDebate(e.target.value);
  };

  const onChangeType = (e) => {
    if (e.target.name.substring(0, 4) === "wood") {
      if (e.target.name === "woodCountDamage") {
        setWoodPay(parseInt(e.target.value) * 100);
      }
      setFormInsurType((prev) => ({
        ...prev,
        wood: {
          ...prev.wood,
          [e.target.name]: e.target.value,
          woodMoneyDamage: e.target.value * 100,
        },
      }));
    } else if (e.target.name.substring(0, 4) === "wall") {
      if (e.target.name === "wallCountDamage") {
        setWallPay(parseInt(e.target.value) * 50);
      }
      setFormInsurType((prev) => ({
        ...prev,
        wall: {
          ...prev.wall,
          [e.target.name]: e.target.value,
          wallMoneyDamage: e.target.value * 50,
        },
      }));
    } else if (e.target.name.substring(0, 4) === "nail") {
      if (e.target.name === "nailCountDamage") {
        setNailPay(parseInt(e.target.value) * 200);
      }
      setFormInsurType((prev) => ({
        ...prev,
        nail: {
          ...prev.nail,
          [e.target.name]: e.target.value,
          nailMoneyDamage: e.target.value * 200,
        },
      }));
    }
    // setFormInsurType((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ผู้เช่าต้องการโต้แย้งค่าประกัน
            </h1>
            <div className="flex">
              <h1 className="text-lg text-pink-500 font-bold">
                เหตุผลการโต้แย้ง:&nbsp;
              </h1>
              <p className="text-black text-lg">
                {itemContract.tr_debate_reason}
              </p>
            </div>
            <div className="mt-4">
              {editInsur && (
                <div className="bg-pink-300/75 rounded-lg mt-3 py-3 px-4">
                  <div className="mb-3 grid gap-2 bg-pink-400 p-2 rounded-xl">
                    <label>
                      วัสดุไม้
                      <input
                        placeholder="จำนวนรอย"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="woodCountDamage"
                      />
                      <input
                        placeholder="ค่าเสียหาย (บาท)"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="woodMoneyDamage"
                        value={woodPay}
                      />
                    </label>
                    <label className="">
                      ผนัง
                      <input
                        placeholder="จำนวนรอย"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="wallCountDamage"
                      />
                      <input
                        placeholder="ค่าเสียหาย (บาท)"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="wallMoneyDamage"
                        value={wallPay}
                      />
                    </label>
                    <label className="">
                      รอยตะปู
                      <input
                        placeholder="จำนวนรอย"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="nailCountDamage"
                      />
                      <input
                        placeholder="ค่าเสียหาย (บาท)"
                        className="border-[1px] border-stone-500 p-1 rounded-lg mx-2 focus:outline-0 focus:border-pink-500"
                        onChange={onChangeType}
                        name="nailMoneyDamage"
                        value={nailPay}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-6">
          <div className="flex justify-evenly">
            {editInsur && (
              <button
                onClick={() => {
                  //   update mongo
                  if (itemContract.tr_state === "debateInsur") {
                    console.log(formInsurType);
                    console.log(editInsur);
                    waitForLandlordConfirmInsur(
                      {
                        tr_state: "waitForConfirmInsur",
                        tr_insur_left_type: formInsurType,
                        tr_landlord_debate: true,
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
                className="mt-2 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 hover:from-pink-600 hover:to-yellow-400 py-1 rounded-lg border-[1px] border-grey-300"
              >
                ยืนยันการแก้ไข
              </button>
            )}
            <button
              className="mt-2 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 hover:from-pink-600 hover:to-yellow-400 py-1 rounded-lg border-[1px] border-grey-300"
              onClick={() => handleOpenedit()}
            >
              แก้ไขการคำนวน
            </button>
            <button
              onClick={() => {
                //   update mongo
                if (itemContract.tr_state === "debateInsur") {
                  console.log(formInsurType);
                  console.log(editInsur);
                  waitForLandlordConfirmInsur(
                    {
                      tr_state: "waitForConfirmInsur",

                      tr_landlord_debate: false,
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
              className="mt-2 text-white text-lg font-[SarabunBold] bg-zinc-300 py-1 rounded-lg border-[1px] border-grey-300"
            >
              ไม่แก้ไขการคำนวน
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitLandlordConfirmInsur;
