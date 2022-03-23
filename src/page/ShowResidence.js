import React from "react";
import mapboxGl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ShowResidence = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  return (
    <div className="grid grid-rows-2 h-[100vh]">
      <div className="grid grid-cols-2">
        <div>
          <h1>Icons</h1>
          <h1>Name: </h1>
          <p>{widgetinfo ? widgetinfo.name : "Place Name"}</p>
          <h1>Description :</h1>
          <p>{widgetinfo ? widgetinfo.description : "Description"}</p>
          <h1>Address :</h1>
          <p>{widgetinfo ? widgetinfo.address.addrHouseNo : "Address"}</p>
          <h1>Website : {widgetinfo ? widgetinfo.website : "-"}</h1>
          <h1>Line : {widgetinfo ? widgetinfo.line : "-"}</h1>
          <h1>Phone : {widgetinfo ? widgetinfo.phone : "-"}</h1>
        </div>
        <div>
          <h1>Photos</h1>
          <div className="flex flex-col justify-center">
            <img
              className="bg-pink-500 w-72 h-40 rounded-lg m-2"
              src={widgetinfo ? widgetinfo.imageURL : ""}
            />
            <div className="flex justify-center gap-x-2">
              <div className="bg-pink-500 w-28 h-20 rounded-lg">h</div>
              <div className="bg-pink-500 w-28 h-20 rounded-lg">h</div>
              <div className="bg-pink-500 w-28 h-20 rounded-lg">h</div>
            </div>
          </div>
          <div>
            <h1>Rooms: </h1>
            <div className="overflow-auto h-20">
              <h1>Rooms1: </h1>
              <p>
                Irure laborum duis nulla quis ad occaecat ea ullamco aliquip
                proident deserunt do. Ipsum elit eu et nulla est. Commodo enim
                ex do commodo sit consequat reprehenderit id id nostrud ullamco
                sunt. Labore est consequat ex incididunt pariatur sit ex amet et
                magna pariatur. Aute eiusmod est esse adipisicing amet.
              </p>
              <h1>Rooms2: </h1>
              <p>
                Irure laborum duis nulla quis ad occaecat ea ullamco aliquip
                proident deserunt do. Ipsum elit eu et nulla est. Commodo enim
                ex do commodo sit consequat reprehenderit id id nostrud ullamco
                sunt. Labore est consequat ex incididunt pariatur sit ex amet et
                magna pariatur. Aute eiusmod est esse adipisicing amet.
              </p>
              <h1>Rooms3: </h1>
              <p>
                Irure laborum duis nulla quis ad occaecat ea ullamco aliquip
                proident deserunt do. Ipsum elit eu et nulla est. Commodo enim
                ex do commodo sit consequat reprehenderit id id nostrud ullamco
                sunt. Labore est consequat ex incididunt pariatur sit ex amet et
                magna pariatur. Aute eiusmod est esse adipisicing amet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default ShowResidence;
