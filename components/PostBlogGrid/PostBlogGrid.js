"use client";
import Link from "next/link";
function PostBlogGrid({ detailData }) {
  function richtextoutput(text) {
    return (
      <div
        className="richtext"
        style={{ width: "100%", textAlign: "justify", padding: "20px 40px" }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
  return (
    <div className="blog4">
      {detailData.map((item) => (
        <Link href={`/posts/${item.postId}`}>
          <div className="news_item">
            <img src={item.postImageLink} alt="" />

            <h2>{item.postTitle.en}</h2>

            {richtextoutput(item.postDescription.en.substring(0, 500))}

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
