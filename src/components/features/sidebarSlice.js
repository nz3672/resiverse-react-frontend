import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    sidebarstatus: false,
  },
  reducers: {
    closeSidebar: (state) => {
      if (state) {
        state.sidebarstatus = false;
      }
    },
    openSidebar: (state, action) => {
      state.sidebarstatus = action.payload;
    },
  },
});

export const { closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
