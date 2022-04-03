import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WaitForLandlord from "./state1/WaitForLandlord";
import WaitForResponse from "./state1/WaitForResponse";

const FormWaitForContract = (props) => {
  const { setSelect, itemContract, landlord } = props;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white rounded-lg shadow-2xl h-fit w-[40%] pb-6">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon="fa-regular fa-circle-xmark"
              className="text-pink-400 text-lg mr-4 mt-4 cursor-pointer "
              onClick={() => {
                setSelect(false);
              }}
            />
          </div>
          {itemContract.tr_state === "waitLandlordConfirm" &&
          itemContract.landlord_id === landlord._id ? (
            <WaitForLandlord itemContract={itemContract} />
          ) : (
            <WaitForResponse
              setSelect={setSelect}
              itemContract={itemContract}
            />
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FormWaitForContract;
