import React, { useState } from "react";
import Chatroom from "./Chatroom";
import Chatlist from "./Chatlist";
import { useDispatch, useSelector } from "react-redux";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const [chatroomOpen, setChatroom] = useState(false);
  const { chatroomstatus } = useSelector((state) => state.chatBubble);

  const handleOnOpen = () => {
    setChatroom(!chatroomOpen);
  };
  return (
    <div className="absolute bottom-0 right-0 text-white z-100">
      {chatroomOpen && (
        <div className="h-96 w-80 bg-white text-black rounded-xl flex flex-col mb-3">
          {/* {chatroomstatus && <Chatroom />} */}
          <Chatlist />
        </div>
      )}
      <button
        className="bg-white w-10 h-10 rounded-full text-black"
        onClick={() => handleOnOpen()}>
        T
      </button>
    </div>
  );
};

export default ChatWindow;
