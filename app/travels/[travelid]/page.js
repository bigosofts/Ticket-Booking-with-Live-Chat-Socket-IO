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
        <div
          style={{ marginBottom: "-100px" }}
          className="travelpage-container"
        >
          <HeaderFront scrolledStatus={scrolled} />
          <SingleSlider filler={singleData} />
          <section className="Title-single-travel">
            <div className="container-single-travel">
              <div className="left-single-travel-item">
                <div className="wrapper-single-title">
                  <h2>{singleData.place}</h2>
                  <p>
                    <span className="map-marker-single">
                      <i className="fa fa-map-marker"></i>
                    </span>{" "}
                    {singleData.country}
                  </p>
                </div>
              </div>
              <div className="right-single-travel-item">
                <div className="wrapper-single-title">
                  <div className="round-icon-div">
                    <span className="round-icon-design">
                      <i className="fa fa-calendar"></i>
                    </span>
                  </div>
                  <div className="single-travel-div">
                    <p>Time of Year</p>
                    <h3>{singleData.travelTimeTwo}</h3>
                  </div>
                </div>
                <div className="wrapper-single-title">
                  <div className="round-icon-div">
                    <span className="round-icon-design">
                      <i className="fa fa-money"></i>
                    </span>
                  </div>
                  <div className="single-travel-div">
                    <p>Average Price</p>
                    <h3>${singleData.price}</h3>
                  </div>
                </div>
                <div className="wrapper-single-title">
                  <div className="round-icon-div">
                    <span className="round-icon-design">
                      <i className="fa fa-gear"></i>
                    </span>
                  </div>
                  <div className="single-travel-div">
                    <p>Difficulty</p>
                    <h3>{singleData.difficulty}</h3>
                  </div>
                </div>
                <div className="wrapper-single-title">
                  <div className="round-icon-div">
                    <span className="round-icon-design">
                      <i className="fa fa-road"></i>
                    </span>
                  </div>
                  <div className="single-travel-div">
                    <p>Activity</p>
                    <h3>{singleData.activity}</h3>
                  </div>
                </div>
                <div className="wrapper-single-title">
                  <div className="round-icon-div">
                    <span className="round-icon-design">
                      <i className="fa fa-clock-o"></i>
                    </span>
                  </div>
                  <div className="single-travel-div">
                    <p>Duration</p>
                    <h3>{singleData.duration} days</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="full_container">
              <div className="container-travel-page fix port">
                <div
                  style={{ overflow: "unset", height: "unset" }}
                  className="blog4"
                >
                  <div className="news_item">
                    <ImageCarousel filler={singleData} />
                    <h2>{singleData.packageTitle}</h2>

                    {richtextoutput(singleData.travelDescription)}

                    <Accordion filler={singleData} />

                    <div className="sidebar-travelpage">
                      <div className="visibility-sidebar2">
                        <BookingInfoCard filler={singleData} />
                      </div>
                    </div>

                    <div
                      style={{ borderTop: "10px solid rgb(229 229 229)" }}
                      className="comments-form"
                    >
                      <ReviewGrid filler={singleData} />

                      <div
                        style={{
                          borderTop: "10px solid rgb(229 229 229)",
                          margin: "0px -40px 0px -40px",
                          padding: "20px 40px 0px 40px",
                        }}
                        className="group-title"
                      >
                        <h4>Leave A Comments</h4>
                      </div>
                      <form>
                        <div className="cont">
                          <div className="stars">
                            <input
                              class="star star-5"
                              id="star-5"
                              type="radio"
                              name="star"
                              ref={radio5ref}
                              onClick={() => myfunction(5)}
                            />
                            <label class="star star-5" for="star-5"></label>
                            <input
                              class="star star-4"
                              id="star-4"
                              type="radio"
                              name="star"
                              ref={radio4ref}
                              onClick={() => myfunction(4)}
                            />
                            <label class="star star-4" for="star-4"></label>
                            <input
                              class="star star-3"
                              id="star-3"
                              type="radio"
                              name="star"
                              ref={radio3ref}
                              onClick={() => myfunction(3)}
                            />
                            <label class="star star-3" for="star-3"></label>
                            <input
                              class="star star-2"
                              id="star-2"
                              type="radio"
                              name="star"
                              ref={radio2ref}
                              onClick={() => myfunction(2)}
                            />
                            <label class="star star-2" for="star-2"></label>
                            <input
                              class="star star-1"
                              id="star-1"
                              type="radio"
                              name="star"
                              ref={radio1ref}
                              onClick={() => myfunction(1)}
                            />
                            <label class="star star-1" for="star-1"></label>
                          </div>
                          <br></br>
                          <br></br>

                          <h3
                            id="msg1"
                            style={
                              !visible1
                                ? { display: "none" }
                                : { display: "block" }
                            }
                          >
                            Thank you! We'd be grateful if you could give us a
                            short review
                          </h3>
                          <h3
                            id="msg2"
                            style={
                              !visible2
                                ? { display: "none" }
                                : { display: "block" }
                            }
                          >
                            Sorry your experience hasn't been the best
                          </h3>

                          <br></br>
                          <br></br>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <textarea
                              name="message"
                              placeholder="Message"
                              ref={msgref}
                              required=""
                            ></textarea>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              ref={naameref}
                              required=""
                            />
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <button
                              onClick={onSubmitHandler}
                              type="submit"
                              className="theme-btn"
                            >
                              Send Comments
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <div className="pagination">
            <a href="#">
              <img width="32px" height="32px" src="/images/prev1.png" alt="" />
            </a>
            <a href="blog.html">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">
              <img width="32px" height="32px" src="/images/next1.png" alt="" />
            </a>
          </div> */}
                </div>

                <div className="sidebar-travelpage">
                  <div className="visibility-sidebar">
                    <BookingInfoCard filler={singleData} />
                  </div>

                  {/* <div
                    style={{
                      width: "80%",
                      height: "80px",
                      margin:"auto"
                    }}
                    className="d-grid gap-2 book-button"
                  >
                    {singleData.packageType == "custom" &&
                    adminData.data.userRole == "client" ? (
                      ""
                    ) : singleData.packageType == "custom" &&
                      adminData.data.userRole == "instructor" ? (
                      <button
                        onClick={() => SendMsgRequest(singleData)}
                        style={{ fontSize: "20px" }}
                        className="btn btn-primary"
                        type="button"
                      >
                        Request Message for Order
                      </button>
                    ) : singleData.packageType == "package" &&
                      adminData.data.userRole == "client" ? (
                      <button
                        onClick={() => sendMessage(singleData)}
                        style={{ fontSize: "20px" }}
                        className="btn btn-primary"
                        type="button"
                      >
                        Talk Guide to Order
                      </button>
                    ) : singleData.packageType == "package" &&
                      adminData.data.userRole == "instructor" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => sendMessage(singleData)}
                        style={{ fontSize: "20px" }}
                        className="btn btn-primary"
                        type="button"
                      >
                        Talk Guide to Order
                      </button>
                    )}
                    <button
                      onClick={() => orderCreate(singleData)}
                      style={{ fontSize: "20px" }}
                      className="btn btn-primary"
                     type="button"
                     >
                      {bookLoad ? "Ordered" : "Book Now"}
                     </button>
                  </div> */}

                  <div
                    style={{ width: "80%", margin: "auto" }}
                    className="recent"
                  >
                    <h2
                      style={{
                        paddingTop: "20px",
                        marginTop: "50px",
                        marginBottom: "40px",
                      }}
                    >
                      Other adventures
                    </h2>
                    {presetPackage.slice(0, 3).map((item, i) => (
                      <div key={i} className="images">
                        <img src={item.travelImage[0]} alt="" />
                        <a href="#">{item.packageTitle}</a>
                        <p>
                          {item.place}, {item.country}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{ width: "80%", margin: "auto" }}
                    className="tags"
                  >
                    <h2>Tags</h2>
                    {presetPackage.slice(0, 6).map((item, i) => (
                      <Link key={i} href={`/travels/${item.packageId}`}>
                        {item.packageId}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div onClick={goBack} className="floating-back-button">
          <i className="fa fa-arrow-left" aria-hidden="true">
            {" "}
            Back{" "}
          </i>
        </div>
        <FrontFooter />
      </>
    );
  } else {
    return <Loader />;
  }
}

export default SingleTravelPage;
