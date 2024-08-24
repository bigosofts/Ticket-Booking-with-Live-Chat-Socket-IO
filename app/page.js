"use client";

<<<<<<< HEAD
import { useEffect } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 7805eba8a9fedc48d11fa4e9c9b7dd51cb3dbc21
import { isAdmin } from "@/apiservices/checklogin";
import { useDispatch } from "react-redux";
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

  router.replace("/travels");
}

export default Page;
