import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormOwnerTransaction = (props) => {
  const { setSelect } = props;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-pink-500 rounded-lg shadow-2xl h-[20%] w-[25%]">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon="fa-regular fa-circle-xmark"
              className="text-white text-lg mr-4 mt-4 cursor-pointer "
              onClick={() => {
                setSelect(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FormOwnerTransaction;