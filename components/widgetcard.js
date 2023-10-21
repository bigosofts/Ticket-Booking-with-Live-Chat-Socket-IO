"use client";
import React from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { BsBoxArrowDown } from "react-icons/bs";
import { selectData, deleteData } from "@/apiservices/widgetapiservices";
import { useEffect, useState } from "react";
import myToast from "@/components/toast/toast";
import ReactHighlightSyntax from "react-highlight-syntax";

function WidgetCard(props) {
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
            <div key={i} className="post-loop-package-div">
              <div className="image-wrapper">
              <a href="#">
                <img
                  className="post-image-size"
                  src="/images/demo3.jpg"
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

              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">
                    Widget Name: {item.widgetName}
                  </h5>
                </a>
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
                <h5 style={{ color: "red" }} className="item-display-p">
                  Widget Payload:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.widgetPayload)}
                </ReactHighlightSyntax>
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
            <div key={i} className="post-loop-package-div">
              <div className="image-wrapper">
              <a href="#">
                <img
                  className="post-image-size"
                  src="/images/demo3.jpg"
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

              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">
                    Widget Name: {item.widgetName}
                  </h5>
                </a>
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
                <h5 style={{ color: "red" }} className="item-display-p">
                  Widget Payload:
                </h5>
                <ReactHighlightSyntax
                  language={"JavaScript"}
                  theme={"Base16Darcula"}
                  copy={true}
                  copyBtnTheme={"Dark"}
                  showLineNumbers={true}
                >
                  {JSON.stringify(item.widgetPayload)}
                </ReactHighlightSyntax>
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

export default WidgetCard;
