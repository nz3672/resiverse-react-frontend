import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

library.add(faCircleXmark);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="/signin" element={<SignIn />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
