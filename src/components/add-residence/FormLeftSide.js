import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";

const FormLeftSide = (props) => {
  const {
    setDropdown,
    setresidenceType,
    dropdownEvent,
    dropdown,
    residenceType,
    onChange,
    form,
  } = props;
  return (
    <div className="px-20 self-center grid-cols-1">
      <form>
        <div className="grid grid-cols-1 gap-1 min-w-[230px] font-['SarabunBold']">
          <Input
            name="resName"
            placeholder="Residence name"
            type="text"
            onChange={onChange}
            form={form.resName}
          />
          <Input
            name="resPhone"
            placeholder="Phone number"
            type="text"
            onChange={onChange}
            form={form.resPhone}
          />
          <Input
            name="resLine"
            placeholder="Line id"
            type="text"
            onChange={onChange}
            form={form.resLine}
          />
          <Input
            name="resWebsite"
            placeholder="Website"
            type="text"
            onChange={onChange}
            form={form.resWebsite}
          />
          <h2 className="font-bold text-pink-500 text-base">Description</h2>
          <textarea
            name="description"
            placeholder="description"
            className="placeholder-gray-400/75 p-2 outline-0 border-0 ring-2 ring-pink-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-3xl focus:shadow-pink-500 rounded-lg min-h-[100px]"
            onChange={onChange}
            form={form.description}
          />
          <button
            type="button"
            className="flex mt-2 font-medium outline-0 rounded-lg p-2 from-indigo-500 bg-gradient-to-r via-purple-500 to-pink-500 justify-between text-white font-medium"
            onClick={() => dropdownEvent()}
          >
            <h2 className="mr-2">{residenceType}</h2>
            <FontAwesomeIcon
              className="self-center"
              icon="fa-solid fa-chevron-down"
            />
          </button>
        </div>

        <ul
          className={`${
            dropdown
              ? "origin-top-left absolute shadow-lg mt-1 divide-pink-200 rounded-md bg-white ring-2 ring-pink-300 text-gray-600 divide-y dropdow-menu-anim-show"
              : "origin-top-left absolute shadow-lg mt-1 divide-pink-200 rounded-md bg-white ring-2 ring-pink-300 text-gray-600 divide-y dropdow-menu-anim-hidden"
          } font-['SarabunBold']`}
        >
          <li
            className="px-4 py-1 cursor-pointer hover:bg-pink-200 rounded-md"
            onClick={() => {
              setDropdown(false);
              setresidenceType("Apartment");
              onChange({ target: { name: "resType", value: "Apartment" } });
            }}
          >
            Apartment
          </li>
          <li
            className="px-4 py-1 cursor-pointer hover:bg-pink-200 rounded-md"
            onClick={() => {
              setDropdown(false);
              setresidenceType("Condo");
              onChange({ target: { name: "resType", value: "Condo" } });
            }}
          >
            Condo
          </li>
          <li
            className="px-4 py-1 cursor-pointer hover:bg-pink-200 rounded-md"
            onClick={() => {
              setDropdown(false);
              setresidenceType("House");
              onChange({ target: { name: "resType", value: "House" } });
            }}
          >
            House
          </li>
        </ul>

        <div className="grid grid-cols-1 gap-1 place-content-center min-w-[230px] mt-4 font-['SarabunBold']">
          <Input
            name="resAddress"
            placeholder="Address"
            type="text"
            onChange={onChange}
            form={form.resAddress}
          />
          <Input
            name="resSubDist"
            placeholder="Sub District"
            type="text"
            onChange={onChange}
            form={form.resSubDist}
          />
          <Input
            name="resDist"
            placeholder="District"
            type="text"
            onChange={onChange}
            form={form.resDist}
          />
          <Input
            name="resProvince"
            placeholder="Province"
            type="text"
            onChange={onChange}
            form={form.resProvince}
          />
          <Input
            name="resPostNum"
            placeholder="Post Number"
            type="text"
            onChange={onChange}
            form={form.resPostNum}
          />
        </div>
      </form>
    </div>
  );
};

export default FormLeftSide;
