"use client";
import Link from "next/link";
function PostBlogGrid({ detailData }) {
  return (
    <div className="blog4">
      {detailData.map((item) => (
        <Link href={`/posts/${item.postId}`}>
        <div className="news_item">
          
            <img src={item.postImageLink} alt="" />
          

          <h2>{item.postTitle.en}</h2>
          <p>{item.postDescription.en.substring(0, 500)}</p>

          <Link href={`/posts/${item.postId}`}>Read more</Link>
        </div>
        </Link>
      ))}

      {/* <div className="pagination">
        <a href="#">
          <img width="32px" height="32px" src="/images/prev1.png" alt="" />
        </a>
        <a href="blog.html">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">
          <img width="32px" height="32px" src="/images/next1.png" alt="" />
        </a>
      </div> */}
    </div>
  );
}

export default PostBlogGrid;
