"use client";
import React from "react";

import ClientCard from "@/components/ordercard";

import "../../../@admin/[adminslug]/dashsidebar.css";
import Nav from "@/Navigation/Nav";
import { getToken } from "@/helper/sessionHelper";

function ClientOrderPage(props) {
  const isAdmin = getToken("token_travel");
  return (
    <>
      <Nav isAdmin={isAdmin} />
      <div className="layout">
        <div className="main-box post-box">
          <h1 className="animate__animated animate__backInDown post-box-title">
            {" "}
            Your Sended Orders{" "}
          </h1>

          <div className="container-new-form mt-5">
            <ClientCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientOrderPage;
