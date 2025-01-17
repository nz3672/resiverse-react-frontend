import axios from "axios";
import { store } from "../components/app/store";

export const getAllResidence = async () => {
  const response = await axios.get(
    "https://resiverse-microservice.herokuapp.com/api/buildings/"
  );

  return response.data;
};

export const getMyResidence = async () => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(
    "https://resiverse-microservice.herokuapp.com/api/buildings/me",
    config
  );

  return response.data;
};

export const getMyResidenceById = async (id) => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(
    `https://resiverse-microservice.herokuapp.com/api/buildings/get/${id}`,
    config
  );

  return response.data;
};

export const getMyTransList = async () => {
  const user = await store.getState().authStore.user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(
    "https://resiverse-microservice.herokuapp.com/api/translists",
    config
  );

  return response.data;
};

export const getOtherUserById = async (id) => {
  const response = await axios.get(
    `https://resiverse-microservice.herokuapp.com/api/users/otherUser/${id}`
  );

  return response.data;
};
