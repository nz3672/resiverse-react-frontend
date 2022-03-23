import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddRoomCircleBadge = (props) => {
  const { roomForm } = props;
  return (
    <button
      className="mr-2 text-pink-500 p-2 font-['SarabunBold'] bg-pink-300/75 w-[200px] h-[200px] rounded-2xl shadow-lg"
      onClick={() => {
        roomForm();
      }}
    >
      <FontAwesomeIcon
        className="h-10 w-10 self-center"
        icon="fa-solid fa-plus"
      />
      <h2 className="self-center">add room</h2>
    </button>
  );
};

export default AddRoomCircleBadge;
