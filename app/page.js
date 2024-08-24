"use client";

import { useEffect } from "react";
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

      // Navigate to /travels after the data is fetched
      router.replace("/travels");
    }

    getData();
  }, [dispatch, router]);

  return null; // Since you're redirecting, no need to render anything here
}

export default Page;
