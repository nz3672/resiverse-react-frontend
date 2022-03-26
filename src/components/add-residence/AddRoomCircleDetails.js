import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddRoomCircleDetails = (props) => {
  const { onChange, rooms, index } = props;
  return (
    <div key={index}>
      <button className="mr-2 text-pink-500 p-2 font-['SarabunBold'] bg-pink-300/75 w-[200px] h-[200px] rounded-2xl shadow-lg">
        <h2 className="self-center" name="roomName" onChange={onChange}>
          {rooms.roomName}
        </h2>
        <h2 className="self-center" name="roomSize" onChange={onChange}>
          {rooms.roomSize}
        </h2>
        <h2 className="self-center" name="roomPrice" onChange={onChange}>
          {rooms.roomPrice}
        </h2>

        <FontAwesomeIcon
          icon="fa-solid fa-ellipsis"
          className="h-10 w-10 self-center"
          onClick={() => {}}
        />
      </button>
    </div>
  );
};

export default AddRoomCircleDetails;
