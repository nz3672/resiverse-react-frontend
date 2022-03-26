import axios from "axios";

export const getAllResidence = async () => {
  const response = await axios.get(
    "http://localhost:8080/account/api/buildings/all"
  );
  console.log(response);
};
