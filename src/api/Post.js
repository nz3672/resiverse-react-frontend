import axios from "axios";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { notificationDB } from "../firebase";
import { store } from "../components/app/store";
import { nanoid } from "nanoid";
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

export function jsonToFormData(data) {
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

  const notifDoc = doc(
    notificationDB,
    "translist-noti",
    translistData.landlord_id
  );
  const notificationSnap = await getDoc(notifDoc);
  const id = nanoid(10);

  if (notificationSnap.exists()) {
    const notifArray = notificationSnap.data().notif;
    notifArray.push({
      id: id,
      message: "มีแจ้งเตือนเข้า",
      translist_id: "",
      status: "unread",
    });
    updateDoc(
      doc(notificationDB, "translist-noti", translistData.landlord_id),
      {
        notif: notifArray,
      }
    )
      .then((respond) => console.log(respond))
      .catch((error) => console.log(error.message));
  } else {
    await setDoc(
      doc(notificationDB, "translist-noti", translistData.landlord_id),
      {
        notif: [
          {
            id: id,
            message: "มีแจ้งเตือนเข้า",
            translist_id: "",
            status: "unread",
          },
        ],
      }
    );
  }

  return response.data;
};
