"use client";
import React from "react";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { createData } from "@/apiservices/postapiservices";

function NewPostForm(props) {
  const posttitleref = useRef();
  const postuserref = useRef();
  const postimagelinkref = useRef();
  const postidref = useRef();
  const postcategoryref = useRef();
  const postpopularityref = useRef();
  const postdescriptionref = useRef();
  const postradio1ref = useRef();
  const postradio2ref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const posttitle = posttitleref.current.value;
    const postuser = postuserref.current.value;
    const postimagelink = postimagelinkref.current.value;
    const postid = postidref.current.value;
    const postcategory = postcategoryref.current.value;
    const postpopularity = postpopularityref.current.value;
    const postdescription = postdescriptionref.current.value;
    const postradio1 = postradio1ref.current.checked;
    const postradio2 = postradio2ref.current.checked;
    const status = postradio1 ? "active" : postradio2 ? "inactive" : "inactive";

    const res = await createData(
      postuser,
      postimagelink,
      postid,
      posttitle,
      postdescription,
      postcategory,
      postpopularity,
      status
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was created successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="posttitleref">Title:</label>
        <input
          ref={posttitleref}
          className="input-post-type"
          type="text"
          name="posttitle"
          placeholder="Enter Post title"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="postuserref">Post User:</label>
        <input
          ref={postuserref}
          className="input-post-type"
          type="text"
          name="postuser"
          placeholder="Enter post user"
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postimagelinkref">Post Image Link:</label>
        <input
          ref={postimagelinkref}
          className="input-post-type"
          type="text"
          name="postimagelink"
          placeholder="Enter post image link"
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postidref">Post ID:</label>
        <input
          ref={postidref}
          className="input-post-type"
          type="text"
          name="postid"
          placeholder="Enter post ID"
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postcategoryref">Category:</label>
        <input
          ref={postcategoryref}
          className="input-post-type"
          type="text"
          name="postcategory"
          placeholder="Enter post category"
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="postpopularityref">Popularity:</label>
        <select
          ref={postpopularityref}
          className="input-post-type"
          id="postpopularityref"
          name="postpopularityref"
        >
          <option value="new">New</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div className="input-type">
        <label htmlFor="postdescriptionref">Post Description:</label>
        <textarea
          ref={postdescriptionref}
          id="postdescription"
          name="postdescription"
          rows="1"
          className="input-post-type"
          placeholder="Enter post Description"
        ></textarea>
      </div>

      <div className="flex-item-center">
        <div className="form-check">
          <input
            ref={postradio1ref}
            type="radio"
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input mt-1 mr-2"
          />
          <label htmlFor="radioDefault1">Active</label>
        </div>
        <div className="form-check">
          <input
            ref={postradio2ref}
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
  );
}

export default NewPostForm;
