import React, { useState, useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { getPlaceDetails } from "../../utils/GoogleMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllResidence } from "../../api/Get";
import { useDispatch, useSelector } from "react-redux";
import { setLatLng } from "../features/gMapSlice";

const SearchBar = (props) => {
  const [currentCoord, setCurrentCoord] = useState({ lat: null, long: null });
  const [select, setSelect] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [searchTitle, setSearchTitle] = useState("Search By");
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCoord(position);
          dispatch(
            setLatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
        },
        () => null
      );
    }

    // return currentPos.coords.latitude;
    return () => {};
  }, []);

  // fetch all residence from database
  const fetchData = async () => {
    const res = await getAllResidence();
    // return res;
    return res;
  };

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

    // get lat lng uses place_id
    let parameter = {
      placeId: description.place_id,
    };

    // console.log(description);

    //Get selected place details
    const results = await getPlaceDetails(parameter);
    // console.log(results);

    let fetResult;
    getAllResidence()
      .then((res) => {
        res.map((item) => {
          if (item.bd_location.placeId === results.place_id) {
            fetResult = item;
          }
        });
        console.log(fetResult);
        if (fetResult) {
          const result = {
            name: fetResult.bd_name,
            residenceType: fetResult.bd_type,
            facilities: fetResult.bd_facilities,
            room: fetResult.bd_room,
            description: fetResult.bd_desc,
            website: fetResult.bd_website,
            line: fetResult.bd_lineid,
            imagesURL: [],
            address: {
              addrSubDistrict: fetResult.bd_address.bd_subDist,
              addrProvince: fetResult.bd_address.bd_province,
            },
            imageURL: fetResult.bd_img,
            geometry: { lat: fetResult.lat, lng: fetResult.lng },
          };
          // console.log(result);
          setPlaceDetails(result);
          setShowWidget(true);
          setPlaceId(description.place_id);
        } else {
          setShowWidget(true);
          setPlaceId(description.place_id);
          console.log(results);
          setPlaceDetails({
            name: results.name,
            residenceType: "APT",
            facilities: [],
            room: [],
            description: results.formatted_address,
            website: "",
            line: "",
            imagesURL: [],
            address: results.formatted_address,
            geometry: {
              lat: results.geometry.location.lat(),
              lng: results.geometry.location.lng(),
            },
            placeId: results.place_id,
          });
        }
      })
      .catch((err) => console.log(err));
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
    setPlaceDetails({});
    setShowWidget(false);
  };

  const dropdownEvent = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  return (
    <>
      <div className="">
        <div className="h-[6vh]">
          <div className="w-[30vw] h-[6vh] flex">
            {/* <button
              type="button"
              className="hover-input-home inline-flex justify-center font-medium outline-0 w-[8vw] rounded-xl px-4 py-2 bg-white text-lg text-gray-700 focus:outline-0"
              onClick={() => {
                dropdownEvent();
              }}
            >
              <h2 className="self-center">{searchTitle}</h2>
            </button> */}

            <div className="hover-input-home relative flex">
              <input
                className="rounded-xl w-[22vw] p-4 ml-2 focus:border-0 focus:ring-pink-500 border-pink-500 outline-0 text-black"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled={!ready}
                value={select ? select : value}
              />
              <FontAwesomeIcon
                icon="fa-regular fa-circle-xmark"
                className={`${
                  value
                    ? "absolute self-center w-[2vw] h-auto right-3 text-black cursor-pointer opacity-30 hover:opacity-50"
                    : "hidden"
                }`}
                onClick={() => clearInput()}
              />
            </div>
          </div>

          {/* dropdown menu */}
          <ul
            className={`${
              dropdown
                ? "origin-top-left absolute py-1 mt-2 min-w-fit w-48 rounded-md bg-white divide-y dropdow-menu-anim-show"
                : "origin-top-left absolute py-1 mt-2 min-w-fit w-48 rounded-md bg-white divide-y dropdow-menu-anim-hidden"
            }`}
          >
            <li
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => {
                setSearchTitle("Name");
                setDropdown(false);
              }}
            >
              Name
            </li>
            <li
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => {
                setSearchTitle("City");
                setDropdown(false);
              }}
            >
              City
            </li>
          </ul>
        </div>
        <div>
          <ul
            className={`${
              status === "OK"
                ? "bg-white fixed rounded-xl text-black mt-2 divide-y z-10 "
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
                      className="p-2 z-10 rounded-xl hover:bg-purple-200 relative cursor-pointer"
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
