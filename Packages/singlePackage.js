"use client";
import Link from "next/link";
import React from "react";
import "./Packages.css";

function SinglePackage({ items }) {
  let averageReview =
    items.reviews.reduce((total, review) => total + review.reviewStarCount, 0) /
    items.reviews.length;

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
          <div className="badgeCard">
            <span
              style={{
                width: "100px",
                backgroundColor: "red",
                padding: "2px 5px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              {items.activity}
            </span>
          </div>
          <h4 style={{ textAlign: "center" }}>
            <Link href={`/travels/${items.packageId}`}>
              {items.packageTitle}
            </Link>
          </h4>
          <p style={{ textAlign: "center" }}>
            <span className="review_rating">
              {averageReview ? averageReview : 0}/5{" "}
              {averageReview < 3 ? "Average" : "Excellent"}
            </span>{" "}
            <span className="review_count">
              ({items.reviews.length} reviews)
            </span>
          </p>
          
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
          <button
            style={{ width: "50%", margin: "auto" }}
            type="button"
            class="single-button btn btn-info btn-sm"
          >
            <Link
              style={{ color: "#fff" }}
              href={`/travels/${items.packageId}`}
            >
              View More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePackage;
