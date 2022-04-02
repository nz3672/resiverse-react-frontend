import React, { useState } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomForm = (props) => {
  const { roomForm, setRooms, form } = props;
  const [roomDetail, setRoomDetail] = useState({
    roomName: "",
    roomSize: "",
    roomPrice: "",
    roomInsurance: "",
  });

  const onChange = (e) => {
    setRoomDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addRoomEvent = () => {
    setRooms((prev) => [...prev, roomDetail]);
    roomForm();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white w-[30%] h-fit  rounded-2xl flex-col">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon="fa-regular fa-circle-xmark"
              className="text-pink-400 mr-4 mt-4 cursor-pointer"
              onClick={() => {
                roomForm();
              }}
            />
          </div>
          <div className="grid place-content-center p-10">
            <h1 className="text-2xl justify-self-center">
              เพิ่มรายละเอียดห้อง
            </h1>
            <Input
              name="roomName"
              placeholder="Name"
              type="text"
              onChange={onChange}
              form={form.roomName}
            />
            <Input
              name="roomSize"
              placeholder="Size (ตร.ม.)"
              type="text"
              onChange={onChange}
              form={form.roomSize}
            />
            <Input
              name="roomPrice"
              placeholder="Price"
              type="text"
              onChange={onChange}
              form={form.roomPrice}
            />
            <Input
              name="roomInsurance"
              placeholder="Insurance"
              type="text"
              onChange={onChange}
              form={form.roomInsurance}
            />
            <button
              className="bg-gradient-to-r from-pink-500 to-yellow-300 text-white py-1 mt-4 rounded-xl"
              onClick={() => {
                addRoomEvent();
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-pink-200"></div>
    </>
  );
};

export default RoomForm;
