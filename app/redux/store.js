"use client";
import { configureStore } from "@reduxjs/toolkit";

import instructorFilterSlice from "./features/instructorFilter/instructorFilterSlice";
import postFilterSlice from "./features/postFilter/postFilterSlice";
import isAdminSlice from "./features/isAdmin/isAdminSlice";
import stateChangeSlice from "./features/changeState/changeStateSlice";

export const store = configureStore({
  reducer: {
    instructorFilter: instructorFilterSlice,
    postFilter: postFilterSlice,
    isAdmin: isAdminSlice,
    stateChange: stateChangeSlice,
  },
});
