"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { getToken } from "@/helper/sessionHelper.js";

function ClientPage({ params }) {
  const router = useRouter();

  const data6 = getToken("token_travel");

  const data5 = useSelector((state) => state.isAdmin.value);

  let data = data6 ? data6 : data5;

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
