import React from "react";
import { Link } from "react-router-dom";
import AccountSetting from "../components/account-page/AccountSetting";

const Account = () => {
  return (
    <div className="h-[100vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[100vw] flex justify-center flex-col">
      <div className="flex justify-center h-fit">
        <Link to={`/`}>
          <h1 className="font-[righteous] text-[60px] text-white ">
            Resiverse
          </h1>
        </Link>
      </div>

      <div className="shadow-2xl bg-[#373e47] shadow-[#12121280] border-2 border-[#2d333b] mx-10 mb-6 rounded-xl flex flex-auto">
        <AccountSetting />
      </div>
    </div>
  );
};

export default Account;
