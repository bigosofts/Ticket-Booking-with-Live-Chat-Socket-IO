"use client";
import React from "react";
import Nav from "@/Navigation/Nav";
import Sidebar from "@/Sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Packages from "@/Packages/Packages";
import Recommended from "@/Recommended/Recommended";
import { selectData } from "@/apiservices/travelpackageapiservices.js";
import { useSelector, useDispatch } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { getToken } from "@/helper/sessionHelper.js";

function InstructorPage({ params }) {
  const router = useRouter();

  const data6 = getToken("token_travel");
  console.log(data6 + "data6");
  const data5 = useSelector((state) => state.isAdmin.value);
  console.log(data5 + "data5");

  let data = data6 ? data6 : data5;
  const [actualData, setActualData] = useState();

  const dispatch = useDispatch();

  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );

  useEffect(() => {
    import("../../../../src/source/mdb.min.js");
    async function settingData(userName) {
      try {
        if(data.data.userRole == "instructor"){
          const dataArray = await selectData({
            activeStatus: "active",
          });
          let newDataArray = dataArray.data.filter(
            (item) =>
              !(item.packageType == "package" && item.createdUser !== userName)
          );
  
          dispatch(setInitialData(newDataArray));
          setActualData(newDataArray);
        }
        
      } catch (error) {
        console.error("Error in settingData:", error);
      }
    }

    settingData(data.data.userName);
  }, []);

  if (data && filteredPackageData && actualData) {
    if (data.status == "noToken") {
      router.push("/login");
    } else {
      if (params.adminslug == data.data.userName) {
        return (
          <div className="container-admin">
            <Nav isAdmin={data} filler={actualData} />
            <div className="main-wrapper-custom">
              <Sidebar filler={actualData} />
              <Packages filler={filteredPackageData}>
                <Recommended filler={actualData} />
              </Packages>
            </div>
          </div>
        );
      } else {
        router.replace(`/dashboard/${data.data.userName}`);
      }
    }
  }
}

export default InstructorPage;
