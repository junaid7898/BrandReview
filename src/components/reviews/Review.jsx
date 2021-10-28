import React, { useEffect, useRef, useState } from "react";
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
import {FaRegSmile} from 'react-icons/fa'
import {FcSettings} from 'react-icons/fc'
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import {statusAction} from "../../Redux/statusSlice"
const Review = ({review, setUpdatedReview, commentsAllowed, brandData, setBrandData}) => {
  const dispatch = useDispatch()
  const {client} = useSelector(state => state.client) 
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentIsSending, setCommentIsSending] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(false)
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(0)
  const [isEditingReview, setIsEditingReview] = useState(false)
  const [clikedImage, setClickedImage] = useState(null)
  const [rating, setRating] = useState(null)
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
    let updatedUser = null
    let updatedReview = null
    let updateBrand = brandData
    if(client.user.resolvedReviews.find( id => id === review.id )){
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          resolvedReviews:[...client.user.resolvedReviews.filter(id => id !== review.id)]
        }
      }))
      updatedReview = {
        ...review,
        isResolved: false
      }
      console.log(review)
      updateBrand = {
        ...brandData,
        resolveCount: brandData.resolveCount - 1
      }
    }
    else{
      updatedUser = dispatch(clientActions.setClient({
        ...client,
        user:{
          ...client.user,
          resolvedReviews:[...client.user.resolvedReviews, review.id]
        }
      }))
      updatedReview = {
        ...review,
        isResolved: true
      }
      updateBrand = {
        ...brandData,
        resolveCount: brandData.resolveCount +  1
      }
    }
    setUpdatedReview({
      ...updatedReview,
      brand: updateBrand
    })
    setBrandData(updateBrand)
    axios.post(`/review/resolve/${review.id}`, {
      user: updatedUser.payload.user,
      review: updatedReview,
      brand: updateBrand
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

  const reviewChanges = useRef({
    text: "",
    rating: null
  })


  useEffect(() =>{
    if(review){
      reviewChanges.current={
        text: review.message,
        rating: review.ratingCount
      }
    }
  },[review])

  const handleConfirmChanges = () =>{
    // dispatch(statusAction.setNotification({
    //   message: "updating review",
    //   type:"loading"
    // }))
    setIsEditingReview(false)
    const changes = {
      message: reviewChanges.current.text,
      ratingCount: reviewChanges.current.rating
    }
    const updatedReview = {
      ...review,
      ...changes
    }

    setUpdatedReview(updatedReview)

    axios.patch(`review/${review.id}`,{...changes})
    .then(({data}) =>{
      console.log(data)
    })
    .catch(err =>{
      console.log(err)
    })



  }

  const handleCancelChanges = () =>{
    setIsEditingReview(false)
    reviewChanges.current = {
      message: "",
      rating: null
    }
  }
  
  useEffect(() => {
    if(rating){
      reviewChanges.current.rating = rating
    }
  }, [rating])

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
              {
                isEditingReview
                ?
                  <div>
                    <ReactStars
                      count = {5}
                      onChange = {setRating}
                      size = {30}  
                      isHalf = {true}
                      activeColor="#ffd700"
                    />
                  </div>
                :
                <div className="reviewComponent__profile__intro__name__rating">
                  <Star starLines="#357BCE" starGradient1="#357BCE" starGradiet2="#357BCE"/>
                  <h4>{review.ratingCount}</h4>
                </div>
              }
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
        {
          isEditingReview 
          ?
            <textarea id="edit_textarea" onChange={ (e) => reviewChanges.current.text = e.target.value} className="reviewComponent__text__edit" defaultValue={review.message} placeholder="Enter your changes here" rows={4} name="" id="" />
          :
            <p className="reviewComponent__text__para">{review.message}</p> 
        }
        </div>
        {
          isEditingReview &&
          <div className="reviewComponent__text__edit__buttons">
            <button onClick={() => handleConfirmChanges()}>Confirm</button>
            <button onClick={() => handleCancelChanges()}>Cancel</button>
          </div>
        }
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
                <Button onClick={handleResolve} className="reviewComponent__buttons__button" client={client} type={"user"}>
                  {
                    client.type.includes("user") && !review.isThanked && client.user.id === review.user.id
                    ?
                      client.user.resolvedReviews.includes(review.id)
                      ?
                        <TiTick  className="reviewComponent__buttons__button-resolved" />
                      :
                        <TiTick className="reviewComponent__buttons__button-resolve" />
                    :
                      null
                  }  
                </Button>
                <Button className="reviewComponent__buttons__button " onClick = {handleThank} client={client} type={"user"}>
                {
                  (review && client.type.includes("user")  && client.user.id === review.user.id) 
                  ?
                    review.isResolved
                    ?
                      review.isThanked 
                      ?
                        <FaRegSmile  className = 'reviewComponent__buttons__button-thanked' />
                      :
                        <FaRegSmile  className = 'reviewComponent__buttons__button-thank' />
                    :
                      null
                  :
                    null
                }
                </Button>
              </>
              :
                null
            }
            
        </div>
        <div className="reviewComponent__edit" onClick={() => setIsEditingReview(!isEditingReview)}>
        {
          client ?
            (review && client.type.includes("user"))
            ?
              review.user.id === client.user.id
              ?
                isEditingReview 
                ?
                  <FcSettings  className = 'reviewComponent__edit-editing' />
                :
                  <FcSettings  className = 'reviewComponent__edit-edit' />
              :
                null
                
            :
              null
          : null
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
