import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountLeftBox = (props) => {
  const { setRightBox } = props;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authStore
  );
  return (
    <div className="mx-4 my-4 ">
      <div className="flex items-center">
        <FontAwesomeIcon
          className="h-14 mr-4 "
          icon="fa-solid fa-circle-user"
        />
        <h1 className="text-2xl font-bold">{user.user.u_username}</h1>
      </div>

      <div className="mt-6 flex flex-col">
        <button
          onClick={() => {
            setRightBox("Account");
          }}
          className="hover:bg-pink-500/25 focus:bg-pink-500/25 rounded-lg py-1"
        >
          <label className="text-xl flex justify-start cursor-pointer">
            <FontAwesomeIcon
              className="ml-2 mr-4 self-center"
              icon="fa-regular fa-user"
            />
            Account
          </label>
        </button>
        <button
          onClick={() => {
            setRightBox("Nofitifation");
          }}
          className="hover:bg-pink-500/25 focus:bg-pink-500/25 rounded-lg py-1"
        >
          <label className="text-xl flex justify-start cursor-pointer">
            <FontAwesomeIcon
              className="ml-2 mr-4 self-center"
              icon="fa-solid fa-bell"
            />
            Nofitifation
          </label>
        </button>
        <button
          onClick={() => {
            setRightBox("MyResidence");
          }}
          className="hover:bg-pink-500/25 focus:bg-pink-500/25 rounded-lg py-1"
        >
          <label className="text-xl flex justify-start cursor-pointer">
            <FontAwesomeIcon
              className="ml-2 mr-4 self-center"
              icon="fa-solid fa-house"
            />
            My Residence
          </label>
        </button>
        <button
          onClick={() => {
            setRightBox("TransactionList");
          }}
          className="hover:bg-pink-500/25 focus:bg-pink-500/25 rounded-lg py-1"
        >
          <label className="text-xl flex justify-start cursor-pointer">
            <FontAwesomeIcon
              className="ml-2 mr-4 self-center"
              icon="fa-regular fa-file-lines"
            />
            Transaction List
          </label>
        </button>
      </div>
    </div>
  );
};

export default AccountLeftBox;
