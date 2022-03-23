import axios from "axios";

// In package.json, set proxy
const API_URL = "account/api/users/";

// Register user
const register = async (userData) => {
  const config = {
    headers: {
      Authorization: `Bear`,
    },
  };
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
