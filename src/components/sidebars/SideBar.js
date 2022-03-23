import React from "react";
import Profile from "../../page/Profile";
import AddResidence from "../../page/AddResidence";
import ShowResidence from "../../page/ShowResidence";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeSidebar, resetWidgetInfo } from "../features/sidebarSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { sidebarstatus } = useSelector((state) => state.sidebarHome);
  const { showsidestatus } = useSelector((state) => state.sidebarShow);
  const sidebarPage = () => {
    dispatch(closeSidebar());
    dispatch(resetWidgetInfo());
  };
  return (
    <>
      <button
        className={
          sidebarstatus
            ? "absolute top-0 left-0 mt-4 ml-4 z-52 hover:bg-white/50 bg-pink-600 rounded-full text-white transition duration-200 ease-in-out"
            : "hidden"
        }
        onClick={() => {
          sidebarPage();
        }}>
        <FontAwesomeIcon
          icon="fa-solid fa-angle-left"
          className="py-4 px-6 text-3xl"
        />
      </button>
      <div
        className={`absolute z-52 bg-white text-blue-800 w-2/3 sm:w-1/3 space-y-6 py-7 px-2 inset-y-0 right-0 ${
          sidebarstatus ? "translate-x-0 delay-1000" : "translate-x-full"
        } transition duration-300 ease-in-out`}>
        {showsidestatus == "Profile" ? (
          <Profile />
        ) : showsidestatus == "AddResidence" ? (
          <AddResidence />
        ) : showsidestatus == "ShowResidence" ? (
          <ShowResidence />
        ) : null}
      </div>
    </>
  );
};

export default SideBar;
