import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatroomstatus: null,
  },
  reducers: {
    selectedChatroom: (state, action) => {
      state.chatroomstatus = action.payload;
    },
    resetChatroom: (state) => {
      state.chatroomstatus = null;
    },
  },
});

export const { selectedChatroom, resetChatroom } = chatSlice.actions;
export default chatSlice.reducer;
