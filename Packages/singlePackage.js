"use client";
import Link from "next/link";
import React from "react";
import { createData } from "@/apiservices/orderapiservices";
import { createData as createConversations } from "@/apiservices/conversationapiservices";
import { useState } from "react";
import mytoast from "@/components/toast/toast";

import { useRouter } from "next/navigation";
import { getToken } from "@/helper/sessionHelper";
import { selectAllData as selectConversations } from "@/apiservices/conversationapiservices";

function SinglePackage({ items }) {
  const router = useRouter();
  const [bookLoad, setBookLoad] = useState(false);
  const isAdmin = getToken("token_travel");

  let averageReview =
    items.reviews.reduce((total, review) => total + review.reviewStarCount, 0) /
    items.reviews.length;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const millisecond = currentDate.getMilliseconds();
  let uniqueNumber = `order-${year}${month}${date}${hour}${minute}${second}${millisecond}`;

  async function orderCreate() {
    let res = await createData(
      uniqueNumber,
      items.packageId,
      items.createdUser,
      "New Order",
      "unpaid",
      items.price,
      1,
      "active",
      isAdmin.data.userName
    );
    if (res) {
      if (res.status == "noToken") {
        mytoast.danger("You need to login to place order");
      } else {
        setBookLoad(true);
        mytoast.success("You Order has been delivered");
      }
    }
  }
  async function createConversation() {
    if (isAdmin.status == "noToken") {
      mytoast.danger("You need to login to start Messaging");
    } else {
      let userName = isAdmin.data.userName;
      let userRole = isAdmin.data.userRole;
      let conversationID;
      if (userRole == "client") {
        conversationID = userName + items.createdUser;
      } else {
        mytoast.warning("Only client can open conversation");
      }
      const resC = await selectConversations(
        { conversationID: conversationID },
        { conversationID: true }
      );
      if (resC.data.length > 0) {
        mytoast.warning("Conversation already created. Go to message");
      } else {
        let res = await createConversations(
          conversationID,
          userName,
          userRole,
          items.createdUser,
          items.createdUserType,
          items.packageId
        );
        if (res) {
          if (res.status == "Success") {
            mytoast.success("Request Accepted");
            setTimeout(() => {
              router.push(`/dashboard/${userName}/setting`);
            }, 2000);
          } else {
            mytoast.warning("Something Went Wrong, See console");
            console.log(res);
          }
        }
      }
    }
  }
  return (
    <div className="col">
      <div className="theme_common_box_two img_hover">
        <div className="theme_two_box_img">
          <Link href={`/travels/${items.packageId}`}>
            <img src={items.travelImage[0]} alt="img" />
          </Link>
          <p>
            <i className="fa fa-map-marker"></i>
            {items.place}, {items.country}
          </p>
        </div>
        <div className="theme_two_box_content">
          <h4>
            <Link href={`/travels/${items.packageId}`}>
              {items.packageTitle}
            </Link>
          </h4>
          <p>
            <span className="review_rating">
              {averageReview}/5 {averageReview < 3 ? "Average" : "Excellent"}
            </span>{" "}
            <span className="review_count">
              ({items.reviews.length} reviewes)
            </span>
          </p>
          <h3>
            ${items.price} <span>Price starts from</span>
          </h3>
        </div>
        <div
          className="theme_two_box_content"
          style={{
            display: "flex",
            gap: "10px",
            width: "90%",
            margin: "auto",
          }}
        >
          {isAdmin.data ? (
            isAdmin.data.userRole == "instructor" ? (
              ""
            ) : (
              <button
                onClick={createConversation}
                style={{ width: "50%" }}
                type="button"
                class="btn btn-info btn-sm"
              >
                Talk Guide
              </button>
            )
          ) : (
            <button
              onClick={createConversation}
              style={{ width: "50%" }}
              type="button"
              class="btn btn-info btn-sm"
            >
              Talk Guide
            </button>
          )}
          {isAdmin.data ? (
            isAdmin.data.userRole == "instructor" ? (
              ""
            ) : (
              <button
                onClick={orderCreate}
                style={{ width: "50%", margin: "auto" }}
                type="button"
                class="btn btn-info btn-sm"
              >
                {bookLoad ? "Ordered" : "Book Now"}
              </button>
            )
          ) : (
            <button
              onClick={orderCreate}
              style={{ width: "50%", margin: "auto" }}
              type="button"
              class="btn btn-info btn-sm"
            >
              {bookLoad ? "Ordered" : "Book Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePackage;
