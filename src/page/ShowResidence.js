import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeSidebar,
  resetWidgetInfo,
} from "../components/features/sidebarSlice.js";
import { selectedChatroom } from "../components/features/chatSlice.js";
import { createChatroom } from "../api/Post.js";
import { toast } from "react-toastify";
import RentForm from "../components/show-residence/RentForm.js";
import MapboxComp from "../components/show-residence/MapboxComp.js";

const ShowResidence = () => {
  const dispatch = useDispatch();
  const [showRentForm, setRentForm] = useState(null);
  const { widgetinfo } = useSelector((state) => state.sidebarHome);
  const { user } = useSelector((state) => state.authStore);

  const handleShowRentForm = (input) => {
    setRentForm(input);
  };

  // const handleChat = () => {
  //   createChatroom(user, widgetinfo.ownerId)
  //     .then((res) => {
  //       dispatch(selectedChatroom(res));
  //     })
  //     .catch((err) => console.log("err", err));
  //   dispatch(closeSidebar());
  //   dispatch(resetWidgetInfo());
  // };

  return (
    <>
      <div className="grid grid-cols-2 h-[100vh] font-bold text-zinc-700 text-base font-['SarabunBold']">
        {/* <div className="grid grid-cols-2 "> */}
        <div
          className="flex flex-col justify-evenly p-4 "
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
          }}>
          <div className="shadow-lg bg-white rounded-xl p-3">
            <h1 className=" text-3xl">
              {widgetinfo ? widgetinfo.name : "Place Name"}
            </h1>
            <p className=" mt-2">
              {widgetinfo ? widgetinfo.description : "Description"}
            </p>
          </div>

          <div className="shadow-lg bg-white rounded-xl p-3">
            <h1 className=" text-xl">Address</h1>
            <p className=" mt-2">
              {widgetinfo
                ? widgetinfo.address.addrHouseNo +
                  " " +
                  widgetinfo.address.addrSubDistrict +
                  " " +
                  widgetinfo.address.addrDistrict +
                  " " +
                  widgetinfo.address.addrProvince +
                  " " +
                  widgetinfo.address.addrPostNum
                : "Address"}
            </p>
          </div>
          <div className="text-xl shadow-lg bg-white rounded-xl p-3">
            <h1>Website : {widgetinfo ? widgetinfo.website : "-"}</h1>
            <h1>Line : {widgetinfo ? widgetinfo.line : "-"}</h1>
            <h1>Phone : {widgetinfo ? widgetinfo.phone : "-"}</h1>
          </div>
          <div>
            <div className="h-auto bg-white px-4 py-2 mt-3 rounded-xl space-y-2 shadow-lg grid grid-cols-1">
              <h1 className="text-2xl">Rooms </h1>
              {widgetinfo &&
                widgetinfo.room.map((roomdetail, i) => {
                  return (
                    <div key={i}>
                      <h1>{roomdetail.roomName}</h1>
                      <p>
                        ขนาด: {roomdetail.roomSize} บาท ราคา:{" "}
                        {roomdetail.roomPrice} บาท ค่าประกันห้อง:{" "}
                        {roomdetail.roomInsurance
                          ? roomdetail.roomInsurance
                          : "-"}{" "}
                        บาท
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-row bg-white p-2 rounded-xl shadow-lg justify-center">
            {widgetinfo &&
              widgetinfo.hasOwnProperty("facilities") &&
              widgetinfo.facilities.length !== 0 &&
              widgetinfo.facilities.map((facility, i) => {
                return (
                  <div key={i} className="has-tooltip mr-1">
                    <img
                      alt="verify-badge"
                      src={require(`../img/icon/buff/${facility.faName.replace(
                        /\s/g,
                        ""
                      )}.png`)}
                      className="object-contain rounded-xl w-12 pr-1 self-center transition ease-in-out duration-450 hover:-translate-y-2"></img>
                    <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 mb-10 text-sm ">
                      {facility.faName}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-row justify-center">
            {widgetinfo &&
              user &&
              typeof widgetinfo.ownerId !== "undefined" &&
              widgetinfo.ownerId !== user._id && (
                <>
                  <button
                    className="w-3/12 mt-2 mr-3 bg-white font-medium outline-0 rounded-lg p-2 justify-center text-xl shadow-lg hover:shadow-none "
                    onClick={() => handleShowRentForm(true)}>
                    <span className="gradient-text-btn">Rent</span>
                  </button>
                  {/* <button
                    className="w-2/12 ml-3 mt-2 mr-3 bg-white font-medium outline-0 rounded-lg p-2 justify-center text-xl shadow-lg hover:shadow-none "
                    onClick={() => handleChat()}>
                    <span className="gradient-text-btn">Chat</span>
                  </button> */}
                </>
              )}
          </div>
        </div>
        <div className="grid grid-rows-2 h-[100vh] ">
          <div className="text-white flex flex-row justify-center ">
            <div
              className="p-3 rounded-xl w-11/12 mb-2 mt-2 h-auto"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
              }}>
              <MapboxComp widgetinfo={widgetinfo} />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <img
                  className="w-11/12 max-h-96 rounded-lg mt-5 p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
                  }}
                  src={widgetinfo ? widgetinfo.imageURL : ""}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {showRentForm && (
        <RentForm setRentForm={handleShowRentForm} widgetinfo={widgetinfo} />
      )}
    </>
  );
};

export default ShowResidence;
