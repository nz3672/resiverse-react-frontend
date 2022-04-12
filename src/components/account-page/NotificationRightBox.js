import { onSnapshot, doc } from "firebase/firestore";
import { notificationDB } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dateFormatwithTime } from "../../utils/DateFormate";

const NotificationRightBox = (props) => {
  const { setRightBox } = props;
  const [notifs, setNotifs] = useState([]);
  const { user } = useSelector((state) => state.authStore);
  const notificationDocRef = doc(notificationDB, "translist-noti", user._id);

  useEffect(() => {
    const unsubscribe = onSnapshot(notificationDocRef, (snapshot) => {
      if (snapshot.data()) {
        const sortedByTime = snapshot.data().notif;
        sortedByTime.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotifs(sortedByTime);
      } else {
        setNotifs();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="grid grid-cols-1 divide-y">
        {notifs &&
          notifs.map(({ id, message, timestamp }, index) => (
            <div
              className="w-full flex justify-between p-3 cursor-pointer hover:bg-pink-300 rounded-lg"
              key={index}
              onClick={() => setRightBox("TransactionList")}>
              <div>{message}</div>
              <div>{dateFormatwithTime(timestamp)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationRightBox;
