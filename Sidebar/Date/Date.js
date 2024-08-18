"use client";
import SingleDate from "./SingleDate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";

function Date({ filler }) {
  const [admin, setAdmin] = useState();
  const dispatch = useDispatch();
  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );

  function clickHandler(value) {
    let modified = filteredPackageData.filter((item) => {
      const monthAbbreviations = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = item.travelTime.match(/-(\d{2})-/)[1];

      const monthAbbreviation = monthAbbreviations[parseInt(month, 10) - 1];

      return monthAbbreviation == value;
    });

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
    const monthAbbreviations = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const modifiedArray = old.map((item) => {
      const month = item.travelTime.match(/-(\d{2})-/)[1];

      const monthAbbreviation = monthAbbreviations[parseInt(month, 10) - 1];

      return monthAbbreviation;
    });
    const uniqueNamesSet = new Set(modifiedArray);
    const uniqueNamesArray = Array.from(uniqueNamesSet);
    return uniqueNamesArray;
  }
  return (
    <div>
      <h2 className="sidebar-title price-title">Date</h2>
      {uniqueArray(filler)
        .slice(0, 4)
        .map((item) => (
          <SingleDate click={clickHandler} text={item} group={"date"} />
        ))}
    </div>
  );
}

export default Date;
