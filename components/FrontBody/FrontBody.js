"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { setInitialData as setinitialPosts } from "@/app/redux/features/postFilter/postFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";
import { selectDataPublic as selectPackages } from "@/apiservices/travelpackageapiservices";
import { selectDataPublic as selectWidgets } from "@/apiservices/widgetapiservices";
import { selectDataPublic as selectPosts } from "@/apiservices/postapiservices";
import SinglePackage from "@/Packages/singlePackage";

function FrontBody({ children }) {
  const [admin, setAdmin] = useState();
  const [frontWidget, setFrontWidget] = useState();

  const dispatch = useDispatch();

  const filteredPackageData = useSelector(
    (state) => state.instructorFilter.value
  );
  const filteredPostData = useSelector((state) => state.postFilter.value);

  useEffect(() => {
    async function settingData() {
      try {
        const dataArray = await selectPackages({
          activeStatus: "active",
          packageType: "package",
        });
        const dataArray2 = await selectWidgets({
          activeStatus: "active",
        });
        const dataArray3 = await selectPosts({
          activeStatus: "active",
        });

        dispatch(setInitialData(dataArray.data));
        dispatch(setinitialPosts(dataArray3.data));
        setFrontWidget(dataArray2.data);
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
  }, []);

  function niceDate(date) {
    var isoTime = date;
    var date = new Date(isoTime);

    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  if (filteredPackageData && frontWidget && filteredPostData) {
    let front_client_instructor = frontWidget.find(
      (item) => item.widgetName == "front_client_instructor"
    ).widgetPayload;
    let about_us = frontWidget.find(
      (item) => item.widgetName == "about_us"
    ).widgetPayload;

    return (
      <div style={{ overflowX: "hidden" }} className="container-custom">
        <div
          style={{ marginTop: "0px", paddingTop: "100px" }}
          className="section-front-res section-front"
        >
          <div className="p-0 p-md-5 text-center">
            <h1 className="mb-3 got_an">
              Got an adventure in mind? Look no further. We partner guides and
              clients for whatever experience takes your fancy.
            </h1>
          </div>
          <div className="slide" data-anchor="slide1">
            <div className="row px-2 px-md-5 row-cols-1 row-cols-md-2">
              {front_client_instructor.map((item, i) => (
                <div
                  key={i}
                  className="col px-4 px-md-5 mb-5 mb-md-0 animate__animated animate__backInLeft"
                >
                  <Link href={item.link}>
                    <div
                      style={{
                        background: `url("${item.image}")`,
                        backgroundPosition: "10% 20%",
                      }}
                      className="card-front-sec card bg-dark text-white"
                    >
                      <div className="card-img-overlay">
                        <div className="overlay-image-div">
                          <h1
                            style={{
                              textAlign: "center",
                              marginBottom: "10px",
                              color: "#000",
                            }}
                            className="card-title"
                          >
                            {item.title}
                          </h1>
                          <h5
                            style={{
                              textAlign: "center",
                              color: "#000",
                              padding: "0 10%",
                            }}
                            className="card-text"
                          >
                            {item.description}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-front px-4 px-md-5">
          <div className="p-0 p-md-5 text-center">
            <h1 className="mb-3">Most Popular Choices</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2 g-md-4 px-0 px-sm-2 px-md-5">
            {filteredPackageData.slice(0, 8).map((item, i) => (
              <SinglePackage key={i} items={item} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "60px",
              marginTop: "50px",
            }}
            className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 px-2 px-md-5"
          >
            <button style={{ height: "100%" }} className="btn btn-info">
              <Link style={{ color: "#fff" }} href="/travels">
                More Travel Packages ...
              </Link>
            </button>
          </div>
        </div>

        <div className="section-front px-4 px-md-5">
          <div className="p-4 text-center">
            <h1 className="mb-3">About Us</h1>
          </div>
          <section className="service-categories text-xs-center px-0 px-md-5">
            <div className="row">
              {about_us.map((item, i) => (
                <div key={i} className="col-12">
                  <div className="parallax-about">
                    <h2 style={{ textAlign: "justify" }} className="mb-3">
                      {item.text}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div
          style={{ marginBottom: "200px" }}
          className="section-front px-4 px-md-5"
        >
          <div style={{ marginTop: "100px" }} className="px-5 py-5 text-center">
            <h1 className="mb-3">Our Blogs</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-5 px-2 px-md-5">
            {filteredPostData.slice(0, 4).map((item, i) => (
              <div key={i} className="col">
                <div className="card h-100">
                  <img
                    src={item.postImageLink}
                    className="card-img-top"
                    alt="Skyscrapers"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.postTitle.en}</h5>
                    <p className="card-text">
                      {item.postDescription.en.substring(0, 80)}
                    </p>
                    <Link href={`/posts/${item.postId}`}>Read More ... </Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Last updated: {niceDate(item.postUpdatedDate)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "60px",
              marginTop: "50px",
            }}
            className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 px-2 px-md-5"
          >
            <button style={{ height: "100%" }} className="btn btn-info">
              <Link style={{ color: "#fff" }} href="/posts">
                More Blogs ...
              </Link>
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  } else {
    return <div>loading ...</div>;
  }
}

export default FrontBody;
