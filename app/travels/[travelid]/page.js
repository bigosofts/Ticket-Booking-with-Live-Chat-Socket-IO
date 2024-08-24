"use client";

import { useState, useEffect, useRef } from "react";
import "@/assets/css/travels.css";
import HeaderFront from "@/components/HeaderFront/HeaderFront";


import BookingInfoCard from "@/components/BookingInfoCard/BookingInfoCard";
import { selectDataPublic } from "@/apiservices/travelpackageapiservices";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitialData
} from "@/app/redux/features/instructorFilter/instructorFilterSlice";

import mytoast from "@/components/toast/toast";

import { getToken } from "@/helper/sessionHelper";
// import {
//   createData as createConversations,
//   selectAllData as selectConversations,
// } from "@/apiservices/conversationapiservices";
import { useRouter } from "next/navigation";

import Loader from "@/components/loader/Loader";

function SingleTravelPage({ params }) {
 

 

  const adminData = getToken("token_travel");
  const [presetPackage, setPresetPackage] = useState();


  const naameref = useRef();
  const msgref = useRef();

  const radio1ref = useRef();
  const radio2ref = useRef();
  const radio3ref = useRef();
  const radio4ref = useRef();
  const radio5ref = useRef();

 

  const dispatch = useDispatch();

  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );

  let singleData = filteredPackageData ? filteredPackageData[0] : "";

 

  useEffect(() => {
    async function settingData() {
      try {
        const dataArray = await selectDataPublic({
          activeStatus: "active",
          packageId: params.travelid,
        });
        dispatch(setInitialData(dataArray.data));
      } catch (error) {
        console.error("Error in settingData:", error);
      }
    }
    async function settingPresetData(userName) {
      try {
        const dataArray2 = await selectDataPublic({
          activeStatus: "active",
          packageType: "package",
        });
        setPresetPackage(dataArray2.data);
      } catch (error) {
        console.error("Error in settingData:", error);
      }
    }

    async function fetchData() {
      try {
        settingData();
        settingPresetData();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

 
 

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

  if (singleData && presetPackage && adminData) {
    return (
      <>
        <div className="travelpage-container">
          <HeaderFront scrolledStatus={scrolled} />

          <section style={{ margnTop: "100px" }}>
            <div className="full_container">
              <div
                style={{ margnTop: "100px" }}
                className="container-travel-page fix port"
              >
                <div className="sidebar-travelpage">
                  <div className="visibility-sidebar">
                    <BookingInfoCard filler={singleData} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
}

export default SingleTravelPage;
