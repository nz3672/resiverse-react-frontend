import React from "react";
import { Link } from "react-router-dom";

const mockNotificationData = [
  {
    message: "There is a new notification!",
    status: true,
  },
  {
    message: "There is an old notification!",
    status: false,
  },
];

const NotificationPane = (props) => {
  return (
    <ul className="absolute bg-white text-black p-3 rounded-xl top-24 right-2 w-72 grid grid-cols-1 divide-y">
      {mockNotificationData.map((item, index) => (
        <div key={index} className="pointer">
          <li
            className={`truncate text-ellipsis py-1 pl-1 rounded-lg cursor-pointer ${
              item.status ? "bg-pink-200" : ""
            } hover:bg-pink-300`}>
            {item.message}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default NotificationPane;
