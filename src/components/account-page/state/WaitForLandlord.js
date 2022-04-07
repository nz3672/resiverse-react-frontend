import { useState } from "react";
import { waitForLandlordEvent } from "../SubmitEvent";

const WaitForLandlord = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [imgs, setImgs] = useState([]);

  const onChange = (e) => {
    setImgs(e.target.files);
  };
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ยืนยันที่พักของคุณให้กับผู้เช่า
            </h1>

            <h1 className="text-xl leading-10 text-pink-500 font-bold">
              คุณ&nbsp;{itemContract.tenant_id.u_username}
              &nbsp;ต้องการเช่าที่พักของคุณ
            </h1>
            <p className="text-lg leading-7 mb-4">
              <b>ที่พัก:</b>&nbsp;
              {itemContract.bd_id.bd_name}
              <br />
              <b>ห้อง:</b>&nbsp;
              {itemContract.room_name}
              <br />
              <b>ค่าเช่าห้องพัก:</b>&nbsp;
              {itemContract.room_price}
              <br />
              <b>ค่าประกันห้องพัก:</b>&nbsp;
              {itemContract.insurance_price}
              <br />
            </p>
            <h1 className="text-pink-500 text-lg flex justify-center">
              <i>
                ผู้ให้เช่าจะได้รับเงินค่าเช่าห้องพักทันทีเมื่อผู้เช่าทำการยืนยันการเข้าพัก
              </i>
            </h1>
          </div>
          <div className="bg-stone-300/75 rounded-lg mt-3 py-6 h-fit flex justify-center">
            <label className="bg-pink-500 font-medium outline-0 mr-4 rounded-lg p-2 shadow-md shadow-pink-300 justify-between text-white font-medium cursor-pointer font-bold">
              <input type="file" onChange={onChange} multiple />
              Choose file
            </label>
          </div>

          <div className="flex flex-rows mt-3 pt-3">
            <input
              type="checkbox"
              className="focus:ring-0 focus:ring-offset-0 border-1 w-6 h-6 border-gray-400  text-pink-500 focus:text-pink-500 self-center"
              onChange={(e) => {
                setIsCheck(e.target.checked);
              }}
            />
            <span className="text-lg pl-4 leading-7">
              ยินยอมให้เว็บไซต์ดำเนินการคืนเงินค่าประกันให้ผู้เช่า
              หรือผู้ให้เช่าเมื่อครบกำหนดวันสิ้นสุดสัญญา อ่านต่อ
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            disabled={!isCheck}
            onClick={() => {
              // console.log(itemContract);
              //   update mongo
              if (itemContract.tr_state === "waitLandlordConfirm") {
                waitForLandlordEvent(
                  { tr_state: "waitTenantConfirm", room_state_pic: imgs },
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
              setImgs([]);
            }}
            className="disabled:opacity-50 text-white text-lg font-[SarabunBold] bg-gradient-to-r from-pink-500 to-yellow-300 px-2 py-1 rounded-lg border-[1px] border-grey-300">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitForLandlord;
