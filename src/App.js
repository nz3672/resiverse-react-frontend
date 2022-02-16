import React, { useRef, useEffect, useState } from "react";
import Home from "./page/Home";
import Search from "./components/search/Search";
import SearchBar from "./components/search/SearchBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark);
function App() {
  return (
    <div>
      <Home />
      {/* <Search /> */}
    </div>
  );
}

export default App;
