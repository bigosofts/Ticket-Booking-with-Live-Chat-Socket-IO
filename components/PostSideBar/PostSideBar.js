"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isAdmin } from "@/apiservices/checklogin";
import { setInitialData as setinitialPosts } from "@/app/redux/features/postFilter/postFilterSlice";
import { selectDataPublic as selectPosts } from "@/apiservices/postapiservices";

function PostSideBar(props) {
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

  function niceDate(date) {
    var isoTime = date;
    var date = new Date(isoTime);

    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  if (filteredPostData) {
    return (
      <div className="sidebar-travelpage">
        <div className="category fix">
          <h2>Category</h2>
          {filteredPostData.slice(0, 5).map((item, i) => (
            <div key={i} className="category_item fix">
              <span className="float_left">
                <Link href="/posts">{item.postCategory.en}</Link>
              </span>
              <span className="float_right">
                {
                  filteredPostData.filter(
                    (single) => single.postCategory.en == item.postCategory.en
                  ).length
                }
              </span>
            </div>
          ))}
        </div>

        <div style={{ width: "80%", margin: "0px auto" }} className="recent">
          <h2 style={{ marginTop: "50px", marginBottom: "40px" }}>
            Recent Posts
          </h2>
          {filteredPostData.slice(0, 3).map((item, i) => (
            <div key={i} className="images">
              <img src={item.postImageLink} alt="" />
              <Link href={`/posts/${item.postId}`}>{item.postTitle.en}</Link>
              <p>{niceDate(item.postCreatedDate)}</p>
            </div>
          ))}
        </div>

        <div style={{ width: "80%", margin: "0px auto" }} className="tags">
          <h2>Tags</h2>
          {filteredPostData.slice(0, 6).map((item, i) => (
            <Link href={`/posts/${item.postId}`}>{item.postId}</Link>
          ))}
        </div>
      </div>
    );
  } else {
    return <div> Loading ... </div>;
  }
}

export default PostSideBar;
