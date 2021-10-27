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
import Button from "./Button";
const Review = ({review, setUpdatedReview, commentsAllowed}) => {
  const [clikedImage, setClickedImage] = useState(null)
  const {client} = useSelector(state => state.client) 
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentIsSending, setCommentIsSending] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(false)
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const handleCommentUser = () =>{
    setCommentIsSending(true)
    const reqObj = {
      message: commentText,
      review: review.id,
      user: client.user.id,
      depth: 0,
      type: "user"
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
  const handleCommentBrand = () =>{
    setCommentIsSending(true)
    const reqObj = {
      message: commentText,
      review: review.id,
      brand: client.brand._id,
      depth: 0,
      type: "brand"
    }
    console.log(reqObj)
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
      data.brand = client.brand
      setComments([data, ...comments])
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

  const handleResolve = () => {
    let updatedBrand = null
    let updatedReview = null
    if(client.brand.resolvedReviews.find( id => id === review.id )){
      updatedBrand = dispatch(clientActions.setClient({
        ...client,
        brand:{
          ...client.brand,
          resolvedReviews:[...client.brand.resolvedReviews.filter(id => id !== review.id)]
        }
      }))
      updatedReview = {
        ...review,
        isResolved: false
      }
    }
    else{
      updatedBrand = dispatch(clientActions.setClient({
        ...client,
        brand:{
          ...client.brand,
          resolvedReviews:[...client.brand.resolvedReviews, review.id]
        }
      }))
      updatedReview = {
        ...review,
        isResolved: true
      }
    }
    setUpdatedReview(updatedReview)
    axios.post(`/review/resolve/${review.id}`, {
      brand: updatedBrand.payload.brand,
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

  const handleShowComments = (bool) =>{
    setShowComments(bool)
    if(page === 0){
      setCommentsLoading(bool)
    }
    if(!bool){
      setComments([])
      setPage(0)
      return
    }
    if(page > 0){
      setMoreCommentsLoading(true)
    }
    const options = {
      page: page + 1,
      limit: 3,
      populate:"user.User,brand.Brand"
    }
    const filters={
      review: review._id
    }
    axios.post("/comment/query",{
      options, filters
    })
    .then(({data})=>{
      setCommentsLoading(false)
      setMoreCommentsLoading(false)
      console.log(data)
      setComments([...comments, ...data.results])
      setPage(page + 1)
      setTotalComments(data.totalResults)
    })
    .catch(err => {
      setMoreCommentsLoading(false)
      setCommentsLoading(false)
      console.log(err)
    })

  }

  const handleCommentLike = (comment) =>{
    let updatedUser = null
    let updatedComment = null
    if(client.user.likedComments.find( id => id === comment.id )){
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          likedComments:[...client.user.likedComments.filter(id => id !== comment.id)]
        }
      }))
      updatedComment = {
        ...comment,
        likeCount: comment.likeCount - 1
      }
    }
    else{
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          likedComments:[...client.user.likedComments, comment.id]
        }
      }))
      updatedComment = {
        ...comment,
        likeCount: comment.likeCount + 1
      }
    }


    setComments([...comments.map(item =>{
      if(item.id === comment.id){
        return updatedComment
      }
      return item
    })])




    axios.post('/comment/like' ,{
      user: updatedUser.payload.user,
      comment: updatedComment
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
            <div className="reviewComponent__profile__intro__status">
              {
                review.isResolved &&
                <div className="reviewComponent__profile__intro__status__review-label">
                    {/* TODO wether review is a complaint/thanked/resolved */}
                    <p>Resolved</p>
                </div>
              }
              {
                review.isThanked &&
                <div className="reviewComponent__profile__intro__status__thank-label">
                    {/* TODO wether review is a complaint/thanked/resolved */}
                    <p>Thanked</p>
                </div>
              }
            </div>
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
            <p>Popularity: {review.likedByUsers.length}</p>
          </div>
            {
              client ?
              <>
                <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {handleLike}>
                  {
                    client.type.includes("user") 
                    ?
                      client.user.likedReviews.includes(review.id) 
                      ?
                        <AiFillLike  className="reviewComponent__buttons__button-liked"/>
                      :
                        <AiOutlineLike className="reviewComponent__buttons__button-like"/>
                    :
                      null
                  }
                </Button>
                <Button onClick={handleFollow} className="reviewComponent__buttons__button" client={client} type={"user"}>
                  {
                    client.type.includes("user") 
                    ?
                      client.user.followedReviews.includes(review.id)
                      ?
                        <IoMdNotifications  className="reviewComponent__buttons__button-following" />
                      :
                        <IoMdNotificationsOutline className="reviewComponent__buttons__button-follow" />
                    :
                      null
                  }  
                </Button>
                <Button className="reviewComponent__buttons__button " onClick = {handleThank} client={client} type={"user"}>
                {
                  review && client.type.includes("brand")
                  ?
                    review.isResolved
                    ?
                      (
                        review.isThanked ?
                        
                        <TiTick  className = 'reviewComponent__buttons__button-thanked' />
                        :
                        <TiTick  className = 'reviewComponent__buttons__button-thank' />
                      )
                    :
                      null
                      
                  :
                      null
                }
                </Button>
                <Button onClick={handleResolve} className="reviewComponent__buttons__button" client={client} type={"brand"}>
                  {
                    client.type.includes("brand") && !review.isThanked
                    ?
                      client.brand.resolvedReviews.includes(review.id)
                      ?
                        <TiTick  className="reviewComponent__buttons__button-resolved" />
                      :
                        <TiTick className="reviewComponent__buttons__button-resolve" />
                    :
                      null
                  }  
                </Button>
              </>
              :
                null
            }
            
        </div>
      </div>
      
      <div className="review__comments-container">
      {
        commentsAllowed && client
        ?

          <div className="reviewComponent__comments">
            {
              review.comments.length > 0 
              ?
                <div className="reviewComponent__comments__array">
                  {
                    
                      comments.map(comment =>{
                        if(comment.type === "user"){
                          return <div className="reviewComponent__comments__array__item">
                            <div className="reviewComponent__comments__array__item__upper">
                              <Link to={`user/${comment.user.id}`}> <img src={comment.user.profileImage} alt="logo" className="reviewComponent__comments__array__item__img" /></Link>
                              <div className="reviewComponent__comments__array__item__text">{comment.message}</div>
                            </div>
                            <div className="reviewComponent__comments__array__item__lower">
                                <div className="reviewComponent__comments__array__item__likeCount">
                                  Likes: {comment.likeCount}
                                </div>
                                <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {() => handleCommentLike(comment)}>
                                {
                                  client.type.includes("user") 
                                  ?
                                    client.user.likedComments.includes(comment.id) 
                                    ?
                                      <AiFillLike  className="reviewComponent__buttons__button-liked"/>
                                    :
                                      <AiOutlineLike className="reviewComponent__buttons__button-like"/>
                                  :
                                    null
                                }
                                </Button>
                            </div>
                          </div>
                        }
                        else if(comment.type ==="brand"){
                          return <div className="reviewComponent__comments__array__item">
                            <div className="reviewComponent__comments__array__item__upper">
                              <img src={comment.brand.logo} alt="logo" className="reviewComponent__comments__array__item__img" />
                              <div className="reviewComponent__comments__array__item__text">{comment.message}</div>
                            </div>
                            <div className="reviewComponent__comments__array__item__lower">
                                <div className="reviewComponent__comments__array__item__likeCount">
                                  Likes: {comment.likedByUsers.length}
                                </div>
                                <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {() => handleCommentLike}>
                                {
                                  client.type.includes("user") 
                                  ?
                                    client.user.likedComments.includes(comment.id) 
                                    ?
                                      <AiFillLike  className="reviewComponent__buttons__button-liked"/>
                                    :
                                      <AiOutlineLike className="reviewComponent__buttons__button-like"/>
                                  :
                                    null
                                }
                                </Button>
                            </div>
                          </div>
                        }
                      }
                    )
                    // :
                    //   <LoadingIndicator />
                  }
                  <div className="reviewComponent__comments__moreComments">
                  {
                    totalComments > comments.length && comments.length > 0 && showComments &&
                    <button disabled={commentsLoading} onClick={() => handleShowComments(true)}>
                      Load More Comments
                      {
                        moreCommentsLoading &&
                        <LoadingIndicator />
                      }
                    </button>
                  }
                  </div>
                </div>
                :
                  null
            }
            <div className="reviewComponent__comments__showComments">
              {
                showComments ?
                  <button onClick={() => handleShowComments(false)}>
                    Hide Comments
                  </button>
                :
                  <button onClick={() => handleShowComments(true)}>
                    Show Comments
                  </button>

              }
              {
                      commentsLoading &&
                      <LoadingIndicator />
              }
            </div>
            <div className="reviewComponent__comments__writeComment-container">
            {
              client.type.includes("user")
              ?
                <div className="reviewComponent__comments__writeComment">
                  <Link to={`/user/${client.user.id}`}><img className="reviewComponent__comments__writeComment__userImage" src={client.user.profileImage} alt="" /></Link>
                  <div className="reviewComponent__comments__writeComment__input">
                    <input onChange={(e) => setCommentText(e.target.value)} value={commentText} className="" type="text" placeholder="Enter Comment" />
                      {
                        !commentIsSending 
                        ?
                          <FiSend onClick={handleCommentUser} className={`reviewComponent__comments__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__comments__writeComment__sendIcon-hide`}`}/>
                        : 
                          <LoadingIndicator className="reviewComponent__comments__writeComment__sendIcon-loader" />
                      }
                  </div>
                </div>  
              :
              client.type.includes("brand") 
              ?
                <div className="reviewComponent__comments__writeComment">
                    <Link to={`/brand/${client.brand.id}`}><img className="reviewComponent__comments__writeComment__userImage" src={client.brand.logo} alt="" /></Link>
                    <div className="reviewComponent__comments__writeComment__input">
                      <input onChange={(e) => setCommentText(e.target.value)} value={commentText} className="" type="text" placeholder="Enter Comment" />
                        {
                          !commentIsSending 
                          ?
                            <FiSend onClick={handleCommentBrand} className={`reviewComponent__comments__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__comments__writeComment__sendIcon-hide`}`}/>
                          : 
                            <LoadingIndicator className="reviewComponent__comments__writeComment__sendIcon-loader" />
                        }
                    </div>
                  </div>  
              :
                      null
            }
            </div>
          </div>
        :
          null
      }
      </div>
      
    </div>
    :
      null
  );
};

export default Review;
