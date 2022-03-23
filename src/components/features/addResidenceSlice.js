import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addResidenceSlice = createSlice({
  name: "addResidenceSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
