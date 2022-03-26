import React, { useState, useEffect } from "react";
import RoomForm from "./RoomForm";
import AddRoomCircleBadge from "./AddRoomCircleBadge";
import AddRoomCircleDetails from "./AddRoomCircleDetails";
import PreviewGMap from "./PreviewGMap";

const RoomsBox = (props) => {
  const {
    onChange,
    setForm,
    form,
    rooms,
    setRooms,
    fileImg,
    setFileImg,
    fileCert,
    setFileCert,
    gmap,
    setGmap,
  } = props;
  const [addRoomForm, setAddRoomForm] = useState(false);
  // const [fileImg, setFileImg] = useState("");
  // const [fileCert, setFileCert] = useState();
  // const [rooms, setRooms] = useState([]);
  const [openGmap, setOpenGmap] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      rooms: rooms,
    }));

    return () => {};
  }, [rooms]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      placePosition: {
        lat: gmap.lat,
        lng: gmap.lng,
        createdAt: gmap.time,
        placeId: gmap.placeId,
      },
    }));

    return () => {};
  }, [gmap]);

  const onClickGmap = () => {
    if (openGmap) {
      setOpenGmap(false);
    } else {
      setOpenGmap(true);
    }
  };

  const roomForm = () => {
    if (addRoomForm) {
      setAddRoomForm(false);
    } else {
      setAddRoomForm(true);
    }
  };

  return (
    <div className="font-['SarabunBold']">
      <div className="h-[80%]">
        <div className="grid grid-cols-1 gap-y-4 justify-items-center ">
          <div className="h-[100%]">
            <h1 className="ml-2">Image</h1>
            <div className="w-[600px] flex shadow-lg divide-x divide-pink-500 divide-x-[2px] bg-gray-200/75 py-3 px-6 rounded-xl ">
              <div className="flex justify-start w-[60%] mr-4 ">
                <label
                  className={`${
                    fileCert
                      ? "indigo-pink"
                      : "bg-zinc-500 shadow-md hover:from-indigo-500 bg-gradient-to-r via-purple-500 to-pink-500"
                  } w-fit h-fit self-center font-medium outline-0 mr-4 rounded-lg p-2  justify-between text-white font-medium cursor-pointer`}
                >
                  <input
                    type="file"
                    name="imageCover"
                    onChange={(e) => {
                      onChange(e);
                      setFileImg(e.target.files[0]);
                    }}
                  />
                  Choose file
                </label>
                <h2 className="text-pink-500 self-center truncate w-auto">
                  {fileImg ? fileImg.name : "No file chosen"}
                </h2>
              </div>
            </div>
          </div>

          <div className="h-[100%]">
            <h1 className="ml-2">Cert</h1>
            <div className="w-[600px] flex shadow-lg divide-x divide-pink-500 divide-x-[2px] bg-gray-200/75 py-3 px-6 rounded-xl ">
              <div className="flex justify-start w-[40%] mr-4">
                <label
                  className={`${
                    fileCert
                      ? "indigo-pink"
                      : "bg-zinc-500 shadow-md hover:from-indigo-500 bg-gradient-to-r via-purple-500 to-pink-500"
                  } w-[45%] h-fit self-center font-medium outline-0 mr-4 rounded-lg p-2  justify-between text-white font-medium cursor-pointer`}
                >
                  <input
                    className=""
                    type="file"
                    name="imageCert"
                    onChange={(e) => {
                      onChange(e);
                      setFileCert(e.target.files[0]);
                    }}
                  />
                  Choose file
                </label>
                <h2 className="text-pink-500 self-center truncate w-auto">
                  {fileCert ? fileCert.name : "No file chosen"}
                </h2>
              </div>
            </div>
          </div>

          <div className="h-[100%]">
            <h1 className="ml-2">Google map</h1>
            <div className="w-[600px] flex shadow-lg divide-x divide-pink-500 divide-x-[2px] bg-gray-200/75 py-3 px-6 rounded-xl ">
              <button
                className={`${
                  gmap.lat && gmap.lng
                    ? "indigo-pink"
                    : "bg-zinc-500 shadow-md hover:from-indigo-500 bg-gradient-to-r via-purple-500 to-pink-500"
                } w-full h-fit self-center font-medium outline-0 rounded-lg p-2 justify-between text-white font-medium cursor-pointer`}
                onClick={() => {
                  onClickGmap();
                }}
              >
                Choose residence's location
              </button>
            </div>
          </div>

          <div className="flex mt-4">
            {rooms.length <= 2 && <AddRoomCircleBadge roomForm={roomForm} />}
            {rooms.length !== 0 &&
              rooms.map((r, index) => {
                return (
                  <AddRoomCircleDetails
                    onChange={onChange}
                    rooms={r}
                    index={index}
                    key={index}
                  />
                );
              })}
          </div>
          {addRoomForm && (
            <RoomForm roomForm={roomForm} setRooms={setRooms} form={form} />
          )}
          {openGmap && (
            <PreviewGMap
              onClickGmap={onClickGmap}
              form={form}
              gmap={gmap}
              setGmap={setGmap}
              setForm={setForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsBox;
