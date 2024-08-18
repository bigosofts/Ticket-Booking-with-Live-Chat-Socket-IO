"use client";
import React from "react";
import "./Recommended.css";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FaCogs } from "react-icons/fa";
import SingleRecommended from "@/Recommended/SingleRecommended";
import { getToken } from "@/helper/sessionHelper";
import { useRouter } from "next/navigation";

function Recommended({ filler }) {
  const router = useRouter();
  const isAdmin = getToken("token_travel");
  if (isAdmin.data.userRole == "client") {
    return (
      <div className="recommended-flex animate__animated animate__backInDown">
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Reset Filters"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"All Package"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Preset Package"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Your Custom Request"}
        />
        <button
          onClick={() =>
            router.push(`/dashboard/${isAdmin.data.userName}/orders`)
          }
          className="btns btns-dark"
        >
          Manage Order{" "}
          <span className="px-2">
            <FaCogs />
          </span>
        </button>
        <button
          onClick={() =>
            router.push(
              `/dashboard/${isAdmin.data.userName}/add-custom-request`
            )
          }
          className="btns btns-dark"
        >
          Create a custom adventure request{" "}
          <span className="px-2">
            <AiOutlineFolderAdd />
          </span>
        </button>
      </div>
    );
  } else if (isAdmin.data.userRole == "instructor") {
    return (
      <div className="recommended-flex animate__animated animate__backInDown">
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"View All"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Custom Request"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Preset Package"}
        />
        <SingleRecommended
          isAdmin={isAdmin}
          filler={filler}
          click={"Your Own Package"}
        />
        <button
          onClick={() =>
            router.push(`/dashboard/${isAdmin.data.userName}/orders`)
          }
          className="btns btns-dark"
        >
          Your Order{" "}
          <span className="px-2">
            <FaCogs />
          </span>
        </button>
        <button
          onClick={() =>
            router.push(`/dashboard/${isAdmin.data.userName}/add-new-package`)
          }
          className="btns btns-dark"
        >
          Add New Package{" "}
          <span className="px-2">
            <AiOutlineFolderAdd />
          </span>
        </button>
      </div>
    );
  }
}

export default Recommended;
