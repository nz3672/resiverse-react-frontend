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
    <div className="absolute top-20 left-20 z-50">
      <SearchBar
        setPlaceDetails={setPlaceDetails}
        setPlaceId={setPlaceId}
        setShowWidget={setShowWidget}
        isLoaded={isLoaded}
      />
      {showWidget && <Widget placeDetails={placeDetails} />}
    </div>
  );
};

export default Search;
