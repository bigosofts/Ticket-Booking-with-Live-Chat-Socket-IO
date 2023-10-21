"use client";


import { createSlice } from "@reduxjs/toolkit";

// Define the initial state as null
const initialState = {
  value: [],
};

export const postFilterSlice = createSlice({
  name: "postFilter",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.value = action.payload;
    },
    queryFilter: (state, action) => {
      state.value = state.value.filter(
        (item) =>
          item.postTitle.en
            .toLocaleLowerCase()
            .indexOf(action.payload.toLocaleLowerCase()) !== -1
      );
    }
  },
});

// Export the actions
export const { setInitialData, queryFilter} = postFilterSlice.actions;

export default postFilterSlice.reducer;
