import React, { useEffect, useRef, useState } from 'react'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import Button from './Button'
import {AiFillLike, AiOutlineLike} from "react-icons/ai"
import VerifiedCommentSvg from "../../assests/verified-comment-svg";
import { Link } from 'react-router-dom';
import { axios } from '../../axios/axiosInstance';
import { FiSend } from 'react-icons/fi';
function Comments({setHeight, commentsAllowed, review, comments, client, showComments, commentsLoading, moreCommentsLoading, totalComments, handleCommentLike, handleShowComments, }) {
    useEffect(() => {
        if(comments.length > 0){
            console.log("ran")
            const arrayWrapper = document.getElementById(review.id)
            const reviewTextHeight = document.getElementById(`review/text/${review.id}`).getBoundingClientRect().height
            const reviewButtonHeight = document.getElementById(`review/buttons/${review.id}`).getBoundingClientRect().height
            const totalHeight = arrayWrapper.getBoundingClientRect().height
            const lastChild = arrayWrapper.lastChild
            const lastChildHeight = lastChild.getBoundingClientRect().height
            const tweek = 10
            const height = (totalHeight  - lastChildHeight) + reviewTextHeight + reviewButtonHeight - tweek
            setHeight(height)
        }
    }, [comments])

    return (
        <div className="review__comments-container">
        {
          commentsAllowed
          ?
            <div className="reviewComponent__comments">
              {
                review.comments.length > 0 
                ?
                    <>
                    <div id={review.id} className="reviewComponent__comments__array">
                    {
                        comments.map(comment =>{
                          if(comment.type === "user"){
                            return <User_Comment 
                                    client={client}
                                    comment={comment}
                                    handleCommentLike={handleCommentLike}
                                    review={review}
                                />
                          }
                          else if(comment.type ==="brand"){
                            return <Brand_Comment 
                              client={client}
                              comment={comment}
                              review={review}
                            />
                          }
                        }
                      )
                    }
                    </div>
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
                    </>
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
                    {
                      commentsLoading &&
                      <LoadingIndicator />
                    }
                  </button>
              }
              </div>
              
            </div>
          :
            null
        }
        </div>
    )
}

const User_Comment = ({ review, comment, client, handleCommentLike}) =>{
    const [commentText, setCommentText] = useState("")
    const [replyActive, setReplyActive] = useState(false)
    const [replyIsSending, setReplyIsSending] = useState(false)
    const [replies, setReplies] = useState([])
    const [repliesLoading, setRepliesLoading] = useState(false)
    const [moreRepliesLoading, setMoreRepliesLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalReplies, setTotalReplies] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if(replies.length > 0){
            const repliesWrapper = document.getElementById(`comment/reply/${comment.id}`)
            const wrapperHeight = repliesWrapper.getBoundingClientRect().height
            const lastChildHeight = repliesWrapper.lastChild.getBoundingClientRect().height
            const tweek = 0
            const finalHeight = wrapperHeight - lastChildHeight - tweek + 50
            setHeight(finalHeight)
            console.log(wrapperHeight, lastChildHeight)

        }
    }, [replies])

    const handleReply = () => {
        setReplyActive(true)
    }

    const giveReplyUser = (depth = 1) =>{
        setReplyIsSending(true)
        let reqObj = {}
        const isAdmin = !!client.type.includes("admin")
        if(depth === 0){
          reqObj = {
            message: commentText,
            review: review.id,
            user: client.user.id,
            depth,
            type: isAdmin ? "admin" : "user"
          }
        }
        else if(depth === 1){
          reqObj = {
            message: commentText,
            parentId: comment.id,
            user: client.user.id,
            depth,
            type: "user"
          }
        }
        console.log(depth)
        console.log(reqObj)
        axios.post("/comment",reqObj,{
          headers:{
            "role" : client.type,
            "authorization" : `bearer ${client.tokens.access.token}`
          }
        })
        .then(({data})=>{
            setReplyIsSending(false)
          console.log(data)
          setCommentText("")
          setReplies([{
            ...data,
            user: client.user
          }, ...replies])
        })
        .catch(err => {
          console.log(err)
          setReplyIsSending(false)
        })
    }

    const getReplies = (bool) =>{
        if(page === 0){
            setRepliesLoading(bool)
          }
          if(!bool){
            setReplies([])
            setPage(0)
            setReplyActive(bool)
            return
          }
          if(page > 0){
            setMoreRepliesLoading(true)
          }
          const options = {
            page: page + 1,
            limit: 3,
            populate: "user.User"
          }
          const filters={
            parentId: comment.id,
            depth: 1
          }
          axios.post("/comment/query",{
            options, filters
          })
          .then(({data})=>{
            setRepliesLoading(false)
            setMoreRepliesLoading(false)
            console.log("these are replies")
            console.log(data)
            setReplies([...replies, ...data.results])
            setPage(page + 1)
            setTotalReplies(data.totalResults)
            setReplyActive(bool)
          })
          .catch(err => {
            setMoreRepliesLoading(false)
            setRepliesLoading(false)
            console.log(err)
          })
    }
    console.log(comment)
    return(
        <div className="reviewComponent__comments__array__item">
            <div className="reviewComponent__comments__line" />
            <div className="reviewComponent__comments__array__item__left">
                <Link className="reviewComponent__comments__array__item__tag-container" to={`/user/${comment.user}`}>
                    <img src={comment.user.profileImage} alt="logo" className="reviewComponent__comments__array__item__img" />
                    {
                        comment.type === "admin" &&
                        <div className="reviewComponent__comments__array__item__tag"><p>Admin</p></div>
                    }
                    {
                    review.user.isPhoneVerified &&
                    <div className="reviewComponent__comments__array__item__tag__verified">
                        <VerifiedCommentSvg />
                    </div>
                    }
                </Link>
                <div className="reviewComponent__comments__array__item__left__lineBox">
                    {
                        replyActive &&
                        <div className="reviewComponent__comments__array__item__left__lineBox__line" style={{height: `${height}px`}} />
                    }
                </div>
            </div>
            <div className="reviewComponent__comments__array__item__right">
                <div className="reviewComponent__comments__array__item__upper">
                    <div className="reviewComponent__comments__array__item__text">{comment.message}</div>
                </div>
                <div className="reviewComponent__comments__array__item__lower">
                    {
                        client &&
                        <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {() => handleCommentLike(comment)}>
                        {
                        client.type.includes("user") 
                        ?
                            client.user.likedComments.includes(comment.id) 
                            ?
                                <p className="reviewComponent__buttons__button-liked">Liked</p>
                            :
                                <p className="reviewComponent__buttons__button-like">Like</p>
                        :
                            null
                        }
                        </Button>
                    }
                    {
                        client &&
                        <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {handleReply}>
                        {
                        client.type.includes("user") 
                        ?
                            <p className="reviewComponent__buttons__button-reply">Reply</p>
                        :
                            null
                        }
                        </Button>
                    }
                </div>
                {
                    <div className="reviewComponent__commentReply-container">
                        {
                            replyActive ?
                            <p className="reviewComponent__commentReply__show" onClick={() => getReplies(false)}>hide replies</p>
                            :
                            <p className="reviewComponent__commentReply__show" onClick={() => getReplies(true)}>
                                show replies
                                {
                                    repliesLoading &&
                                    <LoadingIndicator />
                                }
                            </p>
                        }
                        {
                            <div id ={`comment/reply/${comment.id}`} className="reviewComponent__commentReply__replies">
                                {
                                    replies.map( reply => 
                                        <div className="reviewComponent__commentReply__replies__item">
                                            <div className="reviewComponent__commentReply__line" />
                                            <div className="reviewComponent__comments__array__item__left">
                                                <Link className="reviewComponent__comments__array__item__tag-container" to={`/user/${reply.user.id}`}>
                                                    <img src={reply.user.profileImage} alt="logo" className="reviewComponent__comments__array__item__img" />
                                                    {
                                                        comment.type === "admin" &&
                                                        <div className="reviewComponent__comments__array__item__tag"><p>Admin</p></div>
                                                    }
                                                    {
                                                    review.user.isPhoneVerified &&
                                                    <div className="reviewComponent__comments__array__item__tag__verified">
                                                        <VerifiedCommentSvg />
                                                    </div>
                                                    }
                                                </Link>
                                                
                                            </div>
                                            <div className="reviewComponent__comments__array__item__right">
                                                <div className="reviewComponent__comments__array__item__upper">
                                                    <div className="reviewComponent__comments__array__item__text">{reply.message}</div>
                                                </div>
                                                <div className="reviewComponent__comments__array__item__lower">
                                                    {
                                                        client &&
                                                        <Button className="reviewComponent__buttons__button" client={client} type={"user"} onClick= {() => handleCommentLike(reply)}>
                                                        {
                                                        client.type.includes("user") 
                                                        ?
                                                            client.user.likedComments.includes(reply.id) 
                                                            ?
                                                                <p className="reviewComponent__buttons__button-liked">Liked</p>
                                                            :
                                                                <p className="reviewComponent__buttons__button-like">Like</p>
                                                        :
                                                            null
                                                        }
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        </div>    
                                    )
                                }
                                
                            </div>
                        }
                        {
                            replyActive &&
                            <div className="review__commentReply">
                                {
                                    client &&
                                    <div className="reviewComponent__commentReply__writeComment-container">
                                    {
                                    client ?
                                        client.type.includes("user")
                                        ?
                                            <div className="reviewComponent__commentReply__writeComment">
                                                <Link to={`/user/${client.user.id}`}><img className="reviewComponent__commentReply__writeComment__userImage" src={client.user.profileImage} alt="" /></Link>
                                                    <div className="reviewComponent__commentReply__writeComment__input">
                                                        <input onChange={(e) => setCommentText(e.target.value)} value={commentText} className="" type="text" placeholder="Reply" />
                                                        {
                                                            !replyIsSending 
                                                            ?
                                                                <FiSend onClick={ () => giveReplyUser()} className={`reviewComponent__commentReply__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__commentReply__writeComment__sendIcon-hide`}`}/>
                                                            : 
                                                                <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                                                        }
                                                    </div>
                                                </div>  
                                                :
                                                client.type.includes("brand") 
                                                ?
                                                <div className="reviewComponent__commentReply__writeComment">
                                                    <Link to={`/brand/${client.brand.id}`}><img className="reviewComponent__commentReply__writeComment__userImage" src={client.brand.logo} alt="" /></Link>
                                                    <div className="reviewComponent__commentReply__writeComment__input">
                                                        <input onChange={(e) => setCommentText(e.target.value) } value={commentText} className="" type="text" placeholder="Reply" />
                                                        {
                                                            !replyIsSending 
                                                            ?
                                                            <FiSend onClick={() => {}} className={`reviewComponent__commentReply__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__commentReply__writeComment__sendIcon-hide`}`}/>
                                                            : 
                                                            <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                                                        }
                                                    </div>
                                                </div>  
                                                :
                                                    null
                                            : null
                                        }
                            </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

const Brand_Comment = ({ review, comment, client, handleCommentLike}) =>{


    

  const [commentText, setCommentText] = useState("")
  const [replyActive, setReplyActive] = useState(false)
  const [replyIsSending, setReplyIsSending] = useState(false)
  const [replies, setReplies] = useState([])
  const [repliesLoading, setRepliesLoading] = useState(false)
  const [moreRepliesLoading, setMoreRepliesLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [totalReplies, setTotalReplies] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
      if(replies.length > 0){
          const repliesWrapper = document.getElementById(`comment/reply/${comment.id}`)
          const wrapperHeight = repliesWrapper.getBoundingClientRect().height
          const lastChildHeight = repliesWrapper.lastChild.getBoundingClientRect().height
          const tweek = 0
          const finalHeight = wrapperHeight - lastChildHeight - tweek + 50
          setHeight(finalHeight)
          console.log(wrapperHeight, lastChildHeight)

      }
  }, [replies])

  const handleReply = () => {
      setReplyActive(true)
  }

  const giveReplyUser = (depth = 1) =>{
      setReplyIsSending(true)
      let reqObj = {}
      if(depth === 0){
        reqObj = {
          message: commentText,
          review: review.id,
          brand: client.brand.id,
          depth,
          type: "brand"
        }
      }
      else if(depth === 1){
        reqObj = {
          message: commentText,
          parentId: comment.id,
          brand: client.brand.id,
          depth,
          type: "brand"
        }
      }
      console.log(depth)
      console.log(reqObj)
      axios.post("/comment",reqObj,{
        headers:{
          "role" : client.type,
          "authorization" : `bearer ${client.tokens.access.token}`
        }
      })
      .then(({data})=>{
          setReplyIsSending(false)
        console.log(data)
        setCommentText("")
        setReplies([{
          ...data,
          brand: client.brand
        }, ...replies])
      })
      .catch(err => {
        console.log(err)
        setReplyIsSending(false)
      })
  }

  const getReplies = (bool) =>{
      if(page === 0){
          setRepliesLoading(bool)
        }
        if(!bool){
          setReplies([])
          setPage(0)
          setReplyActive(bool)
          return
        }
        if(page > 0){
          setMoreRepliesLoading(true)
        }
        const options = {
          page: page + 1,
          limit: 3,
          populate: "brand.Brand"
        }
        const filters={
          parentId: comment.id,
          depth: 1
        }
        axios.post("/comment/query",{
          options, filters
        })
        .then(({data})=>{
          setRepliesLoading(false)
          setMoreRepliesLoading(false)
          console.log("these are replies")
          console.log(data)
          setReplies([...replies, ...data.results])
          setPage(page + 1)
          setTotalReplies(data.totalResults)
          setReplyActive(bool)
        })
        .catch(err => {
          setMoreRepliesLoading(false)
          setRepliesLoading(false)
          console.log(err)
        })
  }

  return(
      <div className="reviewComponent__comments__array__item">
          <div className="reviewComponent__comments__line" />
          <div className="reviewComponent__comments__array__item__left">
              <Link className="reviewComponent__comments__array__item__tag-container" to={`/brand/${comment.brand.slug}`}>
                  <img src={comment.brand.logo} alt="logo" className="reviewComponent__comments__array__item__img" />
                  {
                      comment.type === "admin" &&
                      <div className="reviewComponent__comments__array__item__tag"><p>Admin</p></div>
                  }
                  {
                  review.brand.isVerified &&
                  <div className="reviewComponent__comments__array__item__tag__verified">
                      <VerifiedCommentSvg />
                  </div>
                  }
              </Link>
              <div className="reviewComponent__comments__array__item__left__lineBox">
                  {
                      replyActive &&
                      <div className="reviewComponent__comments__array__item__left__lineBox__line" style={{height: `${height}px`}} />
                  }
              </div>
          </div>
          <div className="reviewComponent__comments__array__item__right">
              <div className="reviewComponent__comments__array__item__upper">
                  <div className="reviewComponent__comments__array__item__text">{comment.message}</div>
              </div>
              <div className="reviewComponent__comments__array__item__lower">
                  {
                      // client &&
                      // <Button className="reviewComponent__buttons__button" client={client} type={"brand"} onClick= {() => handleCommentLike(comment)}>
                      // {
                      //   client.type.includes("brand") 
                      //   ?
                      //     client.brand.likedComments.includes(comment.id) 
                      //     ?
                      //       <p className="reviewComponent__buttons__button-liked">Liked</p>
                      //     :
                      //       <p className="reviewComponent__buttons__button-like">Like</p>
                      //   :
                      //     null
                      // }
                      // </Button>
                  }
                  {
                      client &&
                      <Button className="reviewComponent__buttons__button" client={client} type={"brand"} onClick= {handleReply}>
                      {
                      client.type.includes("brand") 
                      ?
                          <p className="reviewComponent__buttons__button-reply">Reply</p>
                      :
                          null
                      }
                      </Button>
                  }
              </div>
              {
                  <div className="reviewComponent__commentReply-container">
                      {
                          replyActive ?
                          <p className="reviewComponent__commentReply__show" onClick={() => getReplies(false)}>hide replies</p>
                          :
                          <p className="reviewComponent__commentReply__show" onClick={() => getReplies(true)}>
                              show replies
                              {
                                  repliesLoading &&
                                  <LoadingIndicator />
                              }
                          </p>
                      }
                      {
                          <div id ={`comment/reply/${comment.id}`} className="reviewComponent__commentReply__replies">
                              {
                                  replies.map( reply => 
                                      <div className="reviewComponent__commentReply__replies__item">
                                          <div className="reviewComponent__commentReply__line" />
                                          <div className="reviewComponent__comments__array__item__left">
                                              <Link className="reviewComponent__comments__array__item__tag-container" to={`/brand/${reply.brand.slug}`}>
                                                  <img src={reply.brand.logo} alt="logo" className="reviewComponent__comments__array__item__img" />
                                                  {
                                                      comment.type === "admin" &&
                                                      <div className="reviewComponent__comments__array__item__tag"><p>Admin</p></div>
                                                  }
                                                  {
                                                  review.brand.isVerified &&
                                                  <div className="reviewComponent__comments__array__item__tag__verified">
                                                      <VerifiedCommentSvg />
                                                  </div>
                                                  }
                                              </Link>
                                              
                                          </div>
                                          <div className="reviewComponent__comments__array__item__right">
                                              <div className="reviewComponent__comments__array__item__upper">
                                                  <div className="reviewComponent__comments__array__item__text">{reply.message}</div>
                                              </div>
                                              <div className="reviewComponent__comments__array__item__lower">
                                                  {
                                                      // client &&
                                                      // <Button className="reviewComponent__buttons__button" client={client} type={"brand"} onClick= {() => handleCommentLike(reply)}>
                                                      // {
                                                      // client.type.includes("brand") 
                                                      // ?
                                                      //     client.brand.likedComments.includes(reply.id) 
                                                      //     ?
                                                      //         <p className="reviewComponent__buttons__button-liked">Liked</p>
                                                      //     :
                                                      //         <p className="reviewComponent__buttons__button-like">Like</p>
                                                      // :
                                                      //     null
                                                      // }
                                                      // </Button>
                                                  }
                                              </div>
                                          </div>
                                      </div>    
                                  )
                              }
                              
                          </div>
                      }
                      {
                          replyActive &&
                          <div className="review__commentReply">
                              {
                                  client &&
                                  <div className="reviewComponent__commentReply__writeComment-container">
                                  {
                                  client ?
                                      client.type.includes("brand")
                                      ?
                                          <div className="reviewComponent__commentReply__writeComment">
                                              <Link to={`/brand/${client.brand.slug}`}><img className="reviewComponent__commentReply__writeComment__userImage" src={client.brand.logo} alt="" /></Link>
                                                  <div className="reviewComponent__commentReply__writeComment__input">
                                                      <input onChange={(e) => setCommentText(e.target.value)} value={commentText} className="" type="text" placeholder="Reply" />
                                                      {
                                                          !replyIsSending 
                                                          ?
                                                              <FiSend onClick={ () => giveReplyUser()} className={`reviewComponent__commentReply__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__commentReply__writeComment__sendIcon-hide`}`}/>
                                                          : 
                                                              <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                                                      }
                                                  </div>
                                              </div>  
                                              :
                                              client.type.includes("brand") 
                                              ?
                                              <div className="reviewComponent__commentReply__writeComment">
                                                  <Link to={`/brand/${client.brand.id}`}><img className="reviewComponent__commentReply__writeComment__userImage" src={client.brand.logo} alt="" /></Link>
                                                  <div className="reviewComponent__commentReply__writeComment__input">
                                                      <input onChange={(e) => setCommentText(e.target.value) } value={commentText} className="" type="text" placeholder="Reply" />
                                                      {
                                                          !replyIsSending 
                                                          ?
                                                          <FiSend onClick={() => {}} className={`reviewComponent__commentReply__writeComment__sendIcon ${commentText.length < 1 && `reviewComponent__commentReply__writeComment__sendIcon-hide`}`}/>
                                                          : 
                                                          <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                                                      }
                                                  </div>
                                              </div>  
                                              :
                                                  null
                                          : null
                                      }
                          </div>
                              }
                          </div>
                      }
                  </div>
              }
          </div>
      </div>
  )
}

export default Comments