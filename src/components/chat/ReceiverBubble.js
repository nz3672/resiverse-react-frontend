import React from "react";

const ReceiverBubble = (props) => {
  const { text } = props;
  return (
    <div className="rounded-md bg-purple-500 text-white clear-both float-left py-0.5 px-2 mb-2">
      {text}
    </div>
  );
};

export default ReceiverBubble;
