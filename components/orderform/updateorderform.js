"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/orderapiservices";
import { useState, useEffect } from "react";
import { getToken } from "@/helper/sessionHelper";

function UpdateOrderForm(props) {
  const isAdmin = getToken("token_travel");

  const [orders, setOrders] = useState({
    clientID: props.payload.clientID,
    orderID: props.payload.orderID,
    packageID: props.payload.packageID,
    instructorID: props.payload.instructorID,
    orderDescription: props.payload.orderDescription,
    orderPrice: props.payload.orderPrice,
    orderNumber: props.payload.orderNumber,
    orderStatus: props.payload.orderStatus,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setOrders({
      clientID: props.payload.clientID,
      orderID: props.payload.orderID,
      packageID: props.payload.packageID,
      instructorID: props.payload.instructorID,
      orderDescription: props.payload.orderDescription,
      orderPrice: props.payload.orderPrice,
      orderNumber: props.payload.orderNumber,
      orderStatus: props.payload.orderStatus,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.clientID,
    props.payload.orderID,
    props.payload.packageID,
    props.payload.instructorID,
    props.payload.orderDescription,
    props.payload.orderPrice,
    props.payload.orderNumber,
    props.payload.orderStatus,
    props.payload.activeStatus,
  ]);

  const orderIDref = useRef();
  const packageIDref = useRef();
  const instructorIDref = useRef();
  const orderDescriptionref = useRef();

  const orderPriceref = useRef();
  const orderNumberref = useRef();
  const clientIDref = useRef();
  const orderStatusref = useRef();
  const orderRadio1ref = useRef();
  const orderRadio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const clientID = clientIDref.current
      ? clientIDref.current.value
      : orders.clientID;
    const orderID = orderIDref.current
      ? orderIDref.current.value
      : orders.orderID;
    const packageID = packageIDref.current
      ? packageIDref.current.value
      : orders.packageID;
    const instructorID = instructorIDref.current
      ? instructorIDref.current.value
      : orders.instructorID;
    const orderDescription = orderDescriptionref.current.value;
    const orderPrice = orderPriceref.current.value;
    const orderNumber = orderNumberref.current.value;
    const orderStatus = orderStatusref.current.value;

    const orderRadio1 = orderRadio1ref.current.checked;
    const orderRadio2 = orderRadio2ref.current.checked;
    const status = orderRadio1
      ? "active"
      : orderRadio2
      ? "inactive"
      : "inactive";

    const idValue = props.data;

    const res = await updateData(
      idValue,
      orderID,
      packageID,
      instructorID,
      orderDescription,
      orderStatus,
      orderPrice,
      orderNumber,
      status,
      clientID
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };
  const onChangeHandler1 = (e) => {
    setOrders({
      clientID: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setOrders({
      orderID: e.target.value,
    });
  };
  const onChangeHandler3 = (e) => {
    setOrders({
      packageID: e.target.value,
    });
  };
  const onChangeHandler4 = (e) => {
    setOrders({
      instructorID: e.target.value,
    });
  };

  const onChangeHandler6 = (e) => {
    setOrders({
      orderDescription: e.target.value,
    });
  };

  const onChangeHandler8 = (e) => {
    setOrders({
      orderPrice: e.target.value,
    });
  };

  const onChangeHandler9 = (e) => {
    setOrders({
      orderNumber: e.target.value,
    });
  };
  const onChangeHandler10 = (e) => {
    setOrders({
      orderStatus: e.target.value,
    });
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="userNameref">clientID: </label>
        {isAdmin.data.isAdmin == true ? (
          <input
            onChange={onChangeHandler1}
            value={orders.clientID}
            ref={clientIDref}
            className="input-post-type"
            type="text"
            id="userNameref"
            name="userNameref"
            placeholder="Enter Unique UserName"
          ></input>
        ) : (
          orders.clientID
        )}
      </div>

      <div className="input-type">
        <label htmlFor="orderIDref">Order ID: </label>

        {isAdmin.data.isAdmin == true ? (
          <input
            onChange={onChangeHandler2}
            value={orders.orderID}
            ref={orderIDref}
            className="input-post-type"
            type="text"
            id="orderIDref"
            name="orderIDref"
            placeholder="Enter Order ID"
          ></input>
        ) : (
          orders.orderID
        )}
      </div>

      <div className="input-type">
        <label htmlFor="packageIDref">Package ID: </label>
        {isAdmin.data.isAdmin == true ? (
          <input
            onChange={onChangeHandler3}
            value={orders.packageID}
            ref={packageIDref}
            className="input-post-type"
            type="text"
            id="packageIDref"
            name="packageIDref"
            placeholder="Enter Package ID"
          ></input>
        ) : (
          orders.packageID
        )}
      </div>

      <div className="input-type">
        <label htmlFor="instructorIDref">Instructor ID: </label>
        {isAdmin.data.isAdmin == true ? (
          <input
            onChange={onChangeHandler4}
            value={orders.instructorID}
            ref={instructorIDref}
            className="input-post-type"
            type="text"
            id="instructorIDref"
            name="instructorIDref"
            placeholder="Enter Instructor ID"
          ></input>
        ) : (
          orders.instructorID
        )}
      </div>

      <div className="input-type">
        <label htmlFor="orderPriceref">Price:</label>
        <input
          onChange={onChangeHandler8}
          value={orders.orderPrice}
          ref={orderPriceref}
          className="input-post-type"
          type="Number"
          id="orderPriceref"
          name="orderPriceref"
          placeholder="Enter Price of Order in Dollar"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="orderNumberref">Order Time:</label>
        <input
          onChange={onChangeHandler9}
          value={orders.orderNumber}
          ref={orderNumberref}
          className="input-post-type"
          type="Number"
          id="orderNumberref"
          name="orderNumberref"
          placeholder="Enter how many times it is ordered"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="orderStatusref">Order Status:</label>
        <select
          onChange={onChangeHandler10}
          value={orders.orderStatus}
          ref={orderStatusref}
          className="input-post-type"
          id="orderStatusref"
          name="orderStatusref"
        >
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="input-type">
        <label htmlFor="orderDescriptionref">Description:</label>
        <textarea
          onChange={onChangeHandler6}
          value={orders.orderDescription}
          ref={orderDescriptionref}
          id="orderDescriptionref"
          name="postdescription"
          className="input-post-type"
          rows="1"
          placeholder="Enter Order Description"
        ></textarea>
      </div>

      <div className="flex-item-center">
        {props.payload.activeStatus == "active" ? (
          <div className="form-check">
            <input
              ref={orderRadio1ref}
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
              ref={orderRadio1ref}
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
              ref={orderRadio2ref}
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
              ref={orderRadio2ref}
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

export default UpdateOrderForm;
