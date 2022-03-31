import React from "react";

const Description = (props) => {
  const { header, paragraph } = props;
  return (
    <div>
      <h1 className="text-xl font-['SarabunBold']">{header}</h1>
      <p className="ml-5 font-['SarabunBold']">{paragraph}</p>
    </div>
  );
};

export default Description;
