import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { getPlaceDetails } from "../../utils/GoogleMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = (props) => {
  const [currentCoord, setCurrentCoord] = useState({ lat: null, long: null });
  const [select, setSelect] = useState();
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;

  useEffect(() => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCoord(position);
          // console.log(position, "tong");
        },
        () => null
      );
    }
    // return currentPos.coords.latitude;
    return () => {};
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => {
          return currentCoord.coords.latitude
            ? currentCoord.coords.latitude
            : 43.6532;
        },
        lng: () => {
          return currentCoord.coords.longitude
            ? currentCoord.coords.longitude
            : -79.3832;
        },
      },
      radius: 100 * 1000,
    },
  });

  // get Latitude Longitude of the selected place
  const onClickChoice = async (description) => {
    setSelect(description.structured_formatting.main_text);
    setShowWidget(true);

    // get lat lng uses place_id
    let parameter = {
      placeId: description.place_id,
    };

    //Get selected place details
    const results = await getPlaceDetails(parameter);
    setPlaceDetails(results);
    setPlaceId(description.place_id);
  };

  const onInputChange = (event) => {
    setValue(event.target.value);
    if (select) {
      setSelect(event.target.value);
    }
  };

  const clearInput = () => {
    setSelect("");
    setValue("");
  };

  return (
    <>
      <div className="">
        <div className="h-[6vh] hover-input-home focus-input-home">
          <div className="w-[20vw] h-[6vh] relative flex">
            <input
              className="rounded-3xl w-[20vw] p-4  outline-0 text-black"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                onInputChange(e);
              }}
              onKeyUp={(e) => {
                // search by area
                if (e.keyCode === 13) {
                }
              }}
              disabled={!ready}
              value={select ? select : value}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-circle-xmark"
              className={`${
                value
                  ? "absolute self-center w-[2vw] h-auto right-3 text-black cursor-pointer opacity-30 hover:opacity-50"
                  : "hidden"
              }`}
              onClick={() => clearInput()}
            />
          </div>
        </div>
        <div>
          <ul
            className={`${
              status === "OK"
                ? "bg-white rounded-xl text-black mt-2 divide-y "
                : "hidden"
            }`}
          >
            {status === "OK" &&
              data.map((description, key) => {
                return (
                  description.types.length == 2 &&
                  description.types.includes("establishment") &&
                  description.types.includes("point_of_interest") && (
                    <li
                      onClick={() => {
                        onClickChoice(description);
                      }}
                      key={key}
                      className="p-2 rounded-xl hover:bg-purple-200 relative cursor-pointer"
                    >
                      {description.description}
                    </li>
                  )
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
