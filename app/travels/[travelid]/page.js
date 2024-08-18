"use client";
import Accordion from "@/components/AccordionSingle/Accordion";
import { useState, useEffect, useRef } from "react";
import "@/assets/css/travels.css";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import FrontFooter from "@/components/FrontFooter/FrontFooter";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import BookingInfoCard from "@/components/BookingInfoCard/BookingInfoCard";
import { selectDataPublic } from "@/apiservices/travelpackageapiservices";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitialData,
  queryFilter,
} from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import ReviewGrid from "@/components/ReviewGrid/ReviewGrid";
import mytoast from "@/components/toast/toast";
import Link from "next/link";
import { getToken } from "@/helper/sessionHelper";
// import {
//   createData as createConversations,
//   selectAllData as selectConversations,
// } from "@/apiservices/conversationapiservices";
import { useRouter } from "next/navigation";
import SingleSlider from "@/components/SingleSlider/SingleSlider";
import Loader from "@/components/loader/Loader";

function SingleTravelPage({ params }) {
  function goBack() {
    history.back();
  }
  const router = useRouter();
  // async function SendMsgRequest(Data) {
  //   if (adminData.status == "noToken") {
  //     mytoast.danger("You need to login to start Messaging");
  //   } else {
  //     let conversationID = Data.createdUser + adminData.data.userName;

  //     const resC = await selectConversations(
  //       { conversationID: conversationID },
  //       { conversationID: true }
  //     );
  //     if (resC.data.length > 0) {
  //       mytoast.warning("Conversation already created. Go to message");
  //     } else {
  //       let res = await createConversations(
  //         conversationID,
  //         Data.createdUser,
  //         Data.createdUserType,
  //         adminData.data.userName,
  //         adminData.data.userRole,
  //         Data.packageId
  //       );

  //       if (res) {
  //         if (res.status == "Success") {
  //           mytoast.success("Request Accepted");
  //           setTimeout(() => {
  //             router.push(`/dashboard/${adminData.data.userName}/setting`);
  //           }, 2000);
  //         } else {
  //           mytoast.warning("Something Went Wrong, See console");
  //           console.log(res);
  //         }
  //       }
  //     }
  //   }
  // }
  // async function sendMessage(Data) {
  //   if (adminData.status == "noToken") {
  //     mytoast.danger("You need to login to start Messaging");
  //   } else {
  //     let conversationID = adminData.data.userName + Data.createdUser;
  //     const resC = await selectConversations(
  //       { conversationID: conversationID },
  //       { conversationID: true }
  //     );
  //     if (resC.data.length > 0) {
  //       mytoast.warning("Conversation already created. Go to message");
  //     } else {
  //       let res = await createConversations(
  //         conversationID,
  //         adminData.data.userName,
  //         adminData.data.userRole,
  //         Data.createdUser,
  //         Data.createdUserType,
  //         Data.packageId
  //       );

  //       if (res) {
  //         if (res.status == "Success") {
  //           mytoast.success("Request Accepted");
  //           setTimeout(() => {
  //             router.push(`/dashboard/${adminData.data.userName}/setting`);
  //           }, 2000);
  //         } else {
  //           mytoast.warning("Something Went Wrong, See console");
  //           console.log(res);
  //         }
  //       }
  //     }
  //   }
  // }

  const adminData = getToken("token_travel");
  const [presetPackage, setPresetPackage] = useState();
  const [bookLoad, setBookLoad] = useState(false);

  const naameref = useRef();
  const msgref = useRef();

  const radio1ref = useRef();
  const radio2ref = useRef();
  const radio3ref = useRef();
  const radio4ref = useRef();
  const radio5ref = useRef();

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const dispatch = useDispatch();

  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );

  let singleData = filteredPackageData ? filteredPackageData[0] : "";

  async function onSubmitHandler(e) {
    e.preventDefault();

    let name = naameref.current.value;
    let msg = msgref.current.value;
    let radio1 = radio1ref.current.checked;
    let radio2 = radio2ref.current.checked;
    let radio3 = radio3ref.current.checked;
    let radio4 = radio4ref.current.checked;
    let radio5 = radio5ref.current.checked;
    let countNumber = radio1
      ? 1
      : radio2
      ? 2
      : radio3
      ? 3
      : radio4
      ? 4
      : radio5
      ? 5
      : 5;

    let jjData = { ...singleData };

    if (jjData) {
      let reviewsCopy = [...jjData.reviews];

      let newObj = {
        commentedUser: name,
        reviewStarCount: countNumber,
        commentBody: msg,
        createdDate: new Date(Date.now()).toISOString(),
        activeStatus: false,
      };

      reviewsCopy.push(newObj);

      // Update jjData with the modified reviewsCopy
      jjData.reviews = reviewsCopy;

      let res = await fetch("/apis/v1/update-package", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jjData),
      });

      if (res) {
        console.log(res);
        mytoast.success("Comment was uploaded");
      }
    }
  }

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

  function myfunction(id) {
    if (id > 3) {
      setVisible1(true);
      setVisible2(false);
    } else {
      setVisible1(false);
      setVisible2(true);
    }
  }

  function unique(payload) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    const millisecond = currentDate.getMilliseconds();
    let uniqueNumber = `${payload.packageId}${year}${month}${date}${hour}${minute}${second}${millisecond}`;

    return uniqueNumber;
  }

  function richtextoutput(text) {
    return (
      <div
        className="richtext"
        style={{ width: "90%", textAlign: "justify", margin: "0 auto" }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
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
