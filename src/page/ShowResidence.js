import React from "react";
import mapboxGl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RentForm from "../components/show-residence/RentForm.js";
import Description from "../components/show-residence/Description.js";

const ShowResidence = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRentForm, setRentForm] = useState(null);
  const slideRef = useRef();
  const { widgetinfo } = useSelector((state) => state.sidebarHome);

  mapboxGl.accessToken =
    "pk.eyJ1IjoibnozNjcyIiwiYSI6ImNreTlscGdiOTA1bjIycG1nbW95amdlMzYifQ.wPQ_fd-VPbpTazLhzbL4tA";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/nz3672/cky9lr7o02ol816n2edvtnccj",
      center: [100.53040709750229, 13.736295511335356],
      zoom: 16,
      pitch: 60,
      antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
  }, []);

  const handleShowRentForm = (input) => {
    setRentForm(input);
  };

  return (
    <>
      <div className="grid grid-cols-2 h-[100vh] font-bold text-zinc-700 text-base font-['SarabunBold']">
        {/* <div className="grid grid-cols-2 "> */}
        <div
          className="flex flex-col justify-evenly p-4 "
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
          }}
        >
          <div className="shadow-lg bg-white rounded-xl p-3">
            <h1 className=" text-3xl">
              {widgetinfo ? widgetinfo.name : "Place Name"}
            </h1>
            <p className=" mt-2">
              {widgetinfo ? widgetinfo.description : "Description"}
            </p>
          </div>

          <div className="shadow-lg bg-white rounded-xl p-3">
            <h1 className=" text-xl">Address</h1>
            <p className=" mt-2">
              {widgetinfo ? widgetinfo.address.addrHouseNo : "Address"}
            </p>
          </div>
          <div className="text-xl shadow-lg bg-white rounded-xl p-3">
            <h1>Website : {widgetinfo ? widgetinfo.website : "-"}</h1>
            <h1>Line : {widgetinfo ? widgetinfo.line : "-"}</h1>
            <h1>Phone : {widgetinfo ? widgetinfo.phone : "-"}</h1>
          </div>
          <div>
            <div className="h-auto bg-white px-4 py-2 mt-3 rounded-xl space-y-2 shadow-lg grid grid-cols-1">
              <h1 className="text-2xl">Rooms </h1>
              {widgetinfo &&
                widgetinfo.room.map((roomdetail, i) => {
                  return (
                    <div key={i}>
                      <h1>{roomdetail.roomName}</h1>
                      <p>
                        ขนาด: {roomdetail.roomSize} ราคา: {roomdetail.roomPrice}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-row bg-white p-2 rounded-xl shadow-lg justify-center">
            {widgetinfo &&
              widgetinfo.hasOwnProperty("facilities") &&
              widgetinfo.facilities.length !== 0 &&
              widgetinfo.facilities.map((facility, i) => {
                return (
                  <div key={i} className="has-tooltip mr-1">
                    <img
                      alt="verify-badge"
                      src={require(`../img/icon/buff/${facility.faName.replace(
                        /\s/g,
                        ""
                      )}.png`)}
                      className="object-contain rounded-xl w-12 pr-1 self-center transition ease-in-out duration-450 hover:-translate-y-2"
                    ></img>
                    <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 mb-10 text-sm ">
                      {facility.faName}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-row justify-center">
            <button
              className="w-3/12 mt-2 mr-3 bg-white font-medium outline-0 rounded-lg p-2 justify-center text-xl shadow-lg hover:shadow-none "
              onClick={() => handleShowRentForm(true)}
            >
              <span className="gradient-text-btn">Rent</span>
            </button>
          </div>
        </div>
        <div className="grid grid-rows-2 h-[100vh] ">
          <div className="text-white flex flex-row justify-center ">
            <div
              className="p-3 rounded-xl w-11/12 mb-2 mt-2 h-auto"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
              }}
            >
              <div ref={mapContainer} className="map-container w-full h-96" />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <img
                  className="w-11/12 max-h-96 rounded-lg mt-5 p-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, rgb(36, 138, 238), rgb(114, 91, 226))",
                  }}
                  src={widgetinfo ? widgetinfo.imageURL : ""}
                />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {showRentForm && (
        <RentForm setRentForm={handleShowRentForm} widgetinfo={widgetinfo} />
      )}
    </>
  );
};

export default ShowResidence;
