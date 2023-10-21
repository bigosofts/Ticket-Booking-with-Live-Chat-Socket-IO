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
      <div class="cover">
        <div class="profile-pic">
          <img src="/images/avatar.png" alt="Hero Alom" />
        </div>
      </div>
      <div class="text-center">
        <h1>{isAdmin.data.userName}</h1>
        <p class="subtitle">{isAdmin.data.userRole} Profile</p>
      </div>
      <div class="main">
        <ul class="tabs">
          <li data-target="intro" class="active">
            About
          </li>
          <li data-target="history">Messages</li>
          <li data-target="contact">Setting</li>
        </ul>
        <div id="intro" class="tab-content active">
          <ProfileInfo />
        </div>
        <div id="history" class="tab-content">
          <ChatBox />
        </div>
        <div id="contact" class="tab-content">
          <ProfileUpdateForm />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
