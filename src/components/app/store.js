import { configureStore } from "@reduxjs/toolkit";
import popUpSlice from "../features/popUpSlice";

export default configureStore({
  reducer: {
    popupSignInOut: popUpSlice,
  },
});
