import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { getPlaceDetails } from "../../utils/GoogleMap";

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
            }
          }}
          disabled={!ready}
          value={select ? select : value}
        />
        <ul className="bg-white border border-gray-100 w-full mt-2">
          {status === "OK" &&
            data.map((description, key) => (
              <li
                onClick={() => {
                  onClickChoice(description);
                }}
                key={key}
                className="pl-8 pr-2 py-1 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                {description.description}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
