"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { createData } from "@/apiservices/travelpackageapiservices";
import { BiUserPlus } from "react-icons/bi";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

import DOMPurify from "dompurify";

function NewPackageForm(props) {
  const [inputType, setInputType] = useState("text");
  const [data, setData] = useState("Enter Travel Description Here");

  const [fileData, setFileData] = useState([]);
  const [imageArray, setImageArray] = useState();
  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };

  const packageTyperef = useRef();
  const packageTitleref = useRef();
  const createdUserref = useRef();
  const createdUserTyperef = useRef();
  const presetref = useRef();
  const presetUsersref = useRef();
  const countryref = useRef();
  const activityref = useRef();
  const difficultyref = useRef();
  const priceref = useRef();
  const maxPriceref = useRef();
  const durationref = useRef();
  const placeref = useRef();
  const travelTimeref = useRef();
  const travelTimeref2ref = useRef();
  const previousExperienceref = useRef();
  const equipmentref = useRef();
  const groupSizeref = useRef();
  const haveGuidingref = useRef();
  const haveAccomodationref = useRef();
  const haveFoodref = useRef();
  const travelImageref = useRef();
  const packageRadio1ref = useRef();
  const packageRadio2ref = useRef();
  const reviewsref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    const millisecond = currentDate.getMilliseconds();
    let uniqueNumber = `pk-${year}${month}${date}${hour}${minute}${second}${millisecond}`;
    const packageId = uniqueNumber;
    const packageType = packageTyperef.current.value;
    const packageTitle = packageTitleref.current.value;
    const createdUser = createdUserref.current.value;
    const createdUserType = createdUserTyperef.current.value;
    const preset = presetref.current.value;

    const presetUsers = presetUsersref.current.value;
    const presetUsersFinal = JSON.parse(presetUsers);

    const country = countryref.current.value;
    const activity = activityref.current.value;
    const difficulty = difficultyref.current.value;
    const price = priceref.current.value;
    const maxPrice = maxPriceref.current.value;
    const duration = durationref.current.value;
    const place = placeref.current.value;
    const travelTime = travelTimeref.current.value;
    const travelTimeTwo = travelTimeref2ref.current.value;

    const previousExperience = previousExperienceref.current.value;
    const prevExperienceFinal = JSON.parse(previousExperience);

    const equipment = equipmentref.current.value;
    const equipementFinal = JSON.parse(equipment);

    const groupSize = groupSizeref.current.value;
    const travelDescription = DOMPurify.sanitize(data);

    const haveGuiding = haveGuidingref.current.value;
    const haveGuidingFinal = JSON.parse(haveGuiding);

    const haveAccomodation = haveAccomodationref.current.value;
    const haveAccomodationFinal = JSON.parse(haveAccomodation);

    const haveFood = haveFoodref.current.value;
    const haveFoodFinal = JSON.parse(haveFood);

    const travelImage = travelImageref.current.value;
    const travelImageFinal = JSON.parse(travelImage);

    const reviews = reviewsref.current.value;
    const reviewsFinal = JSON.parse(reviews);

    const packageradio1 = packageRadio1ref.current.checked;
    const packageradio2 = packageRadio2ref.current.checked;

    const status = packageradio1
      ? "active"
      : packageradio2
      ? "inactive"
      : "inactive";

    const res = await createData(
      packageId,
      packageType,
      packageTitle,
      createdUser,
      createdUserType,
      status,
      preset,
      presetUsersFinal,
      country,
      activity,
      difficulty,
      price,
      duration,
      place,
      travelTime,
      prevExperienceFinal,
      equipementFinal,
      groupSize,
      travelDescription,
      haveGuidingFinal,
      haveAccomodationFinal,
      haveFoodFinal,
      travelImageFinal,
      reviewsFinal,
      maxPrice,
      travelTimeTwo
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was created successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };

  useEffect(() => {
    setImageArray(JSON.stringify(fileData));
  }, [fileData]);

  const sendImageHandler = async (e) => {
    e.preventDefault();

    try {
      let fileInput = document.getElementById("fileInput");

      let fileUploadData;

      if (fileInput.files[0]) {
        const formData = new FormData();
        formData.append("fileInput", fileInput.files[0]); // Upload the selected file

        const response = await fetch(`/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          fileUploadData = "";
        } else {
          const data = await response.json();
          fileUploadData = data;

          setFileData((prev) => [...prev, fileUploadData.fileUrl]);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  function onChangeHandler(e) {
    e.preventDefault();

    setImageArray(e.target.value);
  }

  return (
    <>
      <label htmlFor="travelDescription">Travel Description:</label>
      <div
        style={{ marginBottom: "20px" }}
        name="travelDescription"
        className="input-type"
      >
        <RichTextEditor value={data} setValue={setData} />
      </div>
      <form className="form-grid-box">
        <div className="input-type">
          <label htmlFor="packageTyperef">Package Type:</label>
          <select
            ref={packageTyperef}
            className="input-post-type"
            id="packageTyperef"
            name="packageTyperef"
          >
            <option value="package">Package</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="packageTitleref">Title:</label>
          <input
            ref={packageTitleref}
            className="input-post-type"
            type="text"
            name="packageTitleref"
            placeholder="Enter Package Title"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Created User:</label>
          <input
            ref={createdUserref}
            className="input-post-type"
            type="text"
            name="createdUserref"
            placeholder="Enter who created this package"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="createdUserTyperef">Created User Type:</label>
          <select
            ref={createdUserTyperef}
            className="input-post-type"
            id="createdUserTyperef"
            name="createdUserTyperef"
          >
            <option value="instructor">Instructor</option>
            <option value="client">Client</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="presetref">Preset:</label>
          <select
            ref={presetref}
            className="input-post-type"
            id="presetref"
            name="presetref"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="presetUsersref">Preset Users:</label>
          <textarea
            ref={presetUsersref}
            id="presetUsersref"
            name="presetUsersref"
            rows="1"
            className="input-post-type"
            placeholder="Enter Preset users Array"
          ></textarea>
        </div>
        <div className="input-type">
          <label htmlFor="countryref">Travel Country:</label>
          <input
            ref={countryref}
            className="input-post-type"
            type="text"
            name="countryref"
            placeholder="Enter Travel Country"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="activityref">Activity:</label>
          <input
            ref={activityref}
            className="input-post-type"
            type="text"
            name="activityref"
            placeholder="Enter Package Activity"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="difficultyref">Difficulty:</label>
          <select
            ref={difficultyref}
            className="input-post-type"
            id="difficultyref"
            name="difficultyref"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="priceref">Price (Dollar):</label>
          <input
            ref={priceref}
            className="input-post-type"
            type="number"
            name="priceref"
            placeholder="Enter Travel Price in Dollar"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="maxPriceref">Maximum Price (Dollar):</label>
          <input
            ref={maxPriceref}
            className="input-post-type"
            type="number"
            name="maxPriceref"
            placeholder="Enter Maxiumum Travel Price in Dollar"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Travel Duration (days):</label>
          <input
            ref={durationref}
            className="input-post-type"
            type="number"
            name="durationref"
            placeholder="Enter Package Duration"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="placeref">Travel Place:</label>
          <input
            ref={placeref}
            className="input-post-type"
            type="text"
            name="placeref"
            placeholder="Enter Travel Place"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="travelTimeref">Travel Time:</label>
          <input
            ref={travelTimeref}
            className="input-post-type"
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="travelTimeref"
            placeholder="Enter Travel Date"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="travelTimeref2ref">Second Travel Time:</label>
          <input
            ref={travelTimeref2ref}
            className="input-post-type"
            type="text"
            name="travelTimeref2ref"
            placeholder="Enter Travel Date"
          ></input>
        </div>

        <div className="input-type">
          <label htmlFor="previousExperienceref">Previous Experience:</label>
          <select
            ref={previousExperienceref}
            className="input-post-type"
            id="previousExperienceref"
            name="previousExperienceref"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Equipment Array:</label>
          <textarea
            ref={equipmentref}
            id="equipmentref"
            name="equipmentref"
            rows="1"
            className="input-post-type"
            placeholder="Enter Travel Equipment Array"
          ></textarea>
        </div>
        <div className="input-type">
          <label htmlFor="reviewsref">Review Array:</label>
          <textarea
            ref={reviewsref}
            id="reviewsref"
            name="reviewsref"
            rows="1"
            className="input-post-type"
            placeholder="Enter Travel Equipment Array"
          ></textarea>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Group Size:</label>
          <input
            ref={groupSizeref}
            className="input-post-type"
            type="number"
            name="groupSizeref"
            placeholder="Enter Group Size"
          ></input>
        </div>

        <div className="input-type">
          <label htmlFor="haveGuidingref">Have Guiding:</label>
          <select
            ref={haveGuidingref}
            className="input-post-type"
            id="haveGuidingref"
            name="haveGuidingref"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="haveAccomodationref">Have Accomodation:</label>
          <select
            ref={haveAccomodationref}
            className="input-post-type"
            id="haveAccomodationref"
            name="haveAccomodationref"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="haveFoodref">Have Food:</label>
          <select
            ref={haveFoodref}
            className="input-post-type"
            id="haveFoodref"
            name="haveFoodref"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Travel image:</label>
          <textarea
            value={imageArray}
            ref={travelImageref}
            onChange={onChangeHandler}
            id="travelImageref"
            name="travelImageref"
            rows="1"
            className="input-post-type"
            placeholder="Enter travel Image Link"
          ></textarea>
          <input
            style={{ marginTop: "10px" }}
            accept="image/png image/jpeg image/gif"
            type="file"
            id="fileInput"
          ></input>
          <button
            style={{ padding: "0px 10px", marginTop: "10px" }}
            onClick={sendImageHandler}
          >
            Upload Image{" "}
            <span>
              <BiUserPlus size={23} />
            </span>
          </button>
        </div>

        <div className="flex-item-center">
          <div className="form-check">
            <input
              ref={packageRadio1ref}
              type="radio"
              value="Active"
              id="packageRadio1ref"
              name="status"
              className="form-check-input mt-1 mr-2"
            />
            <label htmlFor="packageRadio1ref">Active</label>
          </div>
          <div className="form-check">
            <input
              ref={packageRadio2ref}
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input mt-1 mr-2"
            />
            <label htmlFor="radioDefault2">Inactive</label>
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
    </>
  );
}

export default NewPackageForm;
