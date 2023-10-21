"use client";
import React from "react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { createData } from "@/apiservices/instructorapiservices";

function NewInstructorForm(props) {
  const userNameref = useRef();
  const instructorEmailref = useRef();
  const instructorPhoneref = useRef();
  const instructorBioref = useRef();
  const passwordref = useRef();
  const profileImageref = useRef();
  const isAdminref = useRef();
  const instructorradio1ref = useRef();
  const instructorradio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const userName = userNameref.current.value;
    const instructorEmail = instructorEmailref.current.value;
    const instructorPhone = instructorPhoneref.current.value;
    const instructorBio = instructorBioref.current.value;
    const password = passwordref.current.value;
    const profileImage = profileImageref.current.value;
    const isAdmin = isAdminref.current.value;

    const instructorradio1 = instructorradio1ref.current.checked;
    const instructorradio2 = instructorradio2ref.current.checked;
    const status = instructorradio1
      ? "active"
      : instructorradio2
      ? "inactive"
      : "inactive";

    const res = await createData(
      userName,
      instructorEmail,
      instructorPhone,
      instructorBio,
      status,
      isAdmin,
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
        <label htmlFor="userNameref">Enter Instructor Username (unique):</label>
        <input
          ref={userNameref}
          className="input-post-type"
          type="text"
          id="userNameref"
          name="userNameref"
          placeholder="Enter Instructor Username (unique)"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="instructorEmailref">
          Enter Instructor Email Address (Unique):
        </label>
        <input
          ref={instructorEmailref}
          className="input-post-type"
          type="text"
          id="clientEmailref"
          name="instructorEmailref"
          placeholder="Enter Client Email Address (Unique)"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="instructorPhoneref">Enter Instructor Phone Number:</label>
        <input
          ref={instructorPhoneref}
          className="input-post-type"
          type="number"
          id="clientPhoneref"
          name="instructorPhoneref"
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
        <label htmlFor="isAdminref">Admin Role:</label>
        <select
          ref={isAdminref}
          className="input-post-type"
          id="isAdminref"
          name="isAdminref"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <div className="input-type">
        <label htmlFor="instructorBioref">Bio:</label>
        <textarea
          ref={instructorBioref}
          id="instructorBioref"
          name="instructorBioref"
          className="input-post-type"
          rows="1"
          placeholder="Enter Instructor BIO"
        ></textarea>
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
            ref={instructorradio1ref}
            type="radio"
            value="Active"
            id="instructorradio1ref"
            name="instructorradio2ref"
            className="form-check-input mt-1 mr-2"
          />
          <label htmlFor="instructorradio1ref">Active</label>
        </div>
        <div className="form-check">
          <input
            ref={instructorradio2ref}
            type="radio"
            value="Inactive"
            id="instructorradio2ref"
            name="instructorradio2ref"
            className="form-check-input mt-1 mr-2"
          />
          <label htmlFor="instructorradio2ref">Inactive</label>
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

export default NewInstructorForm;
