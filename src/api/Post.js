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

export const createTranslist = async (translistData, buildingName) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // const response = await axios.post(
  //   "http://localhost:8080/account/api/translists/",
  //   translistData,
  //   config
  // );

  const notifDoc = doc(
    notificationDB,
    "translist-noti",
    translistData.landlord_id
  );
  const notificationSnap = await getDoc(notifDoc);
  const id = nanoid(10);

  if (notificationSnap.exists()) {
    const notifArray = notificationSnap.data().notif;
    // const checkExist = notifArray.filter(
    //   (item) => item.translist_id === response.data._id
    // ).length;
    // if (checkExist >= 1) {
    //   const objIndex = notifArray.findIndex(
    //     (item) => item.translist_id === response.data._id
    //   );
    //   notifArray[objIndex].message = `มีการจองใหม่เกิดขึ้นที่ ${buildingName}`;
    //   notifArray[objIndex].timestamp = new Date().toUTCString();
    // } else {
    notifArray.push({
      id: id,
      message: `มีการจองใหม่เกิดขึ้นที่ ${buildingName}`,
      translist_id: "",
      status: "unread",
      timestamp: new Date().toISOString(),
    });
    // }

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
            timestamp: new Date().toISOString(),
          },
        ],
      }
    )
      .then((respond) => console.log(respond))
      .catch((error) => console.log(error.message));
  }

  // return response.data;
};

// dummy state 2
// const notifDoc = doc(
//   notificationDB,
//   "translist-noti",
//   translistData.tenant_id
// );
// const notificationSnap = await getDoc(notifDoc);
// const id = nanoid(10);

// if (notificationSnap.exists()) {
//   const notifArray = notificationSnap.data().notif;
//   const checkExist = notifArray.filter(
//     (item) => item.translist_id === response.data._id
//   ).length;
//   if (checkExist >= 1) {
//     const objIndex = notifArray.findIndex(
//       (item) => item.translist_id === response.data._id
//     );
//     notifArray[objIndex].message = `ผู้ให้เช่ายินยอมให้เช่าที่พัก ${buildingName} เรียบร้อยแล้ว โปรดทำการยืนยันสัญญาเพื่อดำเนินการจองต่อ`;
//     notifArray[objIndex].timestamp = new Date().toUTCString();
//   } else {
//     notifArray.push({
//       id: id,
//       message: `ผู้ให้เช่ายินยอมให้เช่าที่พัก ${buildingName} เรียบร้อยแล้ว โปรดทำการยืนยันสัญญาเพื่อดำเนินการจองต่อ`,
//       translist_id: response.data._id,
//       status: "unread",
//       timestamp: new Date().toUTCString(),
//     });
//   }

// dummy state 3
// const notifDoc = doc(
//   notificationDB,
//   "translist-noti",
//   translistData.landlord_id
// );
// const notificationSnap = await getDoc(notifDoc);
// const id = nanoid(10);

// if (notificationSnap.exists()) {
//   const notifArray = notificationSnap.data().notif;
//   const checkExist = notifArray.filter(
//     (item) => item.translist_id === response.data._id
//   ).length;
//   if (checkExist >= 1) {
//     const objIndex = notifArray.findIndex(
//       (item) => item.translist_id === response.data._id
//     );
//     notifArray[objIndex].message = `${buildingName} ผู้เช่าทำการยืนยันสัญญาเสร็จสิ้น กรุณารอการยืนยันเข้าที่พักอาศัยจากผู้เช่า`;
//     notifArray[objIndex].timestamp = new Date().toUTCString();
//   } else {
//     notifArray.push({
//       id: id,
//       message: `${buildingName} ผู้เช่าทำการยืนยันสัญญาเสร็จสิ้น กรุณารอการยืนยันเข้าที่พักอาศัยจากผู้เช่า`,
//       translist_id: response.data._id,
//       status: "unread",
//       timestamp: new Date().toUTCString(),
//     });
//   }

// dummy state 4
// const notifDoc = doc(
//   notificationDB,
//   "translist-noti",
//   translistData.landlord_id
// );
// const notificationSnap = await getDoc(notifDoc);
// const id = nanoid(10);

// if (notificationSnap.exists()) {
//   const notifArray = notificationSnap.data().notif;
//   const checkExist = notifArray.filter(
//     (item) => item.translist_id === response.data._id
//   ).length;
//   if (checkExist >= 1) {
//     const objIndex = notifArray.findIndex(
//       (item) => item.translist_id === response.data._id
//     );
//     notifArray[objIndex].message = `${buildingName} ผู้เช่าย้ายเข้าที่พักอาศัยเสร็จสิ้น`;
//     notifArray[objIndex].timestamp = new Date().toUTCString();
//   } else {
//     notifArray.push({
//       id: id,
//       message: `${buildingName} ผู้เช่าย้ายเข้าที่พักอาศัยเสร็จสิ้น`,
//       translist_id: response.data._id,
//       status: "unread",
//       timestamp: new Date().toUTCString(),
//     });
//   }

// dummy state 5
// const notifDoc = doc(
//   notificationDB,
//   "translist-noti",
//   translistData.landlord_id
// );
// const notificationSnap = await getDoc(notifDoc);
// const id = nanoid(10);

// if (notificationSnap.exists()) {
//   const notifArray = notificationSnap.data().notif;
//   const checkExist = notifArray.filter(
//     (item) => item.translist_id === response.data._id
//   ).length;
//   if (checkExist >= 1) {
//     const objIndex = notifArray.findIndex(
//       (item) => item.translist_id === response.data._id
//     );
//     notifArray[objIndex].message = `${buildingName} ผู้เช่าย้ายออกจากที่พักอาศัยเสร็จสิ้น`;
//     notifArray[objIndex].timestamp = new Date().toUTCString();
//   } else {
//     notifArray.push({
//       id: id,
//       message: `${buildingName} ผู้เช่าย้ายออกจากที่พักอาศัยเสร็จสิ้น`,
//       translist_id: response.data._id,
//       status: "unread",
//       timestamp: new Date().toUTCString(),
//     });
//   }
