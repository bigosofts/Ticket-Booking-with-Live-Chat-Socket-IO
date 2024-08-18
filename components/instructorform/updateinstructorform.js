"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/instructorapiservices";
import { useState, useEffect } from "react";

function updatePostForm(props) {
  const [instructors, setInstructors] = useState({
    userName: props.payload.userName,
    instructorEmail: props.payload.instructorEmail,
    instructorPhone: props.payload.instructorPhone,
    instructorBio: props.payload.instructorBio,
    password: props.payload.password,
    profileImage: props.payload.profileImage,
    isAdmin: props.payload.isAdmin,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setInstructors({
      userName: props.payload.userName,
      instructorEmail: props.payload.instructorEmail,
      instructorPhone: props.payload.instructorPhone,
      instructorBio: props.payload.instructorBio,
      password: props.payload.password,
      profileImage: props.payload.profileImage,
      isAdmin: props.payload.isAdmin,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.userName,
    props.payload.instructorEmail,
    props.payload.instructorPhone,
    props.payload.instructorBio,
    props.payload.password,
    props.payload.profileImage,
    props.payload.isAdmin,
    props.payload.activeStatus,
  ]);

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
    const idValue = props.data;

    const res = await updateData(
      idValue,
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
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };
  const onChangeHandler1 = (e) => {
    setInstructors({
      userName: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setInstructors({
      instructorEmail: e.target.value,
    });
  };
  const onChangeHandler3 = (e) => {
    setInstructors({
      instructorPhone: e.target.value,
    });
  };
  const onChangeHandler4 = (e) => {
    setInstructors({
      instructorBio: e.target.value,
    });
  };

  const onChangeHandler8 = (e) => {
    setInstructors({
      profileImage: e.target.value,
    });
  };

  const onChangeHandler10 = (e) => {
    setInstructors({
      isAdmin: e.target.value,
    });
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="userNameref">Enter Instructor Username (unique):</label>
        <input
          onChange={onChangeHandler1}
          ref={userNameref}
          className="input-post-type"
          type="text"
          name="userNameref"
          placeholder="Enter Unique userName"
          value={instructors.userName}
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="instructorEmailref">
          Enter Instructor Email Address (Unique):
        </label>
        <input
          onChange={onChangeHandler2}
          ref={instructorEmailref}
          className="input-post-type"
          type="text"
          name="instructorEmailref"
          placeholder="Enter Instructor Email Address"
          value={instructors.instructorEmail}
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="instructorPhoneref">
          Enter Instructor Phone Number:
        </label>
        <input
          onChange={onChangeHandler3}
          ref={instructorPhoneref}
          className="input-post-type"
          type="text"
          name="instructorPhoneref"
          placeholder="Enter Instructor Phone number"
          value={instructors.instructorPhone}
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="passwordref">Enter Password:</label>
        <input
          ref={passwordref}
          className="input-post-type"
          type="password"
          name="passwordref"
          placeholder="Enter your password"
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="profileImageref">Enter images link:</label>
        <input
          onChange={onChangeHandler8}
          ref={profileImageref}
          className="input-post-type"
          type="text"
          name="profileImageref"
          placeholder="Enter profile Image Link"
          value={instructors.profileImage}
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="isAdminref">Admin Role:</label>
        <select
          ref={isAdminref}
          onChange={onChangeHandler10}
          value={instructors.isAdmin}
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
          onChange={onChangeHandler4}
          ref={instructorBioref}
          id="instructorBioref"
          name="instructorBioref"
          rows="1"
          className="input-post-type"
          placeholder="Enter post Description"
          value={instructors.instructorBio}
        ></textarea>
      </div>

      <div className="flex-item-center">
        {props.payload.activeStatus == "active" ? (
          <div className="form-check">
            <input
              ref={instructorradio1ref}
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
              ref={instructorradio1ref}
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
              ref={instructorradio2ref}
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input mt-1 mr-2"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
          </div>
        ) : (
          <div className="form-check">
            <input
              ref={instructorradio2ref}
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input mt-1 mr-2"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
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

export default updatePostForm;
