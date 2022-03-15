import { configureStore } from "@reduxjs/toolkit";
import popUpSlice from "../features/popUpSlice";
import authReducer from "../features/auth/authSlice";
import sidebarSlice from "../features/sidebarSlice";
import sidebarShowSlice from "../features/sidebarShowSlice";

export default configureStore({
  reducer: {
    popupSignInOut: popUpSlice,
    sidebarHome: sidebarSlice,
    sidebarShow: sidebarShowSlice,
    authStore: authReducer,
  },
});
