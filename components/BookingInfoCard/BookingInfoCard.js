"use client";
import "./BookingInfoCard.css";
import QueryForm from "../QueryForm/QueryForm";

function BookingInfoCard({ filler }) {


 

  

  return (
    <>
      <div className="sidebar-special">
        <div className="style-1">
          <div className="style-2">
            <div className="style-3">
              <span className="style-4">{filler.activity}</span>
            </div>
          </div>
        </div>
        <div className="style-5">
         
          <div className="style-7">
            <div className="style-8">{filler.packageTitle}</div>
          </div>
        </div>
      </div>
      <QueryForm item={filler} />
    </>
  );
}

export default BookingInfoCard;
