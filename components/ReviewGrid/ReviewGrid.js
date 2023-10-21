import React from "react";

function ReviewGrid({filler}) {
  let comment = filler.reviews.filter((item)=> item.activeStatus == true);

  const ReviewStars = (reviewStarCount) => {
    const stars = [];
    console.log(stars);
  
    for (let i = 0; i < reviewStarCount; i++) {
      stars.push(
        <span key={i}>
          <i className="fa fa-star" aria-hidden="true"></i>
        </span>
      );
    }
  
    return stars
  };



  return (
    <div className="review__container">
      <h3>Reviews</h3>
      {comment.map((item)=>(
 <div
 className="review"
 style={{ marginTop: "20px", marginBottom: "50px" }}
>
 <div className="reviwer-content" style={{ marginTop: "20px" }}>
   <div className="reviewer-details">
     <p className="reviewer-name">{item.commentedUser}</p>
     <div className="star-review">
        {
          ReviewStars(item.reviewStarCount)
        }
     </div>
   </div>
 </div>
 <p className="review-content">
   {item.commentBody}
 </p>
</div>
      ))}
     
    </div>
  );
}

export default ReviewGrid;
