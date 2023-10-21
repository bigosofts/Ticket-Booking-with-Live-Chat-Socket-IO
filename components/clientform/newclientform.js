"use client";
import React from "react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { createData } from "@/apiservices/clientapiservices";

function NewClientForm(props) {
  const userNameref = useRef();
  const clientEmailref = useRef();
  const clientPhoneref = useRef();
  const passwordref = useRef();
  const profileImageref = useRef();
  const clientRadio1ref = useRef();
  const clientRadio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const userName = userNameref.current.value;
    const clientEmail = clientEmailref.current.value;
    const clientPhone = clientPhoneref.current.value;
    const password = passwordref.current.value;
    const profileImage = profileImageref.current.value;
    const clientRadio1 = clientRadio1ref.current.checked;
    const clientRadio2 = clientRadio2ref.current.checked;
    const status = clientRadio1
      ? "active"
      : clientRadio2
      ? "inactive"
      : "inactive";

    const res = await createData(
      userName,
      clientEmail,
      clientPhone,
      status,
      password,
      profileImage
    );

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
        <label htmlFor="userNameref">Enter Client Username (unique):</label>
        <input
          ref={userNameref}
          className="input-post-type"
          type="text"
          id="userNameref"
          name="userNameref"
          placeholder="Enter Client Username (unique)"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="clientEmailref">
          Enter Client Email Address (Unique):
        </label>
        <input
          ref={clientEmailref}
          className="input-post-type"
          type="text"
          id="clientEmailref"
          name="clientEmailref"
          placeholder="Enter Client Email Address (Unique)"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="clientPhoneref">Enter Client Phone Number:</label>
        <input
          ref={clientPhoneref}
          className="input-post-type"
          type="number"
          id="clientPhoneref"
          name="clientPhoneref"
          placeholder="Enter Client Phone Number"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="passwordref">Enter Password:</label>
        <input
          ref={passwordref}
          className="input-post-type"
          type="password"
          id="passwordref"
          name="passwordref"
          placeholder="Enter Password"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="profileImageref">Enter images link:</label>
        <input
          ref={profileImageref}
          className="input-post-type"
          type="text"
          id="profileImageref"
          name="profileImageref"
          placeholder="Enter images link"
        ></input>
      </div>

      <div className="flex-item-center">
        <div className="form-check">
          <input
            ref={clientRadio1ref}
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
            ref={clientRadio2ref}
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

export default NewClientForm;
