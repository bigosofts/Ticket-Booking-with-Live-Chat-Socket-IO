"use client";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import HeroSection from "@/components/HeroSection/HeroSection";
import FrontBody from "@/components/FrontBody/FrontBody";
import FrontFooter from "@/components/FrontFooter/FrontFooter";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { useEffect, useState } from "react";
import { isAdmin } from "@/apiservices/checklogin";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "./redux/features/isAdmin/isAdminSlice";
import { getToken, setToken } from "@/helper/sessionHelper";
import { useRouter } from "next/navigation";

function Page(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const res2 = getToken("token_travel");
      const res = await isAdmin();
      if (res2) {
        dispatch(setInitialData(res2));
      } else if (res) {
        dispatch(setInitialData(res));
        setToken("token_travel", { status: "noToken", data: "" });
      }
    }
    getData();
  }, []);

  router.replace("/travels/pk-20246181625232");
}

export default Page;
