import React from "react";

const Widget = () => {
  return (
    <div className="hover-widget hover:bg-pink-500 rounded-3xl shadow-xl w-80 h-90 bg-white bg-opacity-50 pt-5 pb-4 px-4">
      <div className="w-72 h-auto">
        <img
          alt="building-placeholder"
          src={require("../../img/placeholder/building-placeholder-4-3.png")}
          className="object-contain rounded-xl w-full h-full"
        ></img>
      </div>

      <div className="mt-4">
        <div className="flex mb-2">
          <img
            alt="verify-badge"
            src={require("../../img/icon/verify-badge1.png")}
            className="object-contain rounded-xl w-7 pr-1 self-center"
          ></img>
          <h2 className="font-['SarabunBold'] text-xl">Building name</h2>
        </div>

        <div id="description-widget" className="px-2 mb-3">
          <h2 className="font-['SarabunMed'] text-base mb-1">5000-10000 บาท</h2>
          <p className="font-['SarabunLight'] text-sm">
            ราษฎร์บูรณะ, กรุงเทพมหานคร
          </p>
        </div>

        <div id="buff" className="mt-2 flex">
          <div className="has-tooltip mr-1">
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
              src={require("../../img/icon/buff/pet-buff.png")}
              className=" object-contain rounded-xl w-9 pr-1 self-center"
            ></img>
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mb-10 text-sm">
              Pet unfriendly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
