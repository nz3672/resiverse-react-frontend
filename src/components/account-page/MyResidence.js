import React from "react";
import { useSelector } from "react-redux";
import Widget from "../search/Widget";

const MyResidence = () => {
  const { residences } = useSelector((state) => state.myResStore);

  return (
    <div className="h-full">
      {residences.map((res, i) => {
        return (
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
        );
      })}
    </div>
  );
};

export default MyResidence;
