import { useState } from "react";
import { waitForTenantdEvent } from "../SubmitEvent";
import { Link } from "react-router-dom";
// show bank and input slip
const WaitForTenant = (props) => {
  const { itemContract, setTranslist, setSelect, translists } = props;
  const [isCheck, setIsCheck] = useState(false);
  const [slipImg, setSlipImg] = useState([]);

  const onChange = (e) => {
    setSlipImg(e.target.files);
  };
  return (
    <>
      <div className="mx-6">
        <div className="grid divide-y">
          <div className="">
            <h1 className="font-bold text-2xl flex justify-center mb-2">
              ชำระเงินค่าที่พักและค่าประกัน
            </h1>

            <h1 className="text-xl leading-10 text-pink-500 font-bold">
              กรุณาชำระเงินภายใน 2-3 วัน
            </h1>
            <p className="text-lg leading-7 mb-4">
              <b>ธนาคาร:</b>&nbsp; xxxxx
              <br />
              <b>เลขบัญชี:</b>&nbsp; xxxxx
              <br />
              <b>ชื่อบัญชี:</b>&nbsp; xxxxx
              <br />
            </p>
          </div>
          <div className="bg-stone-300/75 rounded-lg mt-3 pt-3 ">
            <p className="text-lg leading-7 mb-4 px-4">
              <b>รูปแบบห้อง:</b>&nbsp; {itemContract.room_name}
              <br />
              <b>ค่าเช่าห้องพัก:</b>&nbsp; {itemContract.room_price} บาท
              <br />
              <b>ค่าประกันห้องพัก:</b>&nbsp; {itemContract.insurance_price} บาท
              <br />
            </p>
            <h1 className="text-pink-500 text-lg flex justify-center font-bold mb-3">
              ยอดชำระรวม&nbsp;
              <i>
                {parseInt(itemContract.room_price) +
                  parseInt(itemContract.insurance_price)}{" "}
                บาท
              </i>
            </h1>
          </div>
          <div className="bg-pink-400/75 rounded-lg my-3 py-3 px-4">
            <p className="text-lg leading-7 mb-3 font-bold">
              ยืนยันการชำระเงินของคุณที่นี่
            </p>
            <div className="flex">
              <label className="bg-pink-500 hover:bg-pink-400 font-medium outline-0 mr-4 rounded-lg p-2 shadow-md shadow-pink-300 justify-between  text-white font-medium cursor-pointer font-bold">
                <input type="file" onChange={onChange} />
                Choose file
              </label>
              <h1 className="self-center">
                {slipImg.length > 0 ? slipImg[0].name : "Choose file"}
              </h1>
            </div>
          </div>
          <div className="flex flex-rows mt-3 pt-3">
            <input
              type="checkbox"
              className="focus:ring-0 focus:ring-offset-0 border-1 w-6 h-6 border-gray-400  text-pink-500 focus:text-pink-500 self-center"
              onChange={(e) => {
                setIsCheck(e.target.checked);
              }}
            />
            <div className="flex">
              <span className="text-lg pl-4 leading-7">
                ยินยอมให้เว็บไซต์ดำเนินการคืนเงินค่าประกันให้ผู้เช่า
                หรือผู้ให้เช่าเมื่อครบกำหนดวันสิ้นสุดสัญญา
                <Link to="/agreement" target="_blank" rel="noopener noreferrer">
                  <span className="text-pink-500">&nbsp;อ่านต่อ</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            disabled={!isCheck}
            onClick={() => {
              //   update mongo
              if (itemContract.tr_state === "waitTenantConfirm") {
                waitForTenantdEvent(
                  { tr_state: "waitTenantMoveIn", tr_slip_img: slipImg },
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

export default WaitForTenant;
