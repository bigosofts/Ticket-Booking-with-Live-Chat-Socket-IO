"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { selectData as selectPackages } from "@/apiservices/travelpackageapiservices";
import mytoast from "@/components/toast/toast";

function SingleRecommended({ click, filler, isAdmin }) {
  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );
  const dispatch = useDispatch();

  function clickHandler() {
    if (click == "Reset Filters") {
      dispatch(setInitialData(filler));
      mytoast.success("All of the Packages and Customs are Loaded");
    } else if (click == "All Package") {
      let modified = filteredPackageData.filter(
        (item) => item.packageType == "package"
      );
      dispatch(setInitialData(modified));
      mytoast.success("All of the Packages are loaded");
    } else if (click == "Preset Package") {
      let modified = filteredPackageData.filter(
        (item) => item.preset == true && item.packageType == "package"
      );
      dispatch(setInitialData(modified));
      mytoast.success("All of the preset packages are loaded");
    } else if (click == "Your Custom Request") {
      let modified = filteredPackageData.filter(
        (item) => item.packageType == "custom"
      );
      dispatch(setInitialData(modified));
      mytoast.success("All of your custom packages are loaded");
    }
  }
  function clickHandler2() {
    if (click == "View All") {
      dispatch(setInitialData(filler));
      mytoast.success("All of the custom and your packages are loaded")
    } else if (click == "Custom Request") {
      let modified = filteredPackageData.filter((item) => item.packageType == "custom");
      dispatch(setInitialData(modified));
      mytoast.success("All of the custom requests are loaded")
    } else if (click == "Preset Package") {
      let modified = filteredPackageData.filter(
        (item) => item.packageType == "package" && item.preset == true
      );
      dispatch(setInitialData(modified));
      mytoast.success("All of the preset packages are loaded")
    } else if (click == "Your Own Package") {
      let modified = filteredPackageData.filter(
        (item) => item.packageType == "package"
      );
      dispatch(setInitialData(modified));
      mytoast.success("All of your own packages are loaded")
    }
  }

  if (isAdmin.data.userRole == "client") {
    return (
      <button onClick={clickHandler} className="btns">
        {click}
      </button>
    );
  } else if (isAdmin.data.userRole == "instructor") {
    return (
      <button onClick={clickHandler2} className="btns">
        {click}
      </button>
    );
  }
}

export default SingleRecommended;
