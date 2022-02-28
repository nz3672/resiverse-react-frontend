import { configureStore } from "@reduxjs/toolkit";
import popUpSlice from "../features/popUpSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    popupSignInOut: popUpSlice,
    authStore: authReducer,
  },
});
