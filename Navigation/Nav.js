"use client";

import { AiOutlineLogout } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { logout } from "@/apiservices/checklogin";
import mytoast from "@/components/toast/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  queryFilter,
  setInitialData,
} from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { setInitialData as setIsAdmin } from "@/app/redux/features/isAdmin/isAdminSlice";
import { setToken } from "@/helper/sessionHelper";

function Nav({ filler, isAdmin }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const data = isAdmin;

  function clickHandler(value) {
    if (value) {
      dispatch(queryFilter(value));
    } else {
      dispatch(setInitialData(filler));
    }
  }

  const hardRefresh = (link) => {
    if (typeof window !== "undefined") {
      window.location.href = link;
    }
  };

  async function handleLogoutClick(e) {
    e.preventDefault();

    let res = await logout();
    if (res) {
      if (res.status == "Alhamdulillah") {
        setToken("token_travel", { status: "noToken", data: "" });
        dispatch(setIsAdmin({ status: "noToken" }));
        mytoast.danger("You are logged out");
        router.push("/login");
      }
    } else {
      console.log(res);
    }
  }

  if (data) {
    return (
      <nav className="dash-nav">
        <div
          className="logo-container"
          onClick={() => hardRefresh("/")}
          style={{ cursor: "pointer" }}
        >
          <img width="100" src="/images/logo.png" alt=""></img>
        </div>
        <div className="nav-container">
          <input
            onChange={(e) => clickHandler(e.target.value)}
            className={`search-input ${data.data.isAdmin ? "nav-hidden" : ""}`}
            type="text"
            placeholder={`Hi ${data.data.userName}! Search Here`}
          />
        </div>

        <div className="profile-container">
          <a className="hiden-tag">{data.data.userName}</a>
          <a
            title="Profile Setting"
            style={{ cursor: "pointer" }}
            onClick={() =>
              hardRefresh(`/dashboard/${data.data.userName}/setting`)
            }
          >
            <BsFillGearFill className="nav-icons" />
          </a>
          <a
            title="Log Out!"
            style={{ cursor: "pointer" }}
            onClick={handleLogoutClick}
          >
            <AiOutlineLogout className="nav-icons" />
          </a>
        </div>
      </nav>
    );
  } else {
    return <div>loading Nav... </div>;
  }
}

export default Nav;
