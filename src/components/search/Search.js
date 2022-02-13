import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import Widget from "../search/Widget";
import { getDetails } from "use-places-autocomplete";

const Search = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [placeId, setPlaceId] = useState();
  const [placeDetails, setPlaceDetails] = useState();
  const [showWidget, setShowWidget] = useState(false);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="bg-blue-800 w-screen h-screen">
      <SearchBar
        setPlaceDetails={setPlaceDetails}
        setPlaceId={setPlaceId}
        setShowWidget={setShowWidget}
      />

      {showWidget && <Widget placeDetails={placeDetails} />}
    </div>
  );
};

export default Search;
