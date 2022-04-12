import React from "react";

const SenderBubble = (props) => {
  const { text } = props;
  return (
    <div className="rounded-md bg-zinc-300 clear-both float-right py-0.5 px-2 mb-2">
      {text}
    </div>
  );
};

export default SenderBubble;
