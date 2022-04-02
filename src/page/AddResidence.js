import { useState } from "react";
import FormLeftSide from "../components/add-residence/FormLeftSide";
import { createResidence } from "../api/Post";
import FacilitiesBox from "../components/add-residence/FacilitiesBox";
import RoomsBox from "../components/add-residence/RoomsBox";
import { toast } from "react-toastify";

const allParams = {
  facilities: [],
  rooms: [],
  resName: "",
  resPhone: "",
  resAddress: "",
  resProvince: "",
  resLine: "",
  resWebsite: "",
  description: "",
  resType: "",
  resSubDist: "",
  resDist: "",
  resPostNum: "",
  imageCover: {},
  imageCert: {},
  placePosition: { lat: null, lng: null },
};

const isCheckArr = {
  PetFriendly: false,
  WIFIAvailable: false,
  Parking: false,
  Laundryavailable: false,
  Fitness: false,
  BTSorMRT: false,
  NearDepartment: false,
};

const AddResidence = () => {
  const [residenceType, setresidenceType] = useState(
    "เลือกประเภทของที่พักอาศัย"
  );
  const [dropdown, setDropdown] = useState(false);
  const [form, setForm] = useState(allParams);
  const [rooms, setRooms] = useState([]);
  const [fileImg, setFileImg] = useState("");
  const [fileCert, setFileCert] = useState("");
  const [checkbox, setCheckbox] = useState(isCheckArr);
  const [gmap, setGmap] = useState({
    lat: "",
    lng: "",
    createdAt: "",
    placeId: "",
  });

  const dropdownEvent = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onChange = (e) => {
    // e.preventDefault();
    // console.log(e.target.value, e.target.name, e.target.files);
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async () => {
    console.log(form);
    const response = await createResidence(form);
    setGmap({ lat: "", lng: "", createdAt: "", placeId: "" });
    setRooms([]);
    setForm(allParams);
    setresidenceType("เลือกประเภทของที่พักอาศัย");
    setFileImg("");
    setFileCert("");
    setCheckbox(isCheckArr);
    toast.success("Success Notification !");
  };

  return (
    <div
      className="flex justify-center h-full w-full text-gray-500 py-7 px-2"
      // style={{
      //   backgroundImage: `url(/wave3.svg)`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      // }}
    >
      <div className="grid w-[35%]">
        <FormLeftSide
          setDropdown={setDropdown}
          setresidenceType={setresidenceType}
          dropdownEvent={dropdownEvent}
          dropdown={dropdown}
          residenceType={residenceType}
          onChange={onChange}
          form={form}
        />
      </div>
      <div className="grid grid-row-3 w-[65%]">
        <div className="grid row-span-1 place-content-center ">
          <FacilitiesBox
            setForm={setForm}
            checkbox={checkbox}
            setCheckbox={setCheckbox}
          />
        </div>
        <div className="grid row-span-2">
          <RoomsBox
            onChange={onChange}
            setForm={setForm}
            form={form}
            rooms={rooms}
            setRooms={setRooms}
            fileImg={fileImg}
            setFileImg={setFileImg}
            fileCert={fileCert}
            setFileCert={setFileCert}
            gmap={gmap}
            setGmap={setGmap}
          />
        </div>
        <div className="flex justify-end h-fit">
          <button
            className="mr-10 bg-[#3f9d45] rounded-xl px-4 py-2 shadow-md "
            onClick={() => onSubmit()}
          >
            <h2 className="text-white font-['SarabunBold']">SUBMIT</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResidence;
