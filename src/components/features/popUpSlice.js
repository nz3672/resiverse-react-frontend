import { createSlice } from "@reduxjs/toolkit";

export const popUpSlice = createSlice({
  name: "popupSlice",
  initialState: {
    status: null,
  },
  reducers: {
    closePopup: (state) => {
      if (state) {
        state.status = null;
      }
    },
    clickPopup: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { closePopup, clickPopup } = popUpSlice.actions;
export default popUpSlice.reducer;
