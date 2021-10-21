import React, { useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../assests/Star"
import ImageThumbnail from "../image_thumbnail/ImageThumbnail";
import ImageViewer from "../image_viewer/ImageViewer";
import {AiFillLike, AiOutlineLike} from "react-icons/ai"
import {IoMdNotifications, IoMdNotificationsOutline} from "react-icons/io"
import {FiSend} from 'react-icons/fi'
import { useSelector } from "react-redux";
const Review = ({review}) => {
  const [clikedImage, setClickedImage] = useState(null)
  const {client} = useSelector(state => state.client) 
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const commentsAllowed = true

  return (
    review ?
    <div className="reviewComponent-container">
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
      
      {
        commentsAllowed && client
        ?
          <div className="reviewComponent__comments">
            <div className="reviewComponent__comments__writeComment">
              <Link to={`/user/${client.user.id}`}><img className="reviewComponent__comments__writeComment__userImage" src={client.user.profileImage} alt="" /></Link>
              <div className="reviewComponent__comments__writeComment__input">
                <input onChange={(e) => setCommentText(e.target.value)} className="" type="text" placeholder="Enter Comment" />
                <FiSend className={`reviewComponent__comments__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__comments__writeComment__sendIcon-hide`}`}/>
              </div>
            </div>
            {
              review.comments.length > 0 
              ?
                showComments ?
                <div className="reviewComponent__comments__array">
                  hello
                </div>
                :
                <button onClick={() => setShowComments(true)}>
                  Show Comments
                </button>
              :
                null
            }
          </div>
        :
          null
      }
      
    </div>
    :
      null
  );
};

export default Review;
