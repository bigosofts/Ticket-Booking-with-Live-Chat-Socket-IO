"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitialData,
  queryFilter,
} from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";
import { selectDataPublic as selectPackages } from "@/apiservices/travelpackageapiservices";
import { useSearchParams } from "next/navigation";

import "@/assets/css/travels.css";
import PopularChoiceGrid from "@/components/PopularChoiceGrid/PopularChoiceGrid";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import CoverElement from "@/components/CoverElement/CoverElement";
import FrontFooter from "@/components/FrontFooter/FrontFooter";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Loader from "@/components/loader/Loader";

function Page(props) {
  const searchParams = useSearchParams();
  const searchtext = searchParams.get("search");

  const activity = searchParams.get("activity");
  const country = searchParams.get("country");

  const [admin, setAdmin] = useState();
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );

  useEffect(() => {
    async function settingData() {
      try {
        if (activity || country || searchtext) {
          debugger;
          const dataArray = await selectPackages({
            activeStatus: "active",
            packageType: "package",
            activity: activity || undefined,
            country: country || undefined,
          });

          const first = dispatch(setInitialData(dataArray.data));
          debugger;
          if (first && searchtext) {
            dispatch(queryFilter(searchtext));
            debugger;
          }
        } else {
          const dataArray = await selectPackages({
            activeStatus: "active",
            packageType: "package",
          });
          debugger;

          dispatch(setInitialData(dataArray.data));
        }
      } catch (error) {
        console.error("Error in settingData:", error);
      }
    }
    settingData();

    async function fetchData() {
      try {
        const payload = await isAdmin();
        setAdmin(payload);
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activity, country, searchtext]);

  if (filteredPackageData) {
    return (
      <div className="travelpage-container">
        <HeaderFront scrolledStatus={scrolled} />
        <CoverElement id={"Travel Packages"} />
        <div style={{ margin: "auto" }}>
          <SearchComponent />
          <PopularChoiceGrid detailData={filteredPackageData} />
        </div>

        <FrontFooter />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default Page;
