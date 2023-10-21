"use client";
import { useEffect } from "react";
import "./BookingInfoCard.css";

function BookingInfoCard({ filler }) {
  useEffect(() => {
    import("./BookingInfo.js");
  }, []);

  var isoTime = filler.travelTime;

  var date = new Date(isoTime);

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div id="nexus6p">
      <div className="profile">
        <div className="profile-top">
          <div className="profile-bg">
            <div className="profile-mask">
              <div className="booking-price">
                <span>Price: ${filler.price}</span>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <img src="/images/next1.png" />
            <div className="personal-details">
              <div className="name">Travel Date</div>
              <div className="occupation">{formattedDate}</div>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
         
          <div className="profile-container contact-info open">
            <div className="info-card">Title: {filler.packageTitle}</div>
            
            <div className="info-card">PackageID: {filler.packageId}</div>
            <div className="info-card">Instructor: {filler.createdUser}</div>
            <div className="info-card">Country: {filler.country}</div>
            <div className="info-card">Preset Before: {JSON.stringify(filler.preset)}</div>
          </div>
          <div className="profile-container events">
            <div className="info-card">Activity: {filler.activity}</div>
            <div className="info-card">Difficulty: {filler.difficulty}</div>
            <div className="info-card">Duration: {filler.duration} days</div>
            <div className="info-card">Place: {filler.place}</div>
            <div className="info-card">Travel Time: {formattedDate}</div>
          </div>
          <div className="profile-container portfolio">
            <div className="info-card">
              Group Size: {filler.groupSize}
            </div>
            <div className="info-card">
              Have Food: {JSON.stringify(filler.haveFood)}
            </div>
            <div className="info-card">
              Have Accomodation: {JSON.stringify(filler.haveAccomodation)}
             
            </div>
            <div className="info-card">
              Have Guide: {JSON.stringify(filler.haveGuiding)}
              
            </div>
          </div>
        </div>
        <div className="menu">
         
          <div className="menu-item" menu-data="contact-info">
            <i className="fa fa-book"></i>
          </div>
          <div className="menu-item" menu-data="events">
            <i className="fa fa-heart"></i>
          </div>
          <div className="menu-item" menu-data="portfolio">
            <i className="fa fa-user"></i>
          </div>
          <i id="menu-icon" className="fa fa-gear"></i>
        </div>
      </div>
    </div>
  );
}

export default BookingInfoCard;
