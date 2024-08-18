"use client";

import "@/assets/css/travels.css";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import CoverElement from "@/components/CoverElement/CoverElement";
import PostBlogGrid from "@/components/PostBlogGrid/PostBlogGrid";
import PostSideBar from "@/components/PostSideBar/PostSideBar";
import BlogSidebarWrap from "@/components/BlogSidebarWrap/BlogSidebarWrap";
import FrontFooter from "@/components/FrontFooter/FrontFooter";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialData as setinitialPosts } from "@/app/redux/features/postFilter/postFilterSlice";
import { selectDataPublic as selectPosts } from "@/apiservices/postapiservices";
import { isAdmin } from "@/apiservices/checklogin";
import Loader from "@/components/loader/Loader";

function BlogPage(props) {
  const [admin, setAdmin] = useState();

  const dispatch = useDispatch();
  const filteredPostData = useSelector((state) => state.postFilter.value);
  useEffect(() => {
    async function settingData() {
      try {
        const dataArray3 = await selectPosts({
          activeStatus: "active",
        });

        dispatch(setinitialPosts(dataArray3.data));
      } catch (error) {
        console.error("Error in settingData:", error);
      }
    }
    settingData();

    async function fetchData() {
      try {
        const payload = await isAdmin();
        setAdmin(payload);
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

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

  if (filteredPostData) {
    return (
      <>
        <div className="travelpage-container">
          <HeaderFront scrolledStatus={scrolled} />
          <CoverElement />

          <BlogSidebarWrap>
            <PostBlogGrid detailData={filteredPostData} />
            <PostSideBar />
          </BlogSidebarWrap>
        </div>
        <FrontFooter />
      </>
    );
  } else {
    return <Loader />;
  }
}

export default BlogPage;
