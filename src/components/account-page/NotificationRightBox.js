import { onSnapshot, doc } from "firebase/firestore";
import { notificationDB } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NotificationRightBox = () => {
  const [notifs, setNotifs] = useState([]);
  const { user } = useSelector((state) => state.authStore);
  const notificationDocRef = doc(notificationDB, "translist-noti", user._id);

  useEffect(() => {
    const unsubscribe = onSnapshot(notificationDocRef, (snapshot) => {
      setNotifs(snapshot.data().notif);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      {notifs &&
        notifs.map(({ id, message }) => <div>{id + " " + message}</div>)}
    </div>
  );
};

export default NotificationRightBox;
