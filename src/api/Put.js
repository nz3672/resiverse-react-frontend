import axios from "axios";
import { store } from "../components/app/store";

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
