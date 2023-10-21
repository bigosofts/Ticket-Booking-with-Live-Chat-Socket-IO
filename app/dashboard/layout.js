"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import "./dashboard.css";
import { getToken } from "@/helper/sessionHelper";

function DashboardLayout({ client, instructor, admin }) {
  const data6 = getToken("token_travel");
  console.log(data6 + "data6");
  const data5 = useSelector((state) => state.isAdmin.value);
  console.log(data5 + "data5");

  let data = data6 ? data6 : data5;

  const router = useRouter();

  if (data) {
    if (data.status === "noToken") {
      router.push("/login");
    } else if (data.data.isAdmin == true) {
      return <>{admin}</>;
    } else if (data.data.userRole == "client") {
      return <>{client}</>;
    } else if (data.data.userRole == "instructor") {
      return <>{instructor}</>;
    }
  }
}

export default DashboardLayout;
