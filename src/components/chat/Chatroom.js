import React, { useEffect, useState } from "react";
import SenderBubble from "./SenderBubble";
import ReceiverBubble from "./ReceiverBubble";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notificationDB } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getOtherUserById } from "../../api/Get";

const Chatroom = () => {
  const dispatch = useDispatch();
  const { chatroomstatus } = useSelector((state) => state.chatBubble);
  const { user } = useSelector((state) => state.authStore);
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState(false);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    getOtherUserById(chatroomstatus.receiver).then((res) => {
      setUsername(res.u_name);
    });
    const chatroomDocRef = doc(
      notificationDB,
      "chatroom",
      chatroomstatus.chatid
    );
    const unsubscribe = onSnapshot(chatroomDocRef, (snapshot) => {
      if (snapshot.data()) {
        const sortedByTime = snapshot.data().messages;
        sortedByTime.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setChatMessages(sortedByTime);
        const unreadCount = snapshot
          .data()
          .messages.filter((item) => item.status === "unread").length;
        if (unreadCount >= 1) {
          setNotification(true);
        } else {
          setNotification(false);
        }
      } else {
        setNotification(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [chatroomstatus]);

  return (
    <>
      <div className="rounded-t-xl bg-indigo-200 text-indigo-700 font-['SarabunBold'] py-2 px-3 ">
        {username}
      </div>
      <div className="py-2 px-3 h-full overflow-y-auto scrollbar-style-w scrollbar-style-tr scrollbar-style-th">
        {chatMessages.map((obj, index) =>
          obj.sender === user._id ? (
            <SenderBubble text={obj.message} key={index} />
          ) : (
            <ReceiverBubble text={obj.message} key={index} />
          )
        )}
      </div>
      <div className="bg-indigo-200 rounded-b-xl flex flex-row justify-between py-1 px-3">
        <input
          type="text"
          className="rounded-xl h-8 w-full border-none focus:ring-0 bg-indigo-100 focus:bg-indigo-300"
        />
        <button className="rounded-full bg-purple-500 text-white h-8 w-8 ml-3">
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </button>
      </div>
    </>
  );
};

export default Chatroom;
