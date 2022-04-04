import axios from "axios";
import { store } from "../components/app/store";
import { notificationDB } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

export const updateUser = async (form) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.put(
    `account/api/users/${user._id}`,
    form,
    config
  );

  return response.data;
};

export const updateTranslist = async (form, id) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.put(
    `account/api/translists/${id}`,
    form,
    config
  );

  return response.data;
};

export const updateNotification = async (notificationArr, userID) => {
  const updatedArray = notificationArr;
  updatedArray.map((item) => {
    item.status = "read";
  });
  updateDoc(doc(notificationDB, "translist-noti", userID), {
    notif: updatedArray,
  })
    .then((respond) => console.log(respond))
    .catch((error) => console.log(error.message));
};
