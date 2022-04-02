import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddRoomCircleDetails = (props) => {
  const { onChange, room, index, setRooms, rooms } = props;
  const [dropdown, setDropdown] = useState(false);

  const dropdownEvent = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const deleteRoom = () => {
    const newRooms = rooms.filter((item) => item.roomName !== room.roomName);
    setRooms(newRooms);
  };
  return (
    <div key={index}>
      <div className="mr-2  text-pink-500 p-2 font-['SarabunBold'] bg-pink-300/75 w-[200px] h-[200px] rounded-2xl shadow-lg">
        <div className="h-[70%] my-0 py-0 grid place-content-center">
          <h2 className="" name="roomName" onChange={onChange}>
            ชื่อห้อง : {room.roomName}
          </h2>
          <h2 className="" name="roomSize" onChange={onChange}>
            ขนาด : {room.roomSize} ตร.ม.
          </h2>
          <h2 className="" name="roomPrice" onChange={onChange}>
            ค่าเช่า : {room.roomPrice} บาท/เดือน
          </h2>
          <h2 className="" name="roomInsurance" onChange={onChange}>
            ค่าประกัน : {room.roomInsurance} บาท
          </h2>
        </div>

        <div className="h-[30%]">
          <button
            className="w-full h-fit"
            onClick={() => {
              dropdownEvent();
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" className="h-6 w-10" />
          </button>
          <div
            className={`${
              dropdown ? "flex flex-rows justify-center" : " hidden"
            } `}
          >
            <h2
              className="w-fit bg-white p-1 rounded-md border-2 border-gray-300 cursor-pointer"
              onClick={() => {
                deleteRoom();
              }}
            >
              delete
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomCircleDetails;
