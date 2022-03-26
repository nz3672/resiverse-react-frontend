import axios from "axios";

export const getAllResidence = async () => {
  const response = await axios.get("account/api/buildings/");

  return response.data;
};
