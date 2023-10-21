"use client";
import React from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { BsBoxArrowDown } from "react-icons/bs";
import { selectData, deleteData } from "@/apiservices/postapiservices";
import { useEffect, useState } from "react";
import myToast from "@/components/toast/toast";

function PostCard(props) {
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
                  src={item.postImageLink}
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
                  {new Date(item.postCreatedDate).toLocaleDateString()}
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
                  {new Date(item.postUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.postTitle.en}</h5>
                </a>

                <p className="item-display-p"> Post Id: {item.postId}</p>
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
                <p className="item-display-p"> Post User: {item.postUser}</p>
                <p className="item-display-p">
                  {" "}
                  Category: {item.postCategory.en}
                </p>

                <p className="item-display-p">
                  {" "}
                  Popularity: {item.postPopularity.en}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Description
                </h5>
                <p className="item-display-p-overflow">
                  {item.postDescription.en}
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
                  src={item.postImageLink}
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
                  {new Date(item.postCreatedDate).toLocaleDateString()}
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
                  {new Date(item.postUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.postTitle.en}</h5>
                </a>

                <p className="item-display-p"> Post Id: {item.postId}</p>
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
                <p className="item-display-p"> Post User: {item.postUser}</p>
                <p className="item-display-p">
                  {" "}
                  Category: {item.postCategory.en}
                </p>

                <p className="item-display-p">
                  {" "}
                  Popularity: {item.postPopularity.en}
                </p>

                <h5 style={{ color: "red" }} className="item-display-p">
                  Description
                </h5>
                <p className="item-display-p-overflow">
                  {item.postDescription.en}
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

export default PostCard;
