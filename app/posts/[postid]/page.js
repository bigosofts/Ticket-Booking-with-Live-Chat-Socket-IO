"use client";
import "@/assets/css/travels.css";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import CoverElement from "@/components/CoverElement/CoverElement";
import SinglePost from "@/components/PostBlogGrid/SinglePost";
import PostSideBar from "@/components/PostSideBar/PostSideBar";
import BlogSidebarWrap from "@/components/BlogSidebarWrap/BlogSidebarWrap";
import FrontFooter from "@/components/FrontFooter/FrontFooter";
import { useState, useEffect } from "react";

function SinglePostPage({ params }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div style={{ marginBottom: "-100px" }} className="travelpage-container">
        <HeaderFront scrolledStatus={scrolled} />
        <CoverElement id={params.postid} />

        <BlogSidebarWrap>
          <SinglePost id={params.postid} />
          <PostSideBar />
        </BlogSidebarWrap>
      </div>
      <FrontFooter />
    </>
  );
}

export default SinglePostPage;
