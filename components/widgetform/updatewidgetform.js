"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/widgetapiservices";
import { useState, useEffect } from "react";

function updateWidgetForm(props) {
  const [widget, setWidget] = useState({
    widgetName: props.payload.widgetName,
    widgetPayload: props.payload.widgetPayload,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setWidget({
      widgetName: props.payload.widgetName,
      widgetPayload: props.payload.widgetPayload,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.widgetName,
    props.payload.widgetPayload,
    props.payload.activeStatus,
  ]);

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
    const idValue = props.data;

    const res = await updateData(
      widgettitle,
      widgetpayloadParsed,
      status,
      idValue
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };
  const onChangeHandler1 = (e) => {
    setWidget({
      widgetName: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setWidget({
      widgetpayloadParsed: e.target.value,
    });
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="widgettitleref">Package ID:</label>
        <input
          ref={widgettitleref}
          onChange={onChangeHandler1}
          value={widget.widgetName}
          className="input-post-type"
          type="text"
          name="widgettitleref"
          placeholder="Enter widget title"
        ></input>
      </div>
      <div>
        <label htmlFor="widgetpayloadref">Widget Payload:</label>
        <textarea
          ref={widgetpayloadref}
          onChange={onChangeHandler2}
          value={JSON.stringify(widget.widgetPayload)}
          id="widgetpayloadref"
          name="widgetpayloadref"
          rows="1"
          className="input-post-type"
          placeholder="Enter Widget payload object here"
        ></textarea>
      </div>

      <div className="flex-item-center">
        {props.payload.activeStatus == "active" ? (
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
        ) : (
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
        )}

        {props.payload.activeStatus == "inactive" ? (
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
        ) : (
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
        )}
      </div>

      <button
        onClick={clickHandler}
        className="button-add-new"
        style={{ width: "33.33%" }}
      >
        Update Data{" "}
        <span className="px-1">
          <BiBrush size={23} />
        </span>
      </button>
    </form>
  );
}

export default updateWidgetForm;
