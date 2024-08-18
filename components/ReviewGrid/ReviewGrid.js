import React from "react";
import "./ReviewGrid.css";

function ReviewGrid({ filler }) {
  function niceDate(isoTime) {
    var date = new Date(isoTime);

    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  let comment = filler.reviews.filter((item) => item.activeStatus == true);

  const ReviewStars = (reviewStarCount) => {
    const stars = [];

    for (let i = 0; i < reviewStarCount; i++) {
      stars.push(
        <span key={i}>
          <i className="fa fa-star" aria-hidden="true"></i>
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="review__container">
      <h3>Reviews</h3>
      {comment.map((item) => (
        <div
          class="comment-cst"
          data-csa-c-id="si7ft7-enwqwv-xrhbo9-alf3yw"
          data-cel-widget="customer_review-R23TOID1L4DP3I"
        >
          <div data-hook="genome-widget" class="style-1">
            <a href="#" class="style-2" data-a-size="small">
              <div aria-hidden="true" class="style-3">
                <div class="style-4">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                    class="style-5"
                    data-src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                  />
                  <noscript class="style-6">
                    <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" />
                  </noscript>
                </div>
              </div>
              <div class="style-7">
                <span class="style-8">{item.commentedUser}</span>
              </div>
            </a>
          </div>
          <div class="style-9">
            <a
              data-hook="review-title"
              class="style-10"
              href="/gp/customer-reviews/R23TOID1L4DP3I/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&amp;ASIN=B08L2TJ8YZ"
            >
              <i data-hook="review-star-rating">
                <div style={{ display: "flex" }} className="star-review">
                  {ReviewStars(item.reviewStarCount)}{" "}
                  <span class="style-14">{item.reviewStarCount < 3 ? "have nice warm experience" : item.reviewStarCount == 3 ? "very good feeling on travel" : item.reviewStarCount > 3 ? "mind Blowing Experience" : ""}</span>{" "}
                </div>
              </i>
            </a>
          </div>
          <span data-hook="review-date" class="style-15">
            Reviewed on {niceDate(item.createdDate)}
          </span>

          <div class="style-22">
            <span data-hook="review-body" class="style-23">
              <div
                data-a-expander-name="review_text_read_more"
                data-a-expander-collapsed-height="300"
                class="style-24"
              >
                <div
                  data-hook="review-collapsed"
                  aria-expanded="false"
                  class="style-25"
                >
                  <span class="style-26">
                  {item.commentBody}
                  </span>
                </div>
                <div class="style-27">
                  <div class="style-28"></div>
                  <a
                    href="javascript:void(0)"
                    data-csa-c-func-deps="aui-da-a-expander-toggle"
                    data-csa-c-type="widget"
                    data-csa-interaction-events="click"
                    data-hook="expand-collapse-read-more-less"
                    aria-label="Toggle full review text"
                    aria-expanded="false"
                    role="button"
                    data-action="a-expander-toggle"
                    class="style-29"
                    data-a-expander-toggle='{"allowLinkDefault":true, "expand_prompt":"Read more", "collapse_prompt":"Read less"}'
                    data-csa-c-id="lk2nzg-cj710l-xn26sr-l9p4by"
                  >
                    <i class="style-30"></i>
                    <span class="style-31">Read more</span>
                  </a>
                </div>
              </div>
            </span>
          </div>
        </div>
        // <div
        //   className="review"
        //   style={{ marginTop: "20px", marginBottom: "50px" }}
        // >
        //   <div className="reviwer-content" style={{ marginTop: "20px" }}>
        //     <div className="reviewer-details">
        //       <p className="reviewer-name">{item.commentedUser}</p>
        //       <div className="star-review">
        //         {ReviewStars(item.reviewStarCount)}
        //       </div>
        //     </div>
        //   </div>
        //   <p className="review-content">{item.commentBody}</p>
        // </div>
      ))}
    </div>
  );
}

export default ReviewGrid;
