import React from "react";
import { useSelector } from "react-redux";
import Widget from "../search/Widget";

const MyResidence = () => {
  const { residences } = useSelector((state) => state.myResStore);

  return (
    <div className="h-full flex">
      {residences.map((res, i) => {
        return (
          <div key={i} className="mr-4 h-fit rounded-3xl bg-pink-200">
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
  );
};

export default MyResidence;
