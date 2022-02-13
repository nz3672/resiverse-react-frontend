import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import Widget from "../search/Widget";

const Search = () => {
  const [libraries] = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="bg-blue-800 w-screen h-screen">
      <SearchBar isLoaded={isLoaded} />
      <Widget />
    </div>
  );
};

export default Search;
