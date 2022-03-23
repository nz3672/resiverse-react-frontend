import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    sidebarstatus: false,
    widgetstatus: false,
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
    focusWidget: (state, action) => {
      state.widgetstatus = action.payload;
    },
    unfocusWidget: (state) => {
      if (state) {
        state.widgetstatus = false;
      }
    },
  },
});

export const { closeSidebar, openSidebar, focusWidget, unfocusWidget } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
