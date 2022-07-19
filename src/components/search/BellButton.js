import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notificationDB } from "../../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { updateNotification } from "../../api/Put";

const BellButton = (props) => {
  const {
    handleShowPane,
    showNoti,
    user,
    setNoti,
    setNotification,
    notifications,
    showPane,
  } = props;
  const [updateRead, setUpdateRead] = useState(0);
  useEffect(() => {
    const notificationDocRef = doc(notificationDB, "translist-noti", user._id);
    const unsubscribe = onSnapshot(notificationDocRef, (snapshot) => {
      if (snapshot.data()) {
        const sortedByTime = snapshot.data().notif;
        sortedByTime.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotification(sortedByTime);
        const unreadCount = snapshot
          .data()
          .notif.filter((item) => item.status === "unread").length;
        if (unreadCount >= 1) {
          setNoti(true);
        } else {
          setNoti(false);
        }
      } else {
        setNotification(null);
        setNoti(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <span className="absolute top-0 left-0">
      <button
        className="mx-2"
        onClick={() => {
          handleShowPane();
          if (showNoti && showPane && updateRead === 1) {
            updateNotification(notifications, user._id);
          } else if (showNoti && updateRead === 0) {
            setUpdateRead(1);
          }
        }}>
        <FontAwesomeIcon className="h-8 hover:h-10" icon="fa-solid fa-bell" />

        {showNoti && (
          <span className="flex absolute mr-1 h-4 w-4 top-0 right-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
      </button>
    </span>
  );
};

export default BellButton;
