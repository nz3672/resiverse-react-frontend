import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    sidebarstatus: false,
    widgetstatus: false,
    widgetinfo: null,
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
    setWidgetInfo: (state, action) => {
      state.widgetinfo = action.payload;
    },
    resetWidgetInfo: (state) => {
      if (state) {
        state.widgetinfo = null;
      }
    },
  },
});

export const {
  closeSidebar,
  openSidebar,
  focusWidget,
  unfocusWidget,
  setWidgetInfo,
  resetWidgetInfo,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
