import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { notificationDB } from "../firebase";
import { store } from "../components/app/store";
import { nanoid } from "nanoid";
import { getOtherUserById } from "./Get";
import { Firestore } from "firebase/firestore";
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
    const checkExist = notifArray.filter(
      (item) => item.translist_id === response.data._id
    ).length;
    if (checkExist >= 1) {
      const objIndex = notifArray.findIndex(
        (item) => item.translist_id === response.data._id
      );
      notifArray[objIndex].message = `มีการจองใหม่เกิดขึ้นที่ ${buildingName}`;
      notifArray[objIndex].timestamp = new Date().toUTCString();
    } else {
      notifArray.push({
        id: id,
        message: `มีการจองใหม่เกิดขึ้นที่ ${buildingName}`,
        translist_id: "",
        status: "unread",
        timestamp: new Date().toISOString(),
      });
    }

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

  return response.data;
};

// export const createChatroom = async (user, landlordId) => {
//   const landlordUser = await getOtherUserById(landlordId);
//   const chatroomCheckRef = collection(notificationDB, "chatroom");
//   const chatroomCheckQuery = query(
//     chatroomCheckRef,
//     where("tenant_id", "==", user._id),
//     where("landlord_id", "==", landlordId),
//     limit(1)
//   );
//   const chatroomCheckSnap = await getDocs(chatroomCheckQuery);
//   if (chatroomCheckSnap.docs.length > 0) {
//     let chatroomid;
//     chatroomCheckSnap.forEach((doc) => {
//       chatroomid = doc.id;
//     });
//     return {
//       chatid: chatroomid,
//       receiver: landlordId,
//       receivername: landlordUser.u_name,
//     };
//   }

//   const chatroomRef = await addDoc(collection(notificationDB, "chatroom"), {
//     tenant_id: user._id,
//     landlord_id: landlordId,
//     messages: [
//       {
//         sender: user._id,
//         message: "สนใจรายละเอียดเพิ่มเติม",
//         status: "unread",
//         createdAt: new Date().toISOString(),
//       },
//     ],
//   });
//   const chatroomTenantDoc = doc(notificationDB, "chatroom", user._id);
//   const chatroomTenantSnap = await getDoc(chatroomTenantDoc);
//   const chatroomlandlordDoc = doc(notificationDB, "chatroom", landlordId);
//   const chatroomlandlordSnap = await getDoc(chatroomlandlordDoc);
//   if (chatroomTenantSnap.exists()) {
//     const chatroomArr = chatroomTenantSnap.data().chatrooms;
//     chatroomArr.push({ chatid: chatroomRef.id, receiver: landlordId });
//     await updateDoc(doc(notificationDB, "userChat", user._id), {
//       chatrooms: chatroomArr,
//     })
//       .then((respond) => console.log(respond))
//       .catch((error) => console.log(error.message));
//   } else {
//     await setDoc(doc(notificationDB, "userChat", user._id), {
//       chatrooms: [{ chatid: chatroomRef.id, receiver: landlordId }],
//     })
//       .then((respond) => console.log(respond))
//       .catch((error) => console.log(error.message));
//   }
//   if (chatroomlandlordSnap.exists()) {
//     const chatroomArr = chatroomlandlordSnap.data().chatrooms;
//     chatroomArr.push({ chatid: chatroomRef.id, receiver: user._id });
//     await updateDoc(doc(notificationDB, "userChat", landlordId), {
//       chatrooms: chatroomArr,
//     })
//       .then((respond) => console.log(respond))
//       .catch((error) => console.log(error.message));
//   } else {
//     await setDoc(doc(notificationDB, "userChat", landlordId), {
//       chatrooms: [
//         {
//           chatid: chatroomRef.id,
//           receiver: user._id,
//           receivername: landlordUser.u_name,
//         },
//       ],
//     })
//       .then((respond) => console.log(respond))
//       .catch((error) => console.log(error.message));
//   }

//   return {
//     chatid: chatroomRef.id,
//     receiver: landlordId,
//     receivername: landlordUser.u_name,
//   };
// };
