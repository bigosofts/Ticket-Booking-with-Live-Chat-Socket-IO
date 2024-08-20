"use client";
import { useEffect } from "react";
import "./ProfileCard.css";
import ChatBox from "../ChatBox/ChatBox";
import { useSelector } from "react-redux";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileUpdateForm from "../profileupdatePage/ProfileUpdateForm";

function ProfileCard(props) {
  const isAdmin = useSelector((state) => state.isAdmin.value);
  useEffect(() => {
    import("./ProfileCustom.js");
  }, []);
  return (
    <div class="container-profile-card">
      <div class="cover"></div>
      <div class="text-center">
        <h1>{isAdmin.data.userName}</h1>
        <p class="subtitle">{isAdmin.data.userRole} Profile</p>
      </div>
      <div class="main">
        <ul class="tabs">
          <li data-target="intro" class="active">
            Messages
          </li>
        </ul>
        <div id="intro" class="tab-content active">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
