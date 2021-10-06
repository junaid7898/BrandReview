import React, { useState } from "react";
import Profile from "../../assests/images/Profile Image.png";
import Star from '../../assests/images/Star.png'
import ImagePreview from "../image_preview/ImagePreview";
import {AiFillStar} from 'react-icons/ai'

const Review = () => {
  const review = {
    profileImg: Profile,
    name: "Ali Abbasi",
    rating: '5.0',
    reviewType: "resolved",
    isReviewType: true,
    images: [Profile, Profile, Profile],
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  };

  const removeImage = (i) => {
    review.images.filter((img, index) => index !== i)
  }
  return (
    <div className="review">
      {/* row directioned profile intro and images */}
      <div className="review__profile">
        {/* it containes profile img, name, rating, label, and pictures */}
        <div className="review__profile__intro">
          <img src={review.profileImg} alt="profile Img" />
          <div className="review__profile__intro__name">
            <p>{review.name}</p>
            <div className="review__profile__intro__name__rating">
              {/* TODO star icon and rating */}
                <AiFillStar size = {24} color = '#357BCE'/>
                <h4>{review.rating}</h4>
            </div>
          </div>
          {
              review.isReviewType ? 
              (
                <div className="review__profile__intro__review-label">
                    {/* TODO wether review is a complaint/thanked/resolved */}
                    <p>{review.reviewType}</p>
                </div>
              )
              :
              (
                  null
              )
          }
          
        </div>

        <div className="review__profile__pics">
          {/* import component image preview */}
          {review.images.map((img, index) => 
              <ImagePreview image = {img} index = {index} removeImage = {removeImage}/>
          )}
        </div>
      </div>

      <div className="review__text">
          <p>{review.review}</p>
      </div>
    </div>
  );
};

export default Review;
