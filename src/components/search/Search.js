import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import Widget from "../widget/Widget";

const Search = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="bg-blue-800 w-screen h-screen">
      <SearchBar />
      <Widget />
    </div>
  );
};

export default Search;
