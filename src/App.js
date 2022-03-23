import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./page/Home";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faPlus,
  faEllipsis,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark);
library.add(faAngleLeft);
library.add(faChevronDown);
library.add(faPlus);
library.add(faEllipsis);
library.add(faXmark);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="/signin" element={<SignIn />} /> */}
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
