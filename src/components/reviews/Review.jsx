import React, { useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../assests/Star"
import ImageThumbnail from "../image_thumbnail/ImageThumbnail";
import ImageViewer from "../image_viewer/ImageViewer";
import {AiFillLike, AiOutlineLike} from "react-icons/ai"
import {IoMdNotifications, IoMdNotificationsOutline} from "react-icons/io"
import {FiSend} from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";
import {axios} from "../../axios/axiosInstance";
import {clientActions} from "../../Redux/clientslice/clientSlice"
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import {TiTick} from 'react-icons/ti'
const Review = ({review, setUpdatedReview}) => {
  const [clikedImage, setClickedImage] = useState(null)
  const {client} = useSelector(state => state.client) 
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentIsSending, setCommentIsSending] = useState(false)
  const commentsAllowed = false
  const dispatch = useDispatch()
  const handleComment = () =>{
    setCommentIsSending(true)
    const reqObj = {
      message: commentText,
      review: review.id,
      user: client.user.id,
      depth: 0,
    }
    axios.post("/comment",reqObj,{
      headers:{
        "role" : client.type,
        "authorization" : `bearer ${client.tokens.access.token}`
      }
    })
    .then(({data})=>{
      setCommentIsSending(false)
      console.log(data)
      setCommentText("")
    })
    .catch(err => {
      console.log(err)
      setCommentIsSending(false)
    })
  }
 

  const handleLike = () =>{
    let updatedUser = null
    let updatedReview = null
    if(client.user.likedReviews.find( id => id === review.id )){
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          likedReviews:[...client.user.likedReviews.filter(id => id !== review.id)]
        }
      }))
      updatedReview = {
        ...review,
        likedByUsers: [...review.likedByUsers.filter(item => item.user !== client.user.id)]
      }
    }
    else{
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          likedReviews:[...client.user.likedReviews, review.id]
        }
      }))

      const newEntry = {
        user: client.user.id,
        time: new Date()
      }

      updatedReview = {
        ...review,
        likedByUsers: [...review.likedByUsers, newEntry]
      }
    }

    
    setUpdatedReview(updatedReview)
    console.log(updatedUser.payload.user)
    axios.post(`/review/like/${review.id}`, {
      user: updatedUser.payload.user,
      review: updatedReview
    },{
      headers:{
        'role' : client.type,
        'authorization' : `bearer ${client.tokens.access.token}`
      }
    })
    .then(({data}) => {

      console.log(data)

    })

  }


  const handleFollow = () =>{
    
    let updatedUser = null
    let updatedReview = null
    if(client.user.followedReviews.find( id => id === review.id )){
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          followedReviews:[...client.user.followedReviews.filter(id => id !== review.id)]
        }
      }))
      console.log(review);
      updatedReview = {
        ...review,
        followedByUsers:[...review.followedByUsers.filter(id => id !== client.user.id)]
      }
    }
    else{
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          followedReviews:[...client.user.followedReviews, review.id]
        }
      }))
      updatedReview = {
        ...review,
        followedByUsers: [...review.followedByUsers, client.user.id]
      }
    }
    console.log(updatedUser.payload.user.followedReviews);
    setUpdatedReview(updatedReview)
    axios.post(`/review/follow/${review.id}`, {
      user: updatedUser.payload.user,
      review: updatedReview
    },{
      headers:{
        'role' : client.type,
        'authorization' : `bearer ${client.tokens.access.token}`
      }
    })
    .then(({data}) => {

      console.log(data)

    })

  }

  const handleThank = () => {
    let updatedUser = null
    let updatedReview = null
    if(client.user.thankedReviews.find( id => id === review.id )){
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          thankedReviews:[...client.user.thankedReviews.filter(id => id !== review.id)]
        }
      }))
      updatedReview = {
        ...review,
        isThanked: false
      }
    }
    else{
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          thankedReviews:[...client.user.thankedReviews, review.id]
        }
      }))
      updatedReview = {
        ...review,
        isThanked: true
      }
    }
    setUpdatedReview(updatedReview)
    axios.post(`/review/thank/${review.id}`, {
      user: updatedUser.payload.user,
      review: updatedReview
    },{
      headers:{
        'role' : client.type,
        'authorization' : `bearer ${client.tokens.access.token}`
      }
    })
    .then(({data}) => {

      console.log(data)

    })
  }


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
              review.isResolved &&
              <div className="reviewComponent__profile__intro__review-label">
                  {/* TODO wether review is a complaint/thanked/resolved */}
                  <p>Resolved</p>
              </div>
            }
            {
              review.isThanked &&
              <div className="reviewComponent__profile__intro__thank-label">
                  {/* TODO wether review is a complaint/thanked/resolved */}
                  <p>Thanked</p>
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
          <div className="reviewComponent__buttons__likeCount">
            <p>{review.likedByUsers.length}</p>
          </div>
          <div className="reviewComponent__buttons__button ">
            {
              client && client.type.includes("user") && client.user.likedReviews.includes(review.id) 
              ?
                <AiFillLike onClick= {handleLike} className="reviewComponent__buttons__button-liked"/>
              :
                <AiOutlineLike onClick= {handleLike} className="reviewComponent__buttons__button-like"/>
            }
              
          </div>
          <div className="reviewComponent__buttons__button ">
            {
              client && client.type.includes("user") && client.user.followedReviews.includes(review.id)
              ?
                <IoMdNotifications onClick={handleFollow} className="reviewComponent__buttons__button-following" />
              :
                <IoMdNotificationsOutline onClick={handleFollow} className="reviewComponent__buttons__button-follow" />
            }  
          </div>
          <div className="reviewComponent__buttons__button " onClick = {handleThank}>
            {
              client && client.type.includes("user") && review.isResolved &&
                (
                review.isThanked ?
                <TiTick  className = 'reviewComponent__buttons__button-thanked' />
                :
                <TiTick  className = 'reviewComponent__buttons__button-thank' />
                )
              
            }
          </div>
        </div>
      </div>
      
      {
        commentsAllowed && client
        ?
          showComments 
          ?
          <div className="reviewComponent__comments">
            <div className="reviewComponent__comments__writeComment">
              <Link to={`/user/${client.user.id}`}><img className="reviewComponent__comments__writeComment__userImage" src={client.user.profileImage} alt="" /></Link>
              <div className="reviewComponent__comments__writeComment__input">
                <input onChange={(e) => setCommentText(e.target.value)} value={commentText} className="" type="text" placeholder="Enter Comment" />
                  {
                    !commentIsSending 
                    ?
                      <FiSend onClick={handleComment} className={`reviewComponent__comments__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__comments__writeComment__sendIcon-hide`}`}/>
                    : 
                      <LoadingIndicator className="reviewComponent__comments__writeComment__sendIcon-loader" />
                  }
              </div>
            </div>
            {
              review.comments.length > 0 
              ?
                <div className="reviewComponent__comments__array">
                  hello
                </div>
                :
                  null
            }
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
  );
};

export default Review;
