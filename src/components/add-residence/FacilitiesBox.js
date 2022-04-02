import React, { useState, useEffect } from "react";
import CheckboxFacility from "./CheckboxFacility";
const FacilitiesBox = (props) => {
  const { setForm, checkbox, setCheckbox } = props;
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, facilities: facilities }));
    return () => {};
  }, [facilities]);

  return (
    <div className="w-[600px] border-2 border-gray-400 px-10 py-2 rounded-2xl">
      <h1 className="mb-2 text-3xl font-['SarabunBold'] font-extrabold text-pink-500">
        Facilities
      </h1>
      <div className="text-xl grid grid-cols-2 gap-2 font-['SarabunBold']  ">
        <CheckboxFacility
          label="Pet Friendly"
          desc="ที่พักที่อนุญาตให้เลี้ยงสัตว์ได้อย่างเปิดเผย"
          setFacilities={setFacilities}
          checkbox={checkbox.PetFriendly}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="WIFI Available"
          desc="มี WIFI ให้บริการ"
          setFacilities={setFacilities}
          checkbox={checkbox.WIFIAvailable}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="Parking"
          desc="มีที่จอดรถให้บริการ"
          setFacilities={setFacilities}
          checkbox={checkbox.Parking}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="Laundry Available"
          desc="มีร้านสำหรับบริการซัก-รีดให้บริการ"
          setFacilities={setFacilities}
          checkbox={checkbox.LaundryAvailable}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="Fitness"
          desc="โรงยิม / ฟิตเนส"
          setFacilities={setFacilities}
          checkbox={checkbox.Fitness}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="BTS or MRT"
          desc="อยู่ใกล้กับรถไฟฟ้า"
          setFacilities={setFacilities}
          checkbox={checkbox.BTSorMRT}
          setCheckbox={setCheckbox}
        />
        <CheckboxFacility
          label="Near Department"
          desc="อยู่ใกล้กับร้านสะดวกซื้อหรือห้างสรรพสินค้า"
          setFacilities={setFacilities}
          checkbox={checkbox.NearDepartment}
          setCheckbox={setCheckbox}
        />
      </div>
      {/* <img src={wave1} className=" absolute bottom-0 left-0" /> */}
    </div>
  );
};

export default FacilitiesBox;
