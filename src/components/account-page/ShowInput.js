import React from "react";

const ShowInput = (props) => {
  const { value, label } = props;
  return (
    <div className="flex flex-row w-full pt-4 text-xl">
      <h2 className="basis-1/4">{label}</h2>
      <h2 className="basis-3/4">{value}</h2>
    </div>
  );
};

export default ShowInput;
