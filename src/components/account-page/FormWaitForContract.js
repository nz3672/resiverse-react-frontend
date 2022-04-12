import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WaitForLandlord from "./state/WaitForLandlord";
import WaitForResponse from "./state/WaitForResponse";
import WaitForTenant from "./state/WaitForTenant";
import WaitTenantMoveIn from "./state/WaitTenantMoveIn";
import WaitTenantMoveOut from "./state/WaitTenantMoveOut";
import WaitLandlordCheckInsur from "./state/WaitLandlordCheckInsur";
import WaitForConfirmInsur from "./state/waitForConfirmInsur";
import WaitLandlordConfirmInsur from "./state/WaitLandlordConfirmInsur";

const FormWaitForContract = (props) => {
  const { setSelect, itemContract, myUser, setTranslist, translists } = props;

  const componentEvent = () => {
    if (itemContract.tr_state === "waitLandlordConfirm") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForLandlord
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="กรุณารอ 2-3 วัน"
          />
        );
      }
    } else if (itemContract.tr_state === "waitTenantConfirm") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="กรุณารอการชำระเงิน 2-3 วัน"
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForTenant
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      }
    } else if (itemContract.tr_state === "waitTenantMoveIn") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="อยู่ระหว่างรอผู้เช่าย้ายเข้าที่พัก วันที่ย้ายเข้าสามารถแจ้งให้ผู้เช่ายืนยันเข้าที่พักได้ก่อนเข้าพัก"
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitTenantMoveIn
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      }
    } else if (itemContract.tr_state === "waitTenantMoveOut") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="ผู้เช่าอยู่ระหว่างการพักอาศัยตามสัญญา"
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitTenantMoveOut
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      }
    } else if (itemContract.tr_state === "waitLandlordCheckInsur") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitLandlordCheckInsur
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="กรุณารอผู้ให้เช่าบันทึกค่าเสียหายของห้องพัก"
          />
        );
      }
    } else if (itemContract.tr_state === "waitForConfirmInsur") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="กรุณารอผู้เช่ายืนยันค่าความเสียหาย"
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForConfirmInsur
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      }
    } else if (itemContract.tr_state === "success") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="ยืนยันรับเงินคืนเรียบร้อย"
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="ยืนยันรับเงินคืนเรียบร้อย"
          />
        );
      }
    } else if (itemContract.tr_state === "debateInsur") {
      if (itemContract.landlord_id === myUser._id) {
        return (
          <WaitLandlordConfirmInsur
            itemContract={itemContract}
            setTranslist={setTranslist}
            setSelect={setSelect}
            translists={translists}
          />
        );
      } else if (itemContract.tenant_id._id === myUser._id) {
        return (
          <WaitForResponse
            setSelect={setSelect}
            itemContract={itemContract}
            descript="รอผู้ให้เช่ายืนยันค่าประกัน"
          />
        );
      }
    }
  };
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
          {componentEvent()}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FormWaitForContract;
