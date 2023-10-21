"use client";

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state as null
const initialState = {
  value: null,
};

export const instructorFilterSlice = createSlice({
  name: "instructorFilter",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.value = action.payload;
    },
    queryFilter: (state, action) => {
      state.value = state.value.filter(
        (item) =>
          item.packageTitle
            .toLocaleLowerCase()
            .indexOf(action.payload.toLocaleLowerCase()) !== -1
      );
    },
  },
});

// Export the actions
export const { setInitialData, queryFilter } = instructorFilterSlice.actions;

export default instructorFilterSlice.reducer;
