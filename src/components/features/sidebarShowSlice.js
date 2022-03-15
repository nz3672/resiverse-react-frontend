import { createSlice } from "@reduxjs/toolkit";

export const sidebarShowSlice = createSlice({
  name: "sidebarShowSlice",
  initialState: {
    showsidestatus: null,
  },
  reducers: {
    clearSidebar: (state) => {
      if (state) {
        state.showsidestatus = null;
      }
    },
    chooseSidebar: (state, action) => {
      state.showsidestatus = action.payload;
    },
  },
});

export const { clearSidebar, chooseSidebar } = sidebarShowSlice.actions;
export default sidebarShowSlice.reducer;
