"use client";
import { configureStore } from "@reduxjs/toolkit";

import instructorFilterSlice from "./features/instructorFilter/instructorFilterSlice";
import postFilterSlice from "./features/postFilter/postFilterSlice";
import isAdminSlice from "./features/isAdmin/isAdminSlice";

export const store = configureStore({
  reducer: {
    instructorFilter: instructorFilterSlice,
    postFilter: postFilterSlice,
    isAdmin: isAdminSlice,
  },
});
