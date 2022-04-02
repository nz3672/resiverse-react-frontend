import { useState, useCallback, useRef, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mapStyle from "../../styles/mapStyle";
import SearchBar from "../search/SearchBar";
import { store } from "../app/store";

const mapContainerStyle = {
  width: "40vw",
  height: "50vh",
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

// const center = {
//   lat: 13.848203051082276,
//   lng: 100.5695939365917,
// };

const PreviewGMap = (props) => {
  const { onClickGmap, form, gmap, setGmap, setForm } = props;
  const [libraries] = useState(["places"]);
  const [placeDetails, setPlaceDetails] = useState();
  const [showWidget, setShowWidget] = useState(false);
  const [placeId, setPlaceId] = useState();
  const [myLatLng, setMyLatLng] = useState({ lat: null, lng: null });
  //   let center = ;

  useEffect(() => {
    const c = store.getState().gMapLatLng.myLatLng;
    // console.log(c);
    setMyLatLng(c);

    return () => {};
  }, []);

  useEffect(() => {
    if (placeDetails) {
      const lat = placeDetails.geometry.lat;
      const lng = placeDetails.geometry.lng;
      setGmap({
        lat: lat,
        lng: lng,
        createdAt: new Date(),
        placeId: placeDetails.place_id,
      });
    }

    return () => {};
  }, [placeDetails]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panMap = (lat, lng) => {
    console.log(lat, lng);
    mapRef.current.setCenter({ lat, lng });
    mapRef.current.setZoom(17);
  };

  const showMarker = () => {
    if (placeDetails) {
      const lat = placeDetails.geometry.lat;
      const lng = placeDetails.geometry.lng;
      panMap(lat, lng);
      return (
        <Marker
          position={{
            lat: lat,
            lng: lng,
          }}
        />
      );
    } else if (gmap.lat && gmap.lng && !placeDetails) {
      return (
        <Marker
          position={{
            lat: gmap.lat,
            lng: gmap.lng,
          }}
        />
      );
    }
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white w-[60%] h-fit  rounded-2xl flex-col">
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon="fa-regular fa-circle-xmark"
              className="text-pink-400 mr-4 mt-4 cursor-pointer"
              onClick={() => {
                onClickGmap();
              }}
            />
          </div>
          <div className="grid place-content-center gap-4 p-4">
            <div className="ml-4">
              <SearchBar
                setPlaceDetails={setPlaceDetails}
                setPlaceId={setPlaceId}
                setShowWidget={setShowWidget}
                isLoaded={isLoaded}
              />
            </div>
            {myLatLng.lat && myLatLng.lng && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                onLoad={onLoad}
                center={myLatLng}
                options={options}
                onClick={(e) => {
                  console.log("jj", e);
                  setGmap({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    createdAt: new Date(),
                    placeId: "",
                  });
                }}
              >
                {showMarker()}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-pink-200"></div>
    </>
  );
};

export default PreviewGMap;
