import "@/assets/css/travels.css";
import HeaderFront from "@/components/HeaderFront/HeaderFront";
import CoverElement from "@/components/CoverElement/CoverElement";
import SinglePost from "@/components/PostBlogGrid/SinglePost";
import PostSideBar from "@/components/PostSideBar/PostSideBar";
import BlogSidebarWrap from "@/components/BlogSidebarWrap/BlogSidebarWrap";
import FrontFooter from "@/components/FrontFooter/FrontFooter";

function SinglePostPage({ params }) {
  return (
    <>
      <div style={{marginBottom: "-100px"}} className="travelpage-container">
        <HeaderFront />
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
