import React, { useState } from "react";

const BrandReviews = ({ comments }) => {
  const [viewReplies, setViewReplies] = useState(false);

  return (
    <div className="brand__review">
      {comments.map((item) => {
        return (
          <div className="brand__review__comments">
            <div className="brand__review__comments__intro">
              <div className="brand__review__comments__intro__profile">
                  <img src={item.userImg} className = 'brand__review__comments__intro__profile__img'/>
                <div className="brand__review__comments__intro__profile__name-rating">
                  <h2>{item.userName}</h2>
                  <h3>{item.userRatings}</h3>
                  <div className="brand__review__comments__intro__profile__name-rating__comment">
                     <p>{item.comment}</p>
                  </div>
                </div>
              </div>
              
            </div>
              <div className="brand__review__replies">
                {item.commentReplies.map((item) => {
                  return (
                    <div className="brand__review__replies__reply">
                      <img src={item.userImg} />
                      <div className="brand__review__replies__reply__comment">
                        <p>{item.reply}</p>
                        <div className="brand__review__replies__reply__comment__like">
                            <h4>Like</h4>
                            <h4>reply</h4>
                        </div>
                      </div>
                      
                    </div>
                  );
                })}
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandReviews;
