"use client";
import React from "react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { createData } from "@/apiservices/widgetapiservices";

function NewWidgetForm(props) {
  const widgettitleref = useRef();
  const widgetpayloadref = useRef();
  const widgetradio1ref = useRef();
  const widgetradio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const widgettitle = widgettitleref.current.value;
    const widgetpayload = widgetpayloadref.current.value;
    const widgetpayloadParsed = JSON.parse(widgetpayload);
    const widgetradio1 = widgetradio1ref.current.checked;
    const widgetradio2 = widgetradio2ref.current.checked;
    const status = widgetradio1
      ? "active"
      : widgetradio2
      ? "inactive"
      : "inactive";

    const res = await createData(widgettitle, widgetpayloadParsed, status);

    if (res) {
      props.statechanger();
      myToast.success("Data was created successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="widgettitleref">Widget Title:</label>
        <input
          ref={widgettitleref}
          className="input-post-type"
          type="text"
          name="widgettitleref"
          placeholder="Enter widget title"
        ></input>
      </div>
      <div>
        <label htmlFor="widgetpayloadref">payload Array:</label>
        <textarea
          ref={widgetpayloadref}
          id="widgetpayloadref"
          name="widgetpayloadref"
          rows="1"
          className="input-post-type"
          placeholder="Enter Widget payload object here"
        ></textarea>
      </div>

      <div className="flex-item-center">
        <div className="form-check">
          <input
            ref={widgetradio1ref}
            type="radio"
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input mt-1 mr-2"
          />
          <label htmlFor="radioDefault1">Active</label>
        </div>
        <div className="form-check">
          <input
            ref={widgetradio2ref}
            type="radio"
            value="Inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input mt-1 mr-2"
          />
          <label htmlFor="radioDefault2">Inactive</label>
        </div>
      </div>

      <button
        onClick={clickHandler}
        className="button-add-new"
        style={{ width: "33.33%" }}
      >
        Add Data{" "}
        <span className="px-1">
          <BiPlus size={23} />
        </span>
      </button>
    </form>
  );
}

export default NewWidgetForm;
