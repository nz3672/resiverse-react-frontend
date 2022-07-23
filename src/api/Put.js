import axios from "axios";
import { store } from "../components/app/store";
import { notificationDB } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

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

export const updateUser = async (form) => {
  console.log(form);
  const formData = jsonToFormData(form);
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };


  const response = await axios.put(
    `https://resiverse-microservice.herokuapp.com/api/users/${user._id}`,
    formData,
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
    `https://resiverse-microservice.herokuapp.com/api/translists/${id}`,
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

export const updateResidence = async (form, id) => {
  const user = await store.getState().authStore.user;
  const formData = jsonToFormData(form);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };


  const response = await axios.put(
    `https://resiverse-microservice.herokuapp.com/api/buildings/${id}`,
    formData,
    config
  );

  return response.data;
};
