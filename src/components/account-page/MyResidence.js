import React, { useState } from "react";
import { useSelector } from "react-redux";
import Widget from "../search/Widget";
import UpdateResident from "./UpdateResident";

const MyResidence = () => {
  const { residences } = useSelector((state) => state.myResStore);
  const [openUpdateRes, setUpdateRes] = useState(false);
  const [residenceInfo, setResidenceInfo] = useState(null);
  const [residenceKey, setKey] = useState();

  const handlewidgetOnClick = (res, key) => {
    setResidenceInfo(res);
    setUpdateRes(true);
    setKey(key);
  };

  return (
    <>
      <div className="h-full flex">
        {residences.map((res, i) => {
          return (
            <div
              key={i}
              className="mr-4 h-fit rounded-3xl bg-pink-200"
              onClick={() => handlewidgetOnClick(res, i)}>
              <Widget
                key={i}
                placeDetails={{
                  imageURL: res.bd_img,
                  name: res.bd_name,
                  facilities: res.bd_facilities,
                  address: {
                    addrSubDistrict: res.bd_address.bd_subDist,
                    addrProvince: res.bd_address.bd_province,
                  },
                  room: res.bd_room,
                }}
              />
            </div>
          );
        })}
      </div>
      {openUpdateRes && (
        <UpdateResident
          setOpenWindow={setUpdateRes}
          information={residenceInfo}
          residenceKey={residenceKey}
        />
      )}
    </>
  );
};

export default MyResidence;
