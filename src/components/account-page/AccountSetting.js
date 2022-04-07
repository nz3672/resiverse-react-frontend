import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AccountLeftBox from "./AccountLeftBox";
import AccountRightBox from "./AccountRightBox";
import MyResidence from "./MyResidence";
import { initMyRest } from "../features/myResidenceSlice";
import { getMyResidence } from "../../api/Get";
import TransactionList from "./TransactionList";
import { store } from "../app/store";
import NotificationRightBox from "./NotificationRightBox";

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
      case "Notification":
        return <NotificationRightBox setRightBox={setRightBox} />;
      case "MyResidence":
        return <MyResidence />;
      case "TransactionList":
        return <TransactionList />;
      default:
        return <AccountRightBox />;
    }
  };

  return (
    <div className="flex flex-row w-full font-['SarabunLight']">
      <div className="basis-1/4 bg-white shadow-xl rounded-l-lg">
        <AccountLeftBox setRightBox={setRightBox} />
      </div>
      <div className="basis-3/4 ml-10 mr-6 my-6">{RightBox()}</div>
    </div>
  );
};

export default AccountSetting;
