import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { focusWidget, setWidgetInfo } from "../features/sidebarSlice";
import Navbar from "../search/Navbar";
import Widget from "../search/Widget";
import ChatWindow from "../chat/ChatWindow";
import axios from "axios";

const Search = () => {
  const dispatch = useDispatch();
  const [libraries] = useState(["places"]);
  const API_URL = "residence/api/residence/all"; // In package.json, set proxy
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [placeId, setPlaceId] = useState();
  const [placeDetails, setPlaceDetails] = useState();
  const [showWidget, setShowWidget] = useState(false);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  // fetch all residence from database
  const fetchData = async () => {
    const response = await axios.get(API_URL);
    if (response.data) {
      setWidgets(response.data);
    }
  };

  const handlewidgetOnClick = (page, widget) => {
    dispatch(focusWidget(page));
    dispatch(setWidgetInfo(widget));
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="absolute top-0 left-0 z-50 w-[100vw] h-screen">
        <Navbar
          setPlaceDetails={setPlaceDetails}
          setPlaceId={setPlaceId}
          setShowWidget={setShowWidget}
          isLoaded={isLoaded}
        />

        <div className="mt-4 flex">
          <div className="ml-5 grid-cols-1 desktop:ml-20 grid grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 place-content-center">
            {/* show searching widgets */}
            {/* {showWidget && placeDetails && console.log(placeDetails)} */}
            {showWidget && placeDetails && (
              <div
                onClick={() => {
                  handlewidgetOnClick(true, placeDetails);
                }}>
                <Widget placeDetails={placeDetails} />
              </div>
            )}

            {/* show fetching widgets */}
            {!showWidget &&
              widgets.map((widget, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      handlewidgetOnClick(true, widget);
                    }}>
                    <Widget key={i} placeDetails={widget} />
                  </div>
                );
              })}
          </div>
          <div className="w-0 h-0 desktop:w-96 desktop:h-96 phone:w-0 phone:h-0"></div>
        </div>
        {/* <ChatWindow /> */}
      </div>
    </>
  );
};

export default Search;
