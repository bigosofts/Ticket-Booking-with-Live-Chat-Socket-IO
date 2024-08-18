"use client";
import { useEffect } from "react";
import Date from "./Date/Date";
import Preset from "./Preset/Preset";
import Country from "./Country/Country";
import Activity from "./Activity/Activity";
import Difficulty from "./Difficulty/Difficulty";
import Price from "./Price/Price";
import Duration from "./Duration/Duration";

function Sidebar({ filler, hide }) {
  useEffect(() => {
    import("./Sidebar.css");
  }, []);
  return (
    <>
      <section id="sidebar-instructor" className={hide ? "hideDisplaySidebar" : ""}>
        <Date filler={filler} />
        {/* <Preset filler={filler} /> */}
        <Country filler={filler} />
        <Activity filler={filler} />
        <Difficulty filler={filler} />
        <Price filler={filler} />
        <Duration filler={filler} />
      </section>
    </>
  );
}

export default Sidebar;
