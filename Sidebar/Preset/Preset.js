"use client";
import "./Preset.css";
import SinglePreset from "./singlePreset";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";


function Preset({ filler }) {
  const [admin, setAdmin] = useState();
  const dispatch = useDispatch();
  const filteredPackageData = useSelector((state) => state.instructorFilter.value);

  function clickHandler(value) {
    let modified = filteredPackageData.filter((item) => item.preset == JSON.parse(value));
  

    dispatch(setInitialData(modified));
    }


    useEffect(() => {
     
  
      async function fetchData() {
        try {
          const payload = await isAdmin();
          setAdmin(payload);
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }
  
      fetchData();
    }, []);
  function uniqueArray(old) {
    const modifiedArray = old.map((item) => item.preset);
    const uniqueNamesSet = new Set(modifiedArray);
    const uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
  }
  return (
    <div>
      <h2 className="sidebar-title">Preset</h2>

      {uniqueArray(filler)
        .slice(0, 4)
        .map((item) => (
          <SinglePreset click={clickHandler} text={item} group={"preset"} />
        ))}
    </div>
  );
}

export default Preset;
