import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditInput = (props) => {
  const { label, dbLabel, value, setFormUpdateUser, isSubmit } = props;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);

    return () => {};
  }, [isSubmit]);

  const onEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const onChange = (e) => {
    setFormUpdateUser((prev) => ({ ...prev, [dbLabel]: e.target.value }));
  };

  return (
    <div className="flex flex-row w-full pt-4 text-xl">
      <h2 className="basis-1/4">{label}</h2>
      {edit ? (
        <div className="basis-2/4 flex">
          <input
            className=" bg-[#fae6e8] text-lg rounded-lg border-[1px] border-[#cdd9e5]/50 focus:outline-0 focus:border-pink-500/75 focus:border-[1px] py-1 px-2"
            placeholder={label}
            onChange={onChange}
          />
          <button
            className="ml-2 text-pink-500"
            onClick={() => {
              onEdit();
            }}
          >
            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
          </button>
        </div>
      ) : (
        <div className="basis-2/4 flex">
          <h2>{value}</h2>
          <button
            className="ml-2 text-pink-500"
            onClick={() => {
              onEdit();
            }}
          >
            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditInput;
