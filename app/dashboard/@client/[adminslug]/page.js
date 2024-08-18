"use client";
import React from "react";
import Nav from "@/Navigation/Nav";
import Sidebar from "@/Sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Packages from "@/Packages/Packages";
import Recommended from "@/Recommended/Recommended";
import { selectData } from "@/apiservices/travelpackageapiservices.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitialData,
  queryFilter,
} from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { getToken } from "@/helper/sessionHelper.js";

function ClientPage({ params }) {
  const router = useRouter();

  const data6 = getToken("token_travel");

  const data5 = useSelector((state) => state.isAdmin.value);

  let data = data6 ? data6 : data5;

  const dispatch = useDispatch();

  useEffect(() => {
    import("../../../../src/source/mdb.min.js");
  }, []);

  if (data) {
    if (data.status == "noToken") {
      router.push("/login");
    } else {
      if (params.adminslug == data.data.userName) {
        router.replace(`/dashboard/${data.data.userName}/setting`);
      } else {
        router.replace(`/dashboard/${data.data.userName}`);
      }
    }
  }
}

export default ClientPage;
