import axios from "axios";
import { store } from "../components/app/store";
const API_URL_ACCOUNT_SERVICES = "account/api/";

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

export const createResidence = async (residenceData, token) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const formData = jsonToFormData({
    bd_location: residenceData.placePosition,
    bd_facilities: residenceData.facilities,
    bd_room: residenceData.rooms,
    bd_address: {
      bd_houseNo: residenceData.resAddress,
      bd_subDist: residenceData.resSubDist,
      bd_dist: residenceData.resDist,
      bd_province: residenceData.resProvince,
      bd_postNum: residenceData.resPostNum,
    },
    bd_desc: residenceData.description,
    bd_cert: residenceData.imageCert,
    bd_type: residenceData.resType,
    bd_website: residenceData.resWebsite,
    bd_lineid: residenceData.resLine,
    bd_phone: residenceData.resPhone,
    bd_img: residenceData.imageCover,
    bd_name: residenceData.resName,
    u_id: user._id,
  });
  const response = await axios.post(
    "http://localhost:8080/account/api/buildings/post",
    formData,
    config
  );

  return response.data;
};

export const createTranslist = async (translistData) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.post(
    "http://localhost:8080/account/api/translists/",
    translistData,
    config
  );

  return response.data;
};
