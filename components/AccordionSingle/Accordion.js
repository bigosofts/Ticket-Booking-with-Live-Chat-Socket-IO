"use client";
import "./Accordion.css";
import { useRef, useState } from "react";

const Accordion = ({ filler }) => {
  const [inputType, setInputType] = useState("text");
  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };

  const durationref = useRef();
  const travelTimeref = useRef();
  const groupSizeref = useRef();
  const travelDescriptionref = useRef();
  const haveGuidingref = useRef();
  const haveAccomodationref = useRef();
  const haveFoodref = useRef();


  var isoTime = filler.travelTime;

  var date = new Date(isoTime);

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="menu-accordion">
      <ul>
        <li>
          <input type="radio" id="tab1" name="acor" defaultChecked />
          <label htmlFor="tab1">Travel Details</label>
          <div className="content">
            <p>Average Price: ${filler.price}</p>
            <p>Maximum Price: ${filler.maxPrice}</p>
            <p>Travel Date: {formattedDate}</p>
            <p>Travel Time in Year: {filler.travelTimeTwo}</p>
            <p>Activity: {filler.activity}</p>
            <p>Difficulty: {filler.difficulty}</p>
          </div>
        </li>
        <li>
          <input type="radio" id="tab2" name="acor" />
          <label htmlFor="tab2">Travel Info</label>
          <div className="content">
            <p>Title: {filler.packageTitle}</p>
            <p>Instructor: {filler.createdUser}</p>
            <p>Country: {filler.country}</p>
            <p>Preset Before: {JSON.stringify(filler.preset) ? "Yes" : "No"}</p>
            <p>Duration: {filler.duration} days</p>
            <p>Place: {filler.place}</p>
          </div>
        </li>
        <li>
          <input type="radio" id="tab3" name="acor" />
          <label htmlFor="tab3">Facilities</label>
          <div className="content">
            <p>Group Size: {filler.groupSize}</p>
            <p> Have Food: {JSON.stringify(filler.haveFood) ? "Yes" : "No"}</p>
            <p>
              {" "}
              Have Accomodation:{" "}
              {JSON.stringify(filler.haveAccomodation) ? "Yes" : "No"}
            </p>
            <p>
              {" "}
              Have Guide: {JSON.stringify(filler.haveGuiding) ? "Yes" : "No"}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Accordion;
