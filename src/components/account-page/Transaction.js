import { useEffect, useState } from "react";
import { getMyResidenceById } from "../../api/Get";
import { dateFormate } from "../../utils/DateFormate";
import { store } from "../app/store";

const Transaction = (props) => {
  const { setSelect, translist } = props;
  // const [myRes, setMyRes] = useState();

  // useEffect(() => {
  //   console.log(translist);
  //   getMyResidenceById(translist.bd_id)
  //     .then((res) => {
  //       setMyRes(res);

  //       // Set into Translist for no request again
  //       setTranslist(
  //         translists.map((obj) => {
  //           if (obj._id === translist._id) {
  //             return {
  //               ...obj,
  //               bd_obj: res,
  //             };
  //           } else {
  //             return obj;
  //           }
  //         })
  //       );
  //     })
  //     .catch((err) => console.log(err));

  //   // const user = await store.getState().authStore.user;

  //   return () => {};
  // }, []);

  return (
    <button
      className="w-full bg-[#272945] rounded-xl min-h-[10%] h-[15%] mb-4 shadow-md hover:translate-y-1 transition ease-in-out"
      onClick={() => {
        setSelect(true);
      }}
    >
      <div className="w-[100%] h-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-300 clip-transaction-bg-style">
        <div className="grid grid-cols-3 px-2 py-2 h-full justify-items-start">
          {translist.hasOwnProperty("bd_obj") &&
            translist.hasOwnProperty("u_obj") && (
              <div className="text-white ">
                <h1 className="ml-2 font-[SarabunMed] flex justify-start text-lg">
                  {translist.hasOwnProperty("bd_obj") &&
                    translist.bd_obj.bd_name}
                </h1>

                <h1 className="ml-4 flex justify-start text-lg">
                  ชื่อผู้เช่า :{" "}
                  {translist.hasOwnProperty("u_obj") &&
                    translist.u_obj.u_username}
                </h1>
                <h1 className="ml-4 flex justify-start text-lg">
                  วันที่เริ่มต้นอยู่อาศัย :{" "}
                  {dateFormate(translist.tr_start_date)}
                </h1>
              </div>
            )}
          <div></div>
          <div>model</div>
        </div>
      </div>
    </button>
  );
};

export default Transaction;
