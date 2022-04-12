import { useState } from "react";
import { waitLandlordCheckInsur } from "../SubmitEvent";

const WaitLandlordCheckInsur = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [formInsur, setFormInsur] = useState({});
  const [numberOfPay, setNumberOfPay] = useState();
  const [woodPay, setWoodPay] = useState(0);
  const [wallPay, setWallPay] = useState(0);
  const [nailPay, setNailPay] = useState(0);
  const [picInsur, setPicInsur] = useState([]);
  const [formInsurType, setFormInsurType] = useState({
    wood: {},
    wall: {},
    nail: {},
  });

  const onChange = (e) => {
    setFormInsur((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const calculate = () => {
    setNumberOfPay(
      parseInt(formInsur.electAfLeft) +
        parseInt(formInsurType.wall.wallMoneyDamage) +
        parseInt(formInsurType.wood.woodMoneyDamage) +
        parseInt(formInsurType.nail.nailMoneyDamage) +
        parseInt(formInsur.waterAfLeft)
    );
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
              ผู้ให้เช่ากรอกค่าความเสียหาย
            </h1>
          </div>
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
            <div className="">
              {/* {console.log(picInsur)} */}
              <label className="bg-pink-500 font-medium outline-0 mr-4 rounded-lg px-2 py-1 shadow-md shadow-pink-300 justify-between text-white font-medium cursor-pointer font-bold">
                <input type="file" onChange={onChangePic} />
                Choose file
              </label>
              {picInsur.length > 0 ? picInsur[0].name : "Choose file"}
            </div>

            <div className="flex mb-3 mt-4">
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
              // console.log(formInsurType);
              //   update mongo
              if (itemContract.tr_state === "waitLandlordCheckInsur") {
                waitLandlordCheckInsur(
                  {
                    room_insur_pic: picInsur,
                    tr_insur_left_type: formInsurType,
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
