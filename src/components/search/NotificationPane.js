import React from "react";
import { Link } from "react-router-dom";

const NotificationPane = (props) => {
  const { notifications } = props;
  return (
    <ul className="absolute bg-white text-black p-3 rounded-xl top-24 right-2 w-72 grid grid-cols-1 divide-y">
      {notifications
        ? notifications.map((item, index) => (
            <Link
              to={`/account`}
              key={index}
              target="_blank"
              rel="noopener noreferrer">
              <li
                className={`truncate text-ellipsis py-1 pl-1 rounded-lg cursor-pointer ${
                  item.status === "unread" ? "bg-pink-200" : ""
                } hover:bg-pink-300`}>
                {item.message}
              </li>
            </Link>
          ))
        : "No Notification"}
    </ul>
  );
};

export default NotificationPane;
