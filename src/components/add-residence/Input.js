import React from "react";

const Input = (props) => {
  const { name, placeholder, type, onChange, form } = props;

  return (
    <div className="">
      <h2 className="font-bold text-pink-500 text-base justify-self-center ">
        {placeholder}
      </h2>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        className="p-2 outline-0 border-0 ring-2 ring-pink-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-3xl focus:shadow-pink-500 rounded-lg placeholder-gray-400/75"
        onChange={onChange}
        value={form}
      />
    </div>
  );
};

export default Input;
