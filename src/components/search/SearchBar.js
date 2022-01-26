import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchBar = () => {
  const [currentCoord, setCurrentCoord] = useState({ lat: null, long: null });
  const [select, setSelect] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoord(position);
        // console.log(currentCoord.coords.latitude);
      },
      () => null
    );

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
  const onClickChoice = (description) => {
    console.log(description);
    setSelect(description.structured_formatting.main_text);

    // get lat lng uses place_id
    let parameter = {
      placeId: description.place_id,
    };

    getGeocode(parameter)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng } = latLng;

        console.log("Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const onInputChange = (event) => {
    setValue(event.target.value);
    if (select) {
      setSelect(event.target.value);
    }
  };

  return (
    <>
      <div className="relative ...">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            onInputChange(e);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              console.log(e.target.value);
            }
          }}
          disabled={!ready}
          value={select ? select : value}
        />
        {console.log(value)}
        <ul className="bg-white border border-gray-100 w-full mt-2">
          {status === "OK" &&
            data.map((description, key) => (
              <li
                onClick={() => {
                  onClickChoice(description);
                }}
                key={key}
                className="pl-8 pr-2 py-1 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
              >
                {description.description}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
