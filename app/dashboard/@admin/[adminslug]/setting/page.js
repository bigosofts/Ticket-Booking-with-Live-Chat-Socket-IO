"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

function SettingDashPage(props) {
  function goBack() {
    history.back();
  }
  return (
    <div className="profile-card-wrapper dash-profile-card-wrapper">
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
          left: "280px",
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
  );
}

export default SettingDashPage;
