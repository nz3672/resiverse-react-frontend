import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AccountLeftBox from "./AccountLeftBox";
import AccountRightBox from "./AccountRightBox";
import MyResidence from "./MyResidence";
import { initMyRest } from "../features/myResidenceSlice";
import { getMyResidence } from "../../api/Get";

const AccountSetting = () => {
  const dispatch = useDispatch();
  const [rightBox, setRightBox] = useState("Account");

  useEffect(() => {
    getMyResidence()
      .then((res) => {
        dispatch(initMyRest(res));
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {};
  }, []);

  const RightBox = () => {
    switch (rightBox) {
      case "Account":
        return <AccountRightBox />;
      case "MyResidence":
        return <MyResidence />;
      default:
        return <AccountRightBox />;
    }
  };

  return (
    <div className="flex flex-row w-full text-[#cdd9e5] font-['SarabunLight']">
      <div className="basis-1/4 bg-[#2d333b] shadow-xl">
        <AccountLeftBox setRightBox={setRightBox} />
      </div>
      <div className="basis-3/4 ml-10 mr-6 my-6">{RightBox()}</div>
    </div>
  );
};

export default AccountSetting;
