import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import Navbar from "../search/Navbar";
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
      <div className="absolute top-0 left-0 z-50 w-[100vw]">
        <Navbar
          setPlaceDetails={setPlaceDetails}
          setPlaceId={setPlaceId}
          setShowWidget={setShowWidget}
          isLoaded={isLoaded}
        />
        {/* <SearchBar
          setPlaceDetails={setPlaceDetails}
          setPlaceId={setPlaceId}
          setShowWidget={setShowWidget}
          isLoaded={isLoaded}
        /> */}
        <div className="mt-4">
          {showWidget && <Widget placeDetails={placeDetails} />}
        </div>
      </div>
    </>
  );
};

export default Search;
