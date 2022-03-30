import { createSlice } from "@reduxjs/toolkit";

export const myResidenceSlice = createSlice({
  name: "myResidence",
  initialState: {
    residences: null,
  },
  reducers: {
    initMyRest: (state, action) => {
      state.residences = action.payload;
    },
  },
});

export const { initMyRest } = myResidenceSlice.actions;
export default myResidenceSlice.reducer;
