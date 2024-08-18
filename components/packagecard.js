"use client";
import React from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { BsBoxArrowDown } from "react-icons/bs";
import { selectData, deleteData } from "@/apiservices/travelpackageapiservices";
import { useEffect, useState } from "react";
import myToast from "@/components/toast/toast";
import ReactHighlightSyntax from "react-highlight-syntax";

function PackageCard(props) {
  const [hidden, sethidden] = useState(true);

  function showTab(_id) {
    if (!hidden) {
      document.getElementById(_id).classList.remove("hidden-card");
    } else {
      document.getElementById(_id).classList.add("hidden-card");
    }
    sethidden((prev) => !prev);
  }

  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const payload = await selectData(null, null);
      setData(payload);
    }
    fetchData();
  }, []);
  const updateHandler = props.updateHandler;

  const deleteHandler = (id) => {
    deleteData(id);
    myToast.danger(`item ${id} is deleted`);
    const updatedData = data.data.filter((item) => item._id !== id);
    const constructeddata = {
      status: "Alhamdulillah",
      data: updatedData,
    };
    setData(constructeddata);
  };
  if (props.fromupdateform) {
    return (
      <div className="container-new-form mt-10">
        <div className="grid-post-card">
          {props.fromupdateform.data.map((item, i) => (
            <div hey={i} className="post-loop-package-div">
              <div className="image-wrapper">
                <a href="#">
                  <img
                    className="post-image-size"
                    src={item.travelImage[0]}
                    alt=""
                  />
                </a>
              </div>
              <div className="status-container-post">
                {item.activeStatus == "active" ? (
                  <span className="green-status">Active</span>
                ) : (
                  <span className="red-status">Inactive</span>
                )}
              </div>
              <div className="absolute-post-card">
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Created at:{" "}
                  {new Date(item.packageCreatedDate).toLocaleDateString()}
                </div>
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Updated at:{" "}
                  {new Date(item.packageUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.packageTitle}</h5>
                </a>

                <p className="item-display-p"> Package ID: {item.packageId}</p>
                <p className="item-display-p">
                  {" "}
                  Package Type: {item.packageType}
                </p>
                <p className="item-display-p">
                  {" "}
                  Preset: {JSON.stringify(item.preset)}
                </p>
                <div className="flex-post-button">
                  <button
                    onClick={() =>
                      updateHandler(item._id, props.fromupdateform)
                    }
                    className="update-button-post"
                  >
                    <BiEdit size={24} />{" "}
                  </button>
                  <button
                    onClick={() => props.deleteHandler(item._id)}
                    className="delete-button-post"
                  >
                    {" "}
                    <BiTrashAlt size={24} />{" "}
                  </button>
                  <button
                    onClick={() => showTab(item._id)}
                    className="update-button-post animate__animated animate__bounce animate__repeat-20"
                  >
                    {" "}
                    <BsBoxArrowDown size={24} />{" "}
                  </button>
                </div>
              </div>

              <div
                id={item._id}
                style={{ marginTop: "-5px" }}
                className="post-item-package-5 hidden-card"
              >
                <p className="item-display-p">
                  {" "}
                  Created User: {item.createdUser}
                </p>
                <p className="item-display-p">
                  {" "}
                  Created UserType: {item.createdUserType}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Preset Users:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.presetUsers)}
                </ReactHighlightSyntax>
                <h5 style={{ color: "red" }} className="item-display-p">
                  Travel Images Array:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.travelImage)}
                </ReactHighlightSyntax>
                <h5 style={{ color: "red" }} className="item-display-p">
                  Reviews Array:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.reviews)}
                </ReactHighlightSyntax>

                <p className="item-display-p"> Country: {item.country}</p>
                <p className="item-display-p"> Activity: {item.activity}</p>
                <p className="item-display-p"> Difficulty: {item.difficulty}</p>
                <p className="item-display-p"> Price: {item.price}</p>
                <p className="item-display-p">
                  {" "}
                  Maximum Price: {item.maxPrice}
                </p>
                <p className="item-display-p">
                  {" "}
                  Duration: {item.duration} days
                </p>
                <p className="item-display-p"> place: {item.place}</p>
                <p className="item-display-p">
                  {" "}
                  Travel time: {new Date(item.travelTime).toLocaleDateString()}
                </p>
                <p className="item-display-p">
                  {" "}
                  Second Travel time:{" "}
                  {new Date(item.travelTimeTwo).toLocaleDateString()}
                </p>
                
                <p className="item-display-p">
                  {" "}
                  Have Pevious Experience:{" "}
                  {JSON.stringify(item.previousExperience)}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Equipment:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.equipment)}
                </ReactHighlightSyntax>

                <p className="item-display-p">
                  {" "}
                  Have Guiding: {JSON.stringify(item.haveGuiding)}
                </p>
                <p className="item-display-p">
                  {" "}
                  Have Accomodation: {JSON.stringify(item.haveAccomodation)}
                </p>
                <p className="item-display-p">
                  {" "}
                  Have Food: {JSON.stringify(item.haveFood)}
                </p>
                <p className="item-display-p"> Group Size: {item.groupSize}</p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Description
                </h5>
                <p className="item-display-p-overflow">
                  {item.travelDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (data) {
    return (
      <div className="container-new-form mt-10">
        <div className="grid-post-card">
          {data.data.map((item, i) => (
            <div hey={i} className="post-loop-package-div">
              <div className="image-wrapper">
                <a href="#">
                  <img
                    className="post-image-size"
                    src={item.travelImage[0]}
                    alt=""
                  />
                </a>
              </div>
              <div className="status-container-post">
                {item.activeStatus == "active" ? (
                  <span className="green-status">Active</span>
                ) : (
                  <span className="red-status">Inactive</span>
                )}
              </div>
              <div className="absolute-post-card">
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Created at:{" "}
                  {new Date(item.packageCreatedDate).toLocaleDateString()}
                </div>
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Updated at:{" "}
                  {new Date(item.packageUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.packageTitle}</h5>
                </a>

                <p className="item-display-p"> Package ID: {item.packageId}</p>
                <p className="item-display-p">
                  {" "}
                  Package Type: {item.packageType}
                </p>
                <p className="item-display-p">
                  {" "}
                  Preset: {JSON.stringify(item.preset)}
                </p>
                <div className="flex-post-button">
                  <button
                    onClick={() => updateHandler(item._id, data)}
                    className="update-button-post"
                  >
                    <BiEdit size={24} />{" "}
                  </button>
                  <button
                    onClick={() => deleteHandler(item._id)}
                    className="delete-button-post"
                  >
                    {" "}
                    <BiTrashAlt size={24} />{" "}
                  </button>
                  <button
                    onClick={() => showTab(item._id)}
                    className="update-button-post animate__animated animate__bounce animate__repeat-20"
                  >
                    {" "}
                    <BsBoxArrowDown size={24} />{" "}
                  </button>
                </div>
              </div>

              <div
                id={item._id}
                style={{ marginTop: "-5px" }}
                className="post-item-package-5 hidden-card"
              >
                <p className="item-display-p">
                  {" "}
                  Created User: {item.createdUser}
                </p>
                <p className="item-display-p">
                  {" "}
                  Created UserType: {item.createdUserType}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Preset Users:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.presetUsers)}
                </ReactHighlightSyntax>
                <h5 style={{ color: "red" }} className="item-display-p">
                  Travel Images Array:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.travelImage)}
                </ReactHighlightSyntax>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Reviews Array:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.reviews)}
                </ReactHighlightSyntax>

                <p className="item-display-p"> Country: {item.country}</p>
                <p className="item-display-p"> Activity: {item.activity}</p>
                <p className="item-display-p"> Difficulty: {item.difficulty}</p>
                <p className="item-display-p"> Price: {item.price}</p>
                <p className="item-display-p">
                  {" "}
                  Maximum Price: {item.maxPrice}
                </p>
                <p className="item-display-p">
                  {" "}
                  Duration: {item.duration} days
                </p>
                <p className="item-display-p"> place: {item.place}</p>
                <p className="item-display-p">
                  {" "}
                  Travel time: {new Date(item.travelTime).toLocaleDateString()}
                </p>
                <p className="item-display-p">
                  {" "}
                  Second Travel time:{" "}
                  {new Date(item.travelTimeTwo).toLocaleDateString()}
                </p>
               
                <p className="item-display-p">
                  {" "}
                  Have Pevious Experience:{" "}
                  {JSON.stringify(item.previousExperience)}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Equipment:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.equipment)}
                </ReactHighlightSyntax>

                <p className="item-display-p">
                  {" "}
                  Have Guiding: {JSON.stringify(item.haveGuiding)}
                </p>
                <p className="item-display-p">
                  {" "}
                  Have Accomodation: {JSON.stringify(item.haveAccomodation)}
                </p>
                <p className="item-display-p">
                  {" "}
                  Have Food: {JSON.stringify(item.haveFood)}
                </p>
                <p className="item-display-p"> Group Size: {item.groupSize}</p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Description
                </h5>
                <p className="item-display-p-overflow">
                  {item.travelDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default PackageCard;
