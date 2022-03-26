import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import Widget from "../search/Widget";
import { getDetails } from "use-places-autocomplete";

const Search = () => {
  const [libraries] = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [placeId, setPlaceId] = useState();
  const [placeDetails, setPlaceDetails] = useState();
  const [showWidget, setShowWidget] = useState(false);

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
            {/* {showWidget && <Widget placeDetails={placeDetails} />} */}
            {showWidget && console.log(placeDetails)}

            {/* show fetching widgets */}
            {!showWidget &&
              widgets.map((widget, i) => {
                // console.log(widget);
                return <Widget key={i} placeDetails={widget} />;
              })}
          </div>
          <div className="w-0 h-0 desktop:w-96 desktop:h-96 phone:w-0 phone:h-0"></div>
        </div>
      </div>
    </>
  );
};

export default Search;
