"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/clientapiservices";
import { useState, useEffect } from "react";

function UpdateClientForm(props) {
  const [clients, setClients] = useState({
    userName: props.payload.userName,
    clientEmail: props.payload.clientEmail,
    clientPhone: props.payload.clientPhone,
    password: props.payload.password,
    profileImage: props.payload.profileImage,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setClients({
      userName: props.payload.userName,
      clientEmail: props.payload.clientEmail,
      clientPhone: props.payload.clientPhone,
      password: props.payload.password,
      profileImage: props.payload.profileImage,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.userName,
    props.payload.clientEmail,
    props.payload.clientPhone,
    props.payload.password,
    props.payload.profileImage,
    props.payload.activeStatus,
  ]);

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
    const idValue = props.data;

    const res = await updateData(
      idValue,
      userName,
      clientEmail,
      clientPhone,
      status,
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
    setClients({
      userName: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setClients({
      clientEmail: e.target.value,
    });
  };
  const onChangeHandler3 = (e) => {
    setClients({
      clientPhone: e.target.value,
    });
  };

  const onChangeHandler6 = (e) => {
    setClients({
      profileImage: e.target.value,
    });
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="userNameref">Enter Client Username (unique):</label>
        <input
          onChange={onChangeHandler1}
          value={clients.userName}
          ref={userNameref}
          className="input-post-type"
          type="text"
          name="userNameref"
          placeholder="Enter Client Username (unique)"
        ></input>
      </div>

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

      <div className="flex-item-center">
        {props.payload.activeStatus == "active" ? (
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
        ) : (
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
        )}

        {props.payload.activeStatus == "inactive" ? (
          <div className="form-check">
            <input
              ref={clientRadio2ref}
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
              ref={clientRadio2ref}
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

export default UpdateClientForm;
