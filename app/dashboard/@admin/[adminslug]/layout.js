"use client";
import { useEffect } from "react";
import DashboardNav from "@/Navigation/Nav";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import { useRouter } from "next/navigation";
import "./dashsidebar.css";
import { useSelector } from "react-redux";
import { getToken } from "@/helper/sessionHelper";

function DashboardLayout({ children, params }) {
  const router = useRouter();

  const data6 = getToken("token_travel");
  console.log(data6 + "data6");
  const data5 = useSelector((state) => state.isAdmin.value);
  console.log(data5 + "data5");

  let data = data6 ? data6 : data5;

  useEffect(() => {
    import("../../../../src/source/mdb.min.js");
  }, []);

  const sidebarItems = [
    {
      name: "Dashboard",
      href: `/dashboard/${params.adminslug}`,
      icon: "MdOutlineDashboard",
    },
    {
      name: "Posts",
      href: `/dashboard/${params.adminslug}/posts`,
      icon: "MdPostAdd",
    },
    {
      name: "Packages",
      href: `/dashboard/${params.adminslug}/packages`,
      icon: "BsBookmarkPlus",
    },
    {
      name: "Instructor",
      href: `/dashboard/${params.adminslug}/instructors`,
      icon: "FaChalkboardTeacher",
    },
    {
      name: "Client",
      href: `/dashboard/${params.adminslug}/clients`,
      icon: "LuGraduationCap",
    },
    {
      name: "Orders",
      href: `/dashboard/${params.adminslug}/orders`,
      icon: "BsClipboardData",
    },
    {
      name: "Widgets",
      href: `/dashboard/${params.adminslug}/widgets`,
      icon: "BiCode",
    },
  ];

  if (data) {
    if (data.status == "noToken") {
      router.push(`/login`);
    } else {
      if (params.adminslug == data.data.userName) {
        return (
          <>
            <DashboardNav isAdmin={data} />
            <div className="layout">
              <Sidebar item={sidebarItems} />
              {children}
            </div>
          </>
        );
      } else {
        router.replace(`/dashboard/${data.data.userName}`);
      }
    }
  }
}

export default DashboardLayout;
