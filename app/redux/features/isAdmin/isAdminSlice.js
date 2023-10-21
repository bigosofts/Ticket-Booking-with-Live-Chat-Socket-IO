"use client";

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state as null
const initialState = {
  value: { status: "noToken", data: "" },
};

export const isAdminSlice = createSlice({
  name: "isAdmin",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Export the actions
export const { setInitialData } = isAdminSlice.actions;

export default isAdminSlice.reducer;
