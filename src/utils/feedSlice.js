import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      // Replace entire feed with new data
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    resetFeed: () => {
      return [];
    },
  },
});

export const { addFeed, resetFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
