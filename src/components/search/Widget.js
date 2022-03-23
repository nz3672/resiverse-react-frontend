import React from "react";

const Widget = (props) => {
  const { placeDetails, i } = props;
  return (
    <div
      key={i ? i : ""}
      className="cursor-pointer hover-widget hover:bg-pink-500 rounded-3xl shadow-xl w-[190px] h-[270px] desktop:w-[280px] desktop:h-[370px] bg-white bg-opacity-50 laptop:pb-4 laptop:px-4 laptop:pt-5 pb-2 px-2 pt-2"
    >
      {/* {console.log(placeDetails.hasOwnProperty("imageURL"))} */}
      <div className="w-full min-h-[50%] h-[55%] max-h-[60%]">
        <img
          alt="building-placeholder"
          // src={require("../../img/placeholder/building-placeholder-4-3.png")}
          src={
            placeDetails.hasOwnProperty("imageURL")
              ? placeDetails.imageURL
              : require("../../img/placeholder/building-placeholder-4-3.png")
          }
          className="object-contain rounded-xl w-full h-full"
        ></img>
      </div>
      <div className="mt-4 w-full h-auto">
        <div className="flex mb-2 w-full h-auto ">
          <img
            alt="verify-badge"
            src={require("../../img/icon/verify-badge1.png")}
            className="object-contain rounded-xl w-7 pr-1 self-center"
          ></img>
          <h2 className="font-['SarabunBold'] text-xl truncate w-full">
            {placeDetails.hasOwnProperty("name") ? placeDetails.name : ""}
          </h2>
        </div>
        <div id="description-widget" className="px-2 mb-3">
          <h2 className="font-['SarabunMed'] text-base mb-1">
            {placeDetails.hasOwnProperty("room") &&
            placeDetails.room.length == 1
              ? placeDetails.room[0].roomPrice + " บาท"
              : placeDetails.hasOwnProperty("room") &&
                placeDetails.room.length > 1
              ? placeDetails.room[0].roomPrice +
                "-" +
                placeDetails.room[placeDetails.room.length - 1].roomPrice +
                " บาท"
              : ""}
          </h2>
          <p className="font-['SarabunLight'] text-sm">
            {placeDetails.hasOwnProperty("address")
              ? placeDetails.address.addrSubDistrict +
                " " +
                placeDetails.address.addrProvince
              : ""}
          </p>
        </div>
        {/* {console.log(placeDetails)}
        {console.log(placeDetails.hasOwnProperty("facilities"))} */}
        <div id="buff" className="mt-2 flex">
          {placeDetails.hasOwnProperty("facilities") &&
            placeDetails.facilities.map((facility, i) => {
              return (
                <div key={i} className="has-tooltip mr-1">
                  <img
                    alt="verify-badge"
                    src={require("../../img/icon/buff/pet-buff.png")}
                    className=" object-contain rounded-xl w-9 pr-1 self-center"
                  ></img>
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 mb-10 text-sm">
                    {facility.faName}
                  </span>
                </div>
              );
            })}
          {/* <div className="has-tooltip mr-1">
            <img
              alt="verify-badge"
              src={require("../../img/icon/buff/pet-buff.png")}
              className=" object-contain rounded-xl w-9 pr-1 self-center"
            ></img>
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 mb-10 text-sm">
              Pet friendly
            </span>
          </div>
          <div className="has-tooltip mr-1">
            <img
              alt="verify-badge"
              src={require("../../img/icon/buff/bus-buff.png")}
              className=" object-contain rounded-xl w-9 pr-1 self-center"
            ></img>
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mb-10 text-sm">
              Bus stop
            </span>
          </div>
          <div className="has-tooltip mr-1">
            <img
              alt="verify-badge"
              src={require("../../img/icon/buff/bts-buff.png")}
              className=" object-contain rounded-xl w-9 pr-1 self-center"
            ></img>
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mb-10 text-sm">
              Sky train
            </span>
          </div>
          <div className="has-tooltip mr-1">
            <img
              alt="verify-badge"
              src={require("../../img/icon/buff/shop-buff.png")}
              className=" object-contain rounded-xl w-9 pr-1 self-center"
            ></img>
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mb-10 text-sm">
              Shoping mall
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Widget;
