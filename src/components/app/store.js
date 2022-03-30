import { configureStore } from "@reduxjs/toolkit";
import popUpSlice from "../features/popUpSlice";
import authReducer from "../features/auth/authSlice";
import sidebarSlice from "../features/sidebarSlice";
import sidebarShowSlice from "../features/sidebarShowSlice";
import gMapSlice from "../features/gMapSlice";
import myResidenceSlice from "../features/myResidenceSlice";

export const store = configureStore({
  reducer: {
    popupSignInOut: popUpSlice,
    sidebarHome: sidebarSlice,
    sidebarShow: sidebarShowSlice,
    authStore: authReducer,
    gMapLatLng: gMapSlice,
    myResStore: myResidenceSlice,
  },
});
