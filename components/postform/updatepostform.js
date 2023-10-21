"use client";
import React from "react";
import { useRef } from "react";
import { BiBrush } from "react-icons/bi";
import myToast from "@/components/toast/toast";
import { updateData } from "@/apiservices/postapiservices";
import { useState, useEffect } from "react";

function updatePostForm(props) {
  const [post, setPost] = useState({
    postImageLink: props.payload.postImageLink,
    postId: props.payload.postId,
    postTitleen: props.payload.postTitle.en,
    postDescriptionen: props.payload.postDescription.en,
    postCategoryen: props.payload.postCategory.en,
    postPopularityen: props.payload.postPopularity.en,
    postUser: props.payload.postUser,
    activeStatus: props.payload.activeStatus,
  });

  useEffect(() => {
    setPost({
      postImageLink: props.payload.postImageLink,
      postId: props.payload.postId,
      postTitleen: props.payload.postTitle.en,
      postDescriptionen: props.payload.postDescription.en,
      postCategoryen: props.payload.postCategory.en,
      postPopularityen: props.payload.postPopularity.en,
      postUser: props.payload.postUser,
      activeStatus: props.payload.activeStatus,
    });
  }, [
    props.payload.postUser,
    props.payload.postImageLink,
    props.payload.postId,
    props.payload.postTitle.en,
    props.payload.postDescription.en,
    props.payload.postCategory.en,
    props.payload.postPopularity.en,
    props.payload.postUser,
    props.payload.activeStatus,
  ]);

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
    const idValue = props.data;

    const res = await updateData(
      postuser,
      postimagelink,
      postid,
      posttitle,
      postdescription,
      postcategory,
      postpopularity,
      status,
      idValue
    );

    if (res) {
      props.statechanger();
      myToast.success("Data was Updated successfully");
    } else {
      myToast.warning("something went wrong");
    }
  };
  const onChangeHandler1 = (e) => {
    setPost({
      postUser: e.target.value,
    });
  };
  const onChangeHandler2 = (e) => {
    setPost({
      postImageLink: e.target.value,
    });
  };
  const onChangeHandler3 = (e) => {
    setPost({
      postId: e.target.value,
    });
  };
  const onChangeHandler4 = (e) => {
    setPost({
      postTitleen: e.target.value,
    });
  };

  const onChangeHandler6 = (e) => {
    setPost({
      postDescriptionen: e.target.value,
    });
  };

  const onChangeHandler8 = (e) => {
    setPost({
      postCategoryen: e.target.value,
    });
  };

  const onChangeHandler10 = (e) => {
    setPost({
      postPopularityen: e.target.value,
    });
  };

  return (
    <form className="form-grid-box">
      <div className="input-type">
        <label htmlFor="posttitleref">Title:</label>
        <input
          onChange={onChangeHandler4}
          ref={posttitleref}
          className="input-post-type"
          type="text"
          name="posttitle"
          placeholder="Enter Post title"
          value={post.postTitleen}
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="postuserref">Post User:</label>
        <input
          onChange={onChangeHandler1}
          ref={postuserref}
          className="input-post-type"
          type="text"
          name="postuser"
          placeholder="Enter post user"
          value={post.postUser}
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postimagelinkref">Post Image Link:</label>
        <input
          onChange={onChangeHandler2}
          ref={postimagelinkref}
          className="input-post-type"
          type="text"
          name="postimagelink"
          placeholder="Enter post image link"
          value={post.postImageLink}
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postidref">Post ID:</label>
        <input
          onChange={onChangeHandler3}
          ref={postidref}
          className="input-post-type"
          type="text"
          name="postid"
          placeholder="Enter post ID"
          value={post.postId}
        ></input>
      </div>
      <div className="input-type">
        <label htmlFor="postcategoryref">Category:</label>
        <input
          onChange={onChangeHandler8}
          ref={postcategoryref}
          className="input-post-type"
          type="text"
          name="postcategory"
          placeholder="Enter post category"
          value={post.postCategoryen}
        ></input>
      </div>

      <div className="input-type">
        <label htmlFor="postpopularityref">Popularity:</label>
        <select
          onChange={onChangeHandler10}
          ref={postpopularityref}
          className="input-post-type"
          id="postpopularityref"
          name="postpopularityref"
          value={post.postPopularityen}
        >
          <option value="new">New</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div className="input-type">
        <label htmlFor="postdescriptionref">Post Description:</label>
        <textarea
          onChange={onChangeHandler6}
          ref={postdescriptionref}
          id="postdescription"
          name="postdescription"
          rows="1"
          className="input-post-type"
          placeholder="Enter post Description"
          value={post.postDescriptionen}
        ></textarea>
      </div>

      <div className="flex-item-center">
        {props.payload.activeStatus == "active" ? (
          <div className="form-check">
            <input
              ref={postradio1ref}
              type="radio"
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input mt-1 mr-2"
              checked
            />
            <label htmlFor="radioDefault1">Active</label>
          </div>
        ) : (
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
        )}

        {props.payload.activeStatus == "inactive" ? (
          <div className="form-check">
            <input
              ref={postradio2ref}
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input mt-1 mr-2"
              checked
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
              ref={postradio2ref}
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

export default updatePostForm;
