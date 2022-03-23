import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  unfocusWidget,
  openSidebar,
  resetWidgetInfo,
} from "../features/sidebarSlice";
import { chooseSidebar } from "../features/sidebarShowSlice";

const GlobeWidget = (props) => {
  const { housepos } = props;
  const dispatch = useDispatch();

  const handlewidgetOnClick = (page) => {
    dispatch(unfocusWidget(page));
  };

  const handlecloseWidget = () => {
    dispatch(resetWidgetInfo());
  };

  const sidebarPage = (page) => {
    dispatch(openSidebar(page));
  };

  const chooseSidebarPage = (page) => {
    dispatch(chooseSidebar(page));
  };
  return (
    <div
      className="w-56 h-28"
      style={{
        position: "absolute",
        zIndex: 100,
        top: `${404 - 112}px`,
        left: `${1275}px`,
      }}>
      <div className="h-full grid grid-rows-4 items-center justify-items-center">
        <button
          onClick={() => {
            handlewidgetOnClick(true);
            handlecloseWidget(true);
          }}
          className="my-2 mx-3 px-2 justify-self-end self-start text-pink-600  bg-white rounded-2xl">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>

        <button
          className="px-3 py-2 mx-2 my-1 hover:bg-white/50 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg row-start-2 row-end-4 grid-self-center text-white"
          onClick={() => {
            handlewidgetOnClick(true);
            sidebarPage(true);
            chooseSidebarPage("ShowResidence");
          }}>
          More Details
        </button>
      </div>
    </div>
  );
};

export default GlobeWidget;
