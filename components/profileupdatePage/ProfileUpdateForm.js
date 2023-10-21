"use client";
import React, { useState, useEffect, useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/clientapiservices";
import { updateData as updateInstructor } from "@/apiservices/instructorapiservices";
import { getToken } from "@/helper/sessionHelper";

function ProfileUpdateForm(props) {
  const [clients, setClients] = useState();

  useEffect(() => {
    const data = getToken("token_travel");
    const userData = data.data;

    if (userData.userRole == "client") {
      setClients({
        activeStatus: userData.activeStatus,
        clientCreatedDate: userData.clientCreatedDate,
        clientEmail: userData.clientEmail,
        clientPhone: userData.clientPhone,
        clientUpdatedDate: userData.clientUpdatedDate,
        isAdmin: userData.isAdmin,
        profileImage: userData.profileImage,
        userName: userData.userName,
        userRole: userData.userRole,
        _id: userData._id,
      });
    } else if (userData.userRole == "instructor") {
      setClients({
        activeStatus: userData.activeStatus,
        instructorBio: userData.instructorBio,
        instructorCreatedDate: userData.instructorCreatedDate,
        instructorEmail: userData.instructorEmail,
        instructorPhone: userData.instructorPhone,
        instructorUpdatedDate: userData.instructorUpdatedDate,
        isAdmin: userData.isAdmin,
        profileImage: userData.profileImage,
        userName: userData.userName,
        userRole: userData.userRole,
        _id: userData._id,
      });
    }
  }, []);
  //client ref
  const clientEmailref = useRef();
  const clientPhoneref = useRef();
  const passwordref = useRef();
  const profileImageref = useRef();

  //instructor ref

  const instructorEmailref = useRef();
  const instructorPhoneref = useRef();
  const instructorBioref = useRef();
  const passwordref2 = useRef();
  const profileImageref2 = useRef();

  //client clickhandler
  const clickHandler = async (e) => {
    e.preventDefault();

    const clientEmail = clientEmailref.current.value;
    const clientPhone = clientPhoneref.current.value;
    const password = passwordref.current.value;
    const profileImage = profileImageref.current.value;
    const idValue = clients._id; // Changed to props.payload._id

    const res = await updateData(
      idValue,
      clients.userName,
      clientEmail,
      clientPhone,
      clients.activeStatus,
      password,
      profileImage
    );

    if (res) {
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };

  //instructor clickHandler
  const clickHandler2 = async (e) => {
    e.preventDefault();

    const instructorEmail = instructorEmailref.current.value;
    const instructorPhone = instructorPhoneref.current.value;
    const instructorBio = instructorBioref.current.value;
    const password = passwordref2.current.value;
    const profileImage = profileImageref2.current.value;

    const idValue = clients._id;
   

    const res = await updateInstructor(
      idValue,
      clients.userName,
      instructorEmail,
      instructorPhone,
      instructorBio,
      clients.activeStatus,
      clients.isAdmin,
      password,
      profileImage
    );

    if (res) {
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };
  //client setHandler
  const onChangeHandler2 = (e) => {
    setClients({
      ...clients,
      clientEmail: e.target.value,
    });
  };

  const onChangeHandler3 = (e) => {
    setClients({
      ...clients,
      clientPhone: e.target.value,
    });
  };

  const onChangeHandler6 = (e) => {
    setClients({
      ...clients,
      profileImage: e.target.value,
    });
  };

  //instructor sethandler

  const onChangeHandler8 = (e) => {
    setClients({
      ...clients,
      instructorEmail: e.target.value,
    });
  };
  const onChangeHandler9 = (e) => {
    setClients({
      ...clients,
      instructorPhone: e.target.value,
    });
  };
  const onChangeHandler10 = (e) => {
    setClients({
      ...clients,
      instructorBio: e.target.value,
    });
  };

  const onChangeHandler11 = (e) => {
    setClients({
      ...clients,
      profileImage: e.target.value,
    });
  };

  if (clients) {
    if (clients.userRole === "client") {
      return (
        <form className="form-grid-box">
          <div className="input-type">
            <label htmlFor="clientEmailref">
              Enter Client Email Address (Unique):
            </label>
            <input
              onChange={onChangeHandler2}
              value={clients.clientEmail}
              ref={clientEmailref}
              className="input-post-type"
              type="text"
              name="clientEmailref"
              placeholder="Enter Client Email Address (Unique)"
            ></input>
          </div>
          <div className="input-type">
            <label htmlFor="clientPhoneref">Enter Client Phone Number:</label>
            <input
              onChange={onChangeHandler3}
              value={clients.clientPhone}
              ref={clientPhoneref}
              className="input-post-type"
              type="number"
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
              name="passwordref"
              placeholder="Enter Password"
            ></input>
          </div>
          <div className="input-type">
            <label htmlFor="profileImageref">Enter images link:</label>
            <input
              onChange={onChangeHandler6}
              value={clients.profileImage}
              ref={profileImageref}
              className="input-post-type"
              type="text"
              name="profileImageref"
              placeholder="Enter Profile Image Link"
            ></input>
          </div>

          <button
            onClick={clickHandler}
            className="button-add-new"
            style={{ width: "100%", cursor: "pointer" }}
          >
            Update Data{" "}
            <span className="px-1">
              <BiBrush size={23} />
            </span>
          </button>
        </form>
      );
    } else if (clients.userRole === "instructor") {
      return (
        <form className="form-grid-box">
          <div className="input-type">
            <label htmlFor="instructorEmailref">
              Enter Instructor Email Address (Unique):
            </label>
            <input
              onChange={onChangeHandler8}
              ref={instructorEmailref}
              className="input-post-type"
              type="text"
              name="instructorEmailref"
              placeholder="Enter Instructor Email Address"
              value={clients.instructorEmail}
            ></input>
          </div>
          <div className="input-type">
            <label htmlFor="instructorPhoneref">
              Enter Instructor Phone Number:
            </label>
            <input
              onChange={onChangeHandler9}
              ref={instructorPhoneref}
              className="input-post-type"
              type="text"
              name="instructorPhoneref"
              placeholder="Enter Instructor Phone number"
              value={clients.instructorPhone}
            ></input>
          </div>
          <div className="input-type">
            <label htmlFor="passwordref">Enter Password:</label>
            <input
              ref={passwordref2}
              className="input-post-type"
              type="password"
              name="passwordref"
              placeholder="Enter your password"
            ></input>
          </div>
          <div className="input-type">
            <label htmlFor="profileImageref">Enter images link:</label>
            <input
              onChange={onChangeHandler11}
              ref={profileImageref2}
              className="input-post-type"
              type="text"
              name="profileImageref"
              placeholder="Enter profile Image Link"
              value={clients.profileImage}
            ></input>
          </div>

          <div className="input-type">
            <label htmlFor="instructorBioref">Bio:</label>
            <textarea
              onChange={onChangeHandler10}
              ref={instructorBioref}
              id="instructorBioref"
              name="instructorBioref"
              rows="1"
              className="input-post-type"
              placeholder="Enter post Description"
              value={clients.instructorBio}
            ></textarea>
          </div>

          <button
            onClick={clickHandler2}
            className="button-add-new"
            style={{ width: "100%" }}
          >
            Update Data{" "}
            <span className="px-1">
              <BiBrush size={23} />
            </span>
          </button>
        </form>
      );
    }
  }
}

export default ProfileUpdateForm;
