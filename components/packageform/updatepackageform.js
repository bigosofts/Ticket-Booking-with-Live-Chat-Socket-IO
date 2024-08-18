"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/travelpackageapiservices";
import { useState, useEffect } from "react";
import { BiUserPlus } from "react-icons/bi";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import DOMPurify from "dompurify";

function UpdatePackageForm(props) {
  const [fileData, setFileData] = useState([]);
  const [inputType, setInputType] = useState("text");
  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };
  const [data, setData] = useState(props.payload.travelDescription);

  const [packages, setPackages] = useState({
    packageId: props.payload.packageId,
    packageType: props.payload.packageType,
    packageTitle: props.payload.packageTitle,
    createdUser: props.payload.createdUser,
    createdUserType: props.payload.createdUserType,
    preset: props.payload.preset,
    presetUsers: props.payload.presetUsers,
    country: props.payload.country,
    activity: props.payload.activity,
    difficulty: props.payload.difficulty,
    price: props.payload.price,
    maxPrice: props.payload.maxPrice,
    duration: props.payload.duration,
    place: props.payload.place,
    travelTime: props.payload.travelTime,
    travelTimeTwo: props.payload.travelTimeTwo,
    previousExperience: props.payload.previousExperience,
    equipment: props.payload.equipment,
    groupSize: props.payload.groupSize,
    haveGuiding: props.payload.haveGuiding,
    haveAccomodation: props.payload.haveAccomodation,
    haveFood: props.payload.haveAccomodation,
    travelImage: JSON.stringify(props.payload.travelImage),
    reviews: props.payload.reviews,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setData(props.payload.travelDescription);

    setPackages({
      packageId: props.payload.packageId,
      packageType: props.payload.packageType,
      packageTitle: props.payload.packageTitle,
      createdUser: props.payload.createdUser,
      createdUserType: props.payload.createdUserType,
      preset: props.payload.preset,
      presetUsers: props.payload.presetUsers,
      country: props.payload.country,
      activity: props.payload.activity,
      difficulty: props.payload.difficulty,
      price: props.payload.price,
      maxPrice: props.payload.maxPrice,
      duration: props.payload.duration,
      place: props.payload.place,
      travelTime: props.payload.travelTime,
      travelTimeTwo: props.payload.travelTimeTwo,
      previousExperience: props.payload.previousExperience,
      equipment: props.payload.equipment,
      groupSize: props.payload.groupSize,
      haveGuiding: props.payload.haveGuiding,
      haveAccomodation: props.payload.haveAccomodation,
      haveFood: props.payload.haveAccomodation,
      travelImage: JSON.stringify(props.payload.travelImage),
      reviews: props.payload.reviews,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.packageId,
    props.payload.packageType,
    props.payload.packageTitle,
    props.payload.createdUser,
    props.payload.createdUserType,
    props.payload.preset,
    props.payload.presetUsers,
    props.payload.country,
    props.payload.activity,
    props.payload.difficulty,
    props.payload.price,
    props.payload.duration,
    props.payload.place,
    props.payload.travelTime,
    props.payload.previousExperience,
    props.payload.equipment,
    props.payload.groupSize,
    props.payload.travelDescription,
    props.payload.haveGuiding,
    props.payload.haveAccomodation,
    props.payload.haveAccomodation,
    props.payload.travelImage,
    props.payload.reviews,
    props.payload.activeStatus,
    props.payload.maxPrice,
    props.payload.travelTimeTwo,
  ]);

  const packageIdref = useRef();
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
  const reviewsref = useRef();
  const packageRadio1ref = useRef();
  const packageRadio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const packageId = packageIdref.current.value;
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
    const TravelImageFinal = JSON.parse(travelImage);

    const reviews = reviewsref.current.value;
    const reviewsFinal = JSON.parse(reviews);

    const packageradio1 = packageRadio1ref.current.checked;
    const packageradio2 = packageRadio2ref.current.checked;

    const status = packageradio1
      ? "active"
      : packageradio2
      ? "inactive"
      : "inactive";
    const idValue = props.data;

    const res = await updateData(
      idValue,
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
      TravelImageFinal,
      reviewsFinal,
      maxPrice,
      travelTimeTwo
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };

  useEffect(() => {
    if (fileData.length > 0) {
      setPackages({
        travelImage: JSON.stringify(fileData),
      });
    }
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
          debugger;
          setFileData((prev) => [...prev, fileUploadData.fileUrl]);

          debugger;
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onChangeHandler1 = (e) => {
    setPackages({
      packageId: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setPackages({
      packageType: e.target.value,
    });
  };
  const onChangeHandler3 = (e) => {
    setPackages({
      packageTitle: e.target.value,
    });
  };
  const onChangeHandler4 = (e) => {
    setPackages({
      createdUser: e.target.value,
    });
  };
  const onChangeHandler5 = (e) => {
    setPackages({
      createdUserType: e.target.value,
    });
  };
  const onChangeHandler6 = (e) => {
    setPackages({
      preset: e.target.value,
    });
  };
  const onChangeHandler7 = (e) => {
    setPackages({
      presetUsersFinal: e.target.value,
    });
  };
  const onChangeHandler8 = (e) => {
    setPackages({
      country: e.target.value,
    });
  };
  const onChangeHandler9 = (e) => {
    setPackages({
      activity: e.target.value,
    });
  };
  const onChangeHandler10 = (e) => {
    setPackages({
      difficulty: e.target.value,
    });
  };
  const onChangeHandler11 = (e) => {
    setPackages({
      price: e.target.value,
    });
  };
  const onChangeHandler28 = (e) => {
    setPackages({
      maxPrice: e.target.value,
    });
  };
  const onChangeHandler12 = (e) => {
    setPackages({
      duration: e.target.value,
    });
  };
  const onChangeHandler13 = (e) => {
    setPackages({
      place: e.target.value,
    });
  };
  const onChangeHandler14 = (e) => {
    setPackages({
      travelTime: e.target.value,
    });
  };
  const onChangeHandler24 = (e) => {
    setPackages({
      travelTimeTwo: e.target.value,
    });
  };

  const onChangeHandler15 = (e) => {
    setPackages({
      prevExperienceFinal: e.target.value,
    });
  };
  const onChangeHandler16 = (e) => {
    setPackages({
      equipementFinal: e.target.value,
    });
  };
  const onChangeHandler17 = (e) => {
    setPackages({
      groupSize: e.target.value,
    });
  };

  const onChangeHandler19 = (e) => {
    setPackages({
      haveGuidingFinal: e.target.value,
    });
  };
  const onChangeHandler20 = (e) => {
    setPackages({
      haveAccomodationFinal: e.target.value,
    });
  };
  const onChangeHandler21 = (e) => {
    setPackages({
      haveFoodFinal: e.target.value,
    });
  };
  const onChangeHandler22 = (e) => {
    setPackages({
      travelImage: e.target.value,
    });
  };
  const onChangeHandler23 = (e) => {
    setPackages({
      reviewsFinal: e.target.value,
    });
  };

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
          <label htmlFor="packageIdref">Package ID:</label>
          <input
            ref={packageIdref}
            onChange={onChangeHandler1}
            value={packages.packageId}
            className="input-post-type"
            type="text"
            name="packageIdref"
            placeholder="Enter Package ID"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="packageTyperef">Package Type:</label>
          <input
            ref={packageTyperef}
            onChange={onChangeHandler2}
            value={packages.packageType}
            className="input-post-type"
            type="text"
            name="packageTyperef"
            placeholder="Enter Package type"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="packageTitleref">Title:</label>
          <input
            ref={packageTitleref}
            onChange={onChangeHandler3}
            value={packages.packageTitle}
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
            onChange={onChangeHandler4}
            value={packages.createdUser}
            className="input-post-type"
            type="text"
            name="createdUserref"
            placeholder="Enter who created this post"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="createdUserTyperef">Created User Type:</label>

          <select
            ref={createdUserTyperef}
            onChange={onChangeHandler5}
            value={packages.createdUserType}
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
            onChange={onChangeHandler6}
            value={packages.preset}
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
            onChange={onChangeHandler7}
            value={JSON.stringify(packages.presetUsers)}
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
            onChange={onChangeHandler8}
            value={packages.country}
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
            onChange={onChangeHandler9}
            value={packages.activity}
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
            onChange={onChangeHandler10}
            value={packages.difficulty}
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
            onChange={onChangeHandler11}
            value={packages.price}
            className="input-post-type"
            type="number"
            name="priceref"
            placeholder="Enter Travel Price in Dollar"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="priceref">Maximum Price (Dollar):</label>
          <input
            ref={maxPriceref}
            onChange={onChangeHandler28}
            value={packages.maxPrice}
            className="input-post-type"
            type="number"
            name="maxPriceref"
            placeholder="Enter Maximum Travel Price in Dollar"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Travel Duration (days):</label>
          <input
            ref={durationref}
            onChange={onChangeHandler12}
            value={packages.duration}
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
            onChange={onChangeHandler13}
            value={packages.place}
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
            onChange={onChangeHandler14}
            value={packages.travelTime}
            className="input-post-type"
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="travelTimeref"
            placeholder="Enter Travel Date"
          ></input>
        </div>
        <div className="input-type">
          <label htmlFor="travelTimeref">Second Travel Time:</label>
          <input
            ref={travelTimeref2ref}
            onChange={onChangeHandler24}
            value={packages.travelTimeTwo}
            className="input-post-type"
            type="text"
            name="travelTimeref2ref"
            placeholder="Enter Second Travel Date"
          ></input>
        </div>

        <div className="input-type">
          <label htmlFor="previousExperienceref">Previous Experience:</label>
          <select
            ref={previousExperienceref}
            onChange={onChangeHandler15}
            value={packages.previousExperience}
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
            onChange={onChangeHandler16}
            value={JSON.stringify(packages.equipment)}
            id="equipmentref"
            name="equipmentref"
            rows="1"
            className="input-post-type"
            placeholder="Enter Travel Equipment Array"
          ></textarea>
        </div>
        <div className="input-type">
          <label htmlFor="userNameref">Group Size:</label>
          <input
            ref={groupSizeref}
            onChange={onChangeHandler17}
            value={packages.groupSize}
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
            onChange={onChangeHandler19}
            value={packages.haveGuiding}
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
            onChange={onChangeHandler20}
            value={packages.haveAccomodation}
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
            onChange={onChangeHandler21}
            value={packages.haveFood}
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
            ref={travelImageref}
            onChange={onChangeHandler22}
            value={packages.travelImage}
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
        <div className="input-type">
          <label htmlFor="reviewsref">Reviews Array:</label>

          <textarea
            ref={reviewsref}
            onChange={onChangeHandler23}
            value={JSON.stringify(packages.reviews)}
            id="reviewsref"
            name="reviewsref"
            rows="1"
            className="input-post-type"
            placeholder="Enter travel Image Link"
          ></textarea>
        </div>

       

        <div className="flex-item-center">
          {props.payload.activeStatus == "active" ? (
            <div className="form-check">
              <input
                ref={packageRadio1ref}
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
                ref={packageRadio1ref}
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
                ref={packageRadio2ref}
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
                ref={packageRadio2ref}
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
    </>
  );
}

export default UpdatePackageForm;
