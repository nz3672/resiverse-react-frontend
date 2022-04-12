import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateResidence } from "../../api/Put";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { initMyRest } from "../features/myResidenceSlice";
import EditInput from "./EditInput";
import FacilitiesBox from "../add-residence/FacilitiesBox";

const UpdateResident = (props) => {
  const { setOpenWindow, information, residenceKey } = props;
  const [formResidenceUpdate, setFormResidenceUpdate] = useState({});
  const [checkbox, setCheckbox] = useState();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const { residences } = useSelector((state) => state.myResStore);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white rounded-lg shadow-2xl h-fit w-[60%] pb-6">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon="fa-regular fa-circle-xmark"
              className="text-pink-400 text-lg mr-4 mt-4 cursor-pointer "
              onClick={() => setOpenWindow(false)}
            />
          </div>
          <div className="flex flex-row p-6">
            <div className="flex flex-col">
              <EditInput
                label="Residence Name"
                dbLabel="bd_name"
                value={information.bd_name}
                setFormUpdateUser={setFormResidenceUpdate}
                isSubmit={submit}
              />
              <EditInput
                label="Description"
                dbLabel="bd_desc"
                value={information.bd_desc}
                setFormUpdateUser={setFormResidenceUpdate}
                isSubmit={submit}
              />
              <div>
                <h1 className="font-['SarabunMed']">Address</h1>
                <EditInput
                  label="House No."
                  dbLabel="bd_address.bd_houseNo"
                  value={information.bd_address.bd_houseNo}
                  setFormUpdateUser={setFormResidenceUpdate}
                  isSubmit={submit}
                />
                <EditInput
                  label="Sub District"
                  dbLabel="bd_address.bd_subDist"
                  value={information.bd_address.bd_subDist}
                  setFormUpdateUser={setFormResidenceUpdate}
                  isSubmit={submit}
                />
                <EditInput
                  label="District"
                  dbLabel="bd_address.bd_dist"
                  value={information.bd_address.bd_dist}
                  setFormUpdateUser={setFormResidenceUpdate}
                  isSubmit={submit}
                />
                <EditInput
                  label="Province"
                  dbLabel="bd_address.bd_province"
                  value={information.bd_address.bd_province}
                  setFormUpdateUser={setFormResidenceUpdate}
                  isSubmit={submit}
                />
                <EditInput
                  label="Post Number"
                  dbLabel="bd_address.bd_postNum"
                  value={information.bd_address.bd_postNum}
                  setFormUpdateUser={setFormResidenceUpdate}
                  isSubmit={submit}
                />
              </div>
              <EditInput
                label="Website"
                dbLabel="bd_website"
                value={information.bd_website}
                setFormUpdateUser={setFormResidenceUpdate}
                isSubmit={submit}
              />
              <EditInput
                label="Line"
                dbLabel="bd_lineid"
                value={information.bd_lineid}
                setFormUpdateUser={setFormResidenceUpdate}
                isSubmit={submit}
              />
              <EditInput
                label="Phone"
                dbLabel="bd_phone"
                value={information.bd_phone}
                setFormUpdateUser={setFormResidenceUpdate}
                isSubmit={submit}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-10 bg-[#3f9d45] rounded-xl px-4 py-2 shadow-md "
              onClick={() => {
                updateResidence(formResidenceUpdate, information._id).then(
                  (update) => {
                    const updatedResidence = [...residences];
                    updatedResidence[residenceKey] = update;
                    dispatch(initMyRest(updatedResidence));
                    toast.success("Updated Your Residence!");
                  }
                );
              }}>
              <h2 className="text-white font-['SarabunBold']">
                Update Residence
              </h2>
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateResident;
