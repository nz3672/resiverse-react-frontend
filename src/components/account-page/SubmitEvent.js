import { updateTranslist } from "../../api/Put";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { notificationDB } from "../../firebase";
import { nanoid } from "nanoid";
import { jsonToFormData } from "../../api/Post";

const sendNotification = async (translistId, userId, message) => {
  const notifDoc = doc(notificationDB, "translist-noti", userId);
  const notificationSnap = await getDoc(notifDoc);
  const id = nanoid(10);

  if (notificationSnap.exists()) {
    const notifArray = notificationSnap.data().notif;
    const checkExist = notifArray.filter(
      (item) => item.translist_id === translistId
    ).length;
    if (checkExist >= 1) {
      const objIndex = notifArray.findIndex(
        (item) => item.translist_id === translistId
      );
      notifArray[objIndex].message = message;
      notifArray[objIndex].status = "unread";
      notifArray[objIndex].timestamp = new Date().toUTCString();
    } else {
      notifArray.push({
        id: id,
        message: message,
        translist_id: translistId,
        status: "unread",
        timestamp: new Date().toUTCString(),
      });
    }
    updateDoc(doc(notificationDB, "translist-noti", userId), {
      notif: notifArray,
    })
      .then((respond) => console.log(respond))
      .catch((error) => console.log(error.message));
  } else {
    await setDoc(doc(notificationDB, "translist-noti", userId), {
      notif: [
        {
          id: id,
          message: message,
          translist_id: translistId,
          status: "unread",
          timestamp: new Date().toISOString(),
        },
      ],
    })
      .then((respond) => console.log(respond))
      .catch((error) => console.log(error.message));
  }
};

export const waitForLandlordEvent = async (form, id) => {
  const formData = jsonToFormData(form);
  const response = await updateTranslist(formData, id);
  console.log(response);
  await sendNotification(
    id,
    response.tenant_id,
    `ผู้ให้เช่ายินยอมให้เช่าที่พัก ${response.bd_id.bd_name} เรียบร้อยแล้ว โปรดทำการยืนยันสัญญาเพื่อดำเนินการจองต่อ`
  );
  return response;
};

export const waitForTenantdEvent = async (form, id) => {
  const formData = jsonToFormData(form);
  const response = await updateTranslist(formData, id);
  await sendNotification(
    id,
    response.tenant_id,
    `${response.bd_id.bd_name} ผู้เช่าทำการยืนยันสัญญาเสร็จสิ้น กรุณารอการยืนยันเข้าที่พักอาศัยจากผู้เช่า`
  );

  return response;
};

export const waitMoveInEvent = async (form, id) => {
  const response = await updateTranslist(form, id);
  await sendNotification(
    id,
    response.tenant_id,
    `${response.bd_id.bd_name} ผู้เช่าย้ายเข้าที่พักอาศัยเสร็จสิ้น`
  );
  return response;
};

export const waitLandlordCheckInsur = async (form, id) => {
  const response = await updateTranslist(form, id);
  await sendNotification(
    id,
    response.tenant_id,
    `ผู้ให้เช่ายินยอมให้เช่าที่พัก ${response.bd_id.bd_name} เรียบร้อยแล้ว โปรดทำการยืนยันสัญญาเพื่อดำเนินการจองต่อ`
  );
  return response;
};

export const waitForConfirmInsur = async (form, id) => {
  const response = await updateTranslist(form, id);
  await sendNotification(
    id,
    response.tenant_id,
    `ผู้ให้เช่ายินยอมให้เช่าที่พัก ${response.bd_id.bd_name} เรียบร้อยแล้ว โปรดทำการยืนยันสัญญาเพื่อดำเนินการจองต่อ`
  );
  return response;
};
