"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import Nav from "@/Navigation/Nav";
import { getToken } from "@/helper/sessionHelper";
import "../../../@admin/[adminslug]/dashsidebar.css";

function SettingPage(props) {
  const data = getToken("token_travel");
  return (
    <>
      <Nav isAdmin={data} />
      <div className="profile-card-wrapper">
        <ProfileCard />
      </div>
    </>
  );
}

export default SettingPage;
