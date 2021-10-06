import React, { useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

const BrandReviews = ({ comments }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [onClickImage, setOnClickImage] = useState(false);

  const fileSelectHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="brand__review">
      {uploadImage === null ? null : (
        <div className="brand__review__image">
          <img
            src={uploadImage}
            className="brand__review__image__uploaded"
            onClick={() => {
              setOnClickImage(true);
            }}
            alt = 'brand'
          />
          {onClickImage ? (
            <div className="brand__review__image__zoom-view">
              <div className="brand__review__image__zoom-view__close-icon">
                <GrClose
                  size={24}
                  className= "brand__review__image__zoom-view__close-icon__icon" 
                  onClick={() => setOnClickImage(false)}
                />
              </div>
              <img
                src={uploadImage}
                className="brand__review__image__zoom-view__big-image"
                alt = 'brand'
              />
            </div>
          ) : null}
        </div>
      )}

      <div className="brand__review__your-review">
        <input type="text" placeholder="Write Your Review" name="review" />
        <div className="brand__review__your-review__icons">
          <label htmlFor="picUpload">
            <IoMdAttach
              size={24}
              className="brand__review__your-review__icons__upload-icon"
            />
          </label>
          <input
            id="picUpload"
            type="file"
            name="picUpload"
            accept="images/*"
            onChange={(e) => {
              fileSelectHandler(e);
            }}
          />
          <FaTelegramPlane size={24} />
        </div>
      </div>
      {comments.map((item) => {
        return (
          <div className="brand__review__comments">
            <div className="brand__review__comments__intro">
              <div className="brand__review__comments__intro__profile">
                <img
                  src={item.userImg}
                  className="brand__review__comments__intro__profile__img"
                  alt = 'brand'
                />
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
                    <img src={item.userImg} alt = 'brand'/>
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
            <div className="brand__review__replies__my-comment">
              <img src={item.userImg} alt = 'brand' />
              <input
                type="text"
                placeholder="write your comment"
                name="comment"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandReviews;
