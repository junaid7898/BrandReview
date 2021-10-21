import React, { useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../assests/Star"
import ImageThumbnail from "../image_thumbnail/ImageThumbnail";
import ImageViewer from "../image_viewer/ImageViewer";
import {AiFillLike, AiOutlineLike} from "react-icons/ai"
import {IoMdNotifications, IoMdNotificationsOutline} from "react-icons/io"
import { useSelector } from "react-redux";
const Review = ({review}) => {
const [clikedImage, setClickedImage] = useState(null)


  const {client} = useSelector(state => state.client) 

  return (
    review ?
    <div className="reviewComponent">
      {/* row directioned profile intro and images */}
      <div className="reviewComponent__profile">
        {/* it containes profile img, name, rating, label, and pictures */}
        <div className="reviewComponent__profile__intro">
          <img src={review.user.profileImage} alt="profile Img" />
          <div className="reviewComponent__profile__intro__name">
            <Link to={`/user/${review.user.id}`}>{review.user.name}</Link>
            <div className="reviewComponent__profile__intro__name__rating">
              {/* TODO star icon and rating */}
                <Star starLines="#357BCE" starGradient1="#357BCE" starGradiet2="#357BCE"/>
                <h4>{review.ratingCount}</h4>
            </div>
          </div>
          {
            !review.isResolved &&
            <div className="reviewComponent__profile__intro__review-label">
                {/* TODO wether review is a complaint/thanked/resolved */}
                <p>Resolved</p>
            </div>
          }
        </div>

        <div className="reviewComponent__profile__pics">
          {/* import component image preview */}
          {review.images.map((image, index) =>{
          return (
              <div id = {index} onClick = {() => {
                setClickedImage(image)
              }}>
                <ImageThumbnail image = {image} />
              </div>
              )
        }
          )}
                {
                clikedImage !== null ?  
                  <ImageViewer image={clikedImage} setImage={setClickedImage} />
                :
                  null
                }
        </div>


      </div>

      <div className="reviewComponent__text">
          <p>{review.message}</p>
      </div>
      <div className="reviewComponent__buttons">
        <div className="reviewComponent__buttons__button ">
          {
            client && client.type.includes("user") && client.user.likedReviews.includes(review.id) 
            ?
              <AiFillLike className="reviewComponent__buttons__button-liked"/>
            :
              <AiOutlineLike className="reviewComponent__buttons__button-like"/>
          }
            
        </div>
        <div className="reviewComponent__buttons__button ">
          {
            client && client.type.includes("user") && client.user.followedReviews.includes(review.id)
            ?
              <IoMdNotifications className="reviewComponent__buttons__button-following" />
            :
              <IoMdNotificationsOutline className="reviewComponent__buttons__button-follow" />
          }  
        </div>
        <div className="reviewComponent__buttons__likeCount">
          <p>{review.likeCount}</p>
        </div>

      </div>
    </div>
    :
      null
  );
};

export default Review;
