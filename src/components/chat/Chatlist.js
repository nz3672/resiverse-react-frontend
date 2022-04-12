import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { notificationDB } from "../../firebase";
import { getOtherUserById } from "../../api/Get";
import { useSelector } from "react-redux";
import { doc } from "firebase/firestore";

const Chatlist = () => {
  const { user } = useSelector((state) => state.authStore);
  const [namelist, setNameList] = useState([]);
  useEffect(() => {
    const chatroomDocRef = doc(notificationDB, "userChat", user._id);
    const unsubscribe = onSnapshot(chatroomDocRef, (snapshot) => {
      if (snapshot.data()) {
        // const sortedByTime = snapshot.data().messages;
        // sortedByTime.sort(function (a, b) {
        //   return new Date(b.timestamp) - new Date(a.timestamp);
        // });
        const chatroomsArr = snapshot.data().chatrooms;
        const NameArr = [];
        chatroomsArr.map((item) => {
          getOtherUserById(item).then((res) => console.log(res));
        });
        setNameList(snapshot.data().chatrooms);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      <div className="rounded-t-xl bg-indigo-200 text-indigo-700 font-['SarabunBold'] py-2 px-3 ">
        Chatlist
      </div>
      <div className="grid grid-cols-1 w-full h-full overflow-y-auto divide-y-2">
        {namelist.map((item, index) => (
          <div className="p-2 hover:bg-zinc-100 cursor-pointer" key={index}>
            {}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chatlist;
