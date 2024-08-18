"use client";

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: false,
};

export const stateChangeSlice = createSlice({
  name: "stateChange",
  initialState,
  reducers: {
    setInitialData: (state) => {
      state.value = !state.value;
    },
    
  },
});

// Export the actions
export const { setInitialData } = stateChangeSlice.actions;

export default stateChangeSlice.reducer;
