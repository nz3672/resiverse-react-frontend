import { createSlice } from "@reduxjs/toolkit";

export const gMapSlice = createSlice({
  name: "gMapSlice",
  initialState: {
    myLatLng: { lat: "", lng: "" },
  },
  reducers: {
    resetMyLatLng: (state) => {
      if (state.myLatLng.lat && state.myLatLng.lng) {
        state.status = { lat: "", lng: "" };
      }
    },
    setLatLng: (state, action) => {
      state.myLatLng = action.payload;
    },
  },
});

export const { resetMyLatLng, setLatLng } = gMapSlice.actions;
export default gMapSlice.reducer;
