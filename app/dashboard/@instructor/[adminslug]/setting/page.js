"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import Nav from "@/Navigation/Nav";
import { getToken } from "@/helper/sessionHelper";
import "../../../@admin/[adminslug]/dashsidebar.css";

function SettingPage(props) {
  function goBack() {
    history.back();
  }
  const data = getToken("token_travel");
  return (
    <>
      <Nav isAdmin={data} />
      <div className="profile-card-wrapper">
        <ProfileCard />
        <div
        onClick={goBack}
        style={{
          position: "absolute",
          width: "100px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00ffff",
          color: "#fff",
          top: "160px",
          left: "40px",
          cursor: "pointer",
        }}
        className="floating-back-button"
      >
        <i className="fa fa-arrow-left" aria-hidden="true">
          {" "}
          Go Back{" "}
        </i>
      </div>
      </div>
    </>
  );
}

export default SettingPage;
