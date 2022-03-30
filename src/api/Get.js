import axios from "axios";
import { store } from "../components/app/store";

export const getAllResidence = async () => {
  const response = await axios.get("account/api/buildings/");

  return response.data;
};

export const getMyResidence = async () => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get("account/api/buildings/me", config);

  return response.data;
};
