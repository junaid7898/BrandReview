import React, { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import Button from "./Button";
import VerifiedCommentSvg from "../../assests/verified-comment-svg";
import { Link } from "react-router-dom";
import { axios } from "../../axios/axiosInstance";
import { FiSend } from "react-icons/fi";
function Comments({
  updateFirstLine,
  commentsAllowed,
  review,
  comments,
  client,
  showComments,
  commentsLoading,
  moreCommentsLoading,
  totalComments,
  handleCommentLike,
  handleShowComments,
}) {
  useEffect(() => {
    if (comments.length > 0 && showComments) {
      updateFirstLine();
    }
  }, [comments, showComments]);

  return (
    <div className="review__comments-container">
      {commentsAllowed ? (
        <div className="reviewComponent__comments">
          {review.comments.length > 0 ? (
            <>
              <div id={review.id} className="reviewComponent__comments__array">
                {comments.map((comment, index) => {
                  if (comment.type === "user") {
                    return (
                      <UserComment
                        index={index}
                        client={client}
                        comment={comment}
                        handleCommentLike={handleCommentLike}
                        review={review}
                      />
                    );
                  } else if (comment.type === "brand") {
                    return (
                      <BrandComment
                        client={client}
                        comment={comment}
                        review={review}
                      />
                    );
                  }
                })}
              </div>
              <div
                id={`more/${review.id}`}
                className="reviewComponent__comments__moreComments"
              >
                {totalComments > comments.length &&
                  comments.length > 0 &&
                  showComments && (
                    <button
                      disabled={commentsLoading}
                      onClick={() => handleShowComments(true)}
                    >
                      Daha fazla göster
                      {moreCommentsLoading && <LoadingIndicator />}
                    </button>
                  )}
              </div>
            </>
          ) : null}
          {/* {
                  comments.length > 0 &&
                  
              } */}
          <div className="reviewComponent__comments__showComments">
            {showComments ? (
              <button onClick={() => handleShowComments(false)}>
              Yorumları Gizle
              </button>
            ) : (
              <button onClick={() => handleShowComments(true)}>
              Yorumları Göster
                {commentsLoading && <LoadingIndicator />}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const UserComment = ({ index, review, comment, client, handleCommentLike }) => {
  const [commentText, setCommentText] = useState("");
  const [replyActive, setReplyActive] = useState(false);
  const [replyIsSending, setReplyIsSending] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [moreRepliesLoading, setMoreRepliesLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalReplies, setTotalReplies] = useState(0);
  const [height, setHeight] = useState(0);
  const show = useRef(false);
  const currentHeight = useRef(0);

  const resize_ob = new ResizeObserver(function (entries) {
    if (!replyActive) {
      return;
    }
    let rect = entries[0].contentRect;
    let height = rect.height;
    if (height !== currentHeight.current) {
      if (show.current) {
        updateSecondLine();
      }
      return;
    }
  });

  const updateSecondLine = () => {
    const arrayWrapper = document.getElementById(`comment/reply/${comment.id}`);
    if (arrayWrapper && replies.length > 0) {
      const lastChild = arrayWrapper.lastChild;
      const writeReplyHeight = 40;
      const loadMoreButton = document.getElementById(`loadmore/${comment.id}`);
      let loadmoreButtonheight = 0;
      if (loadMoreButton) {
        loadmoreButtonheight = loadMoreButton.getBoundingClientRect().height;
      }
      const lineBox =
        document.getElementById(`linebox/${comment.id}`).getBoundingClientRect()
          .height -
        writeReplyHeight -
        loadmoreButtonheight;
      // const padding = parseInt(window.getComputedStyle(lastChild, null).getPropertyValue('padding-top')) + parseInt(window.getComputedStyle(lastChild, null).getPropertyValue('padding-bottom'))
      const margin =
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("margin-top")
        ) +
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("margin-bottom")
        );
      const lastChildHeight = lastChild.getBoundingClientRect().height + margin;
      const final = lineBox - lastChildHeight;
      setHeight(final);
    }
  };

  useEffect(() => {
    if (replyActive && totalReplies > 0) {
      updateSecondLine();
    }
  }, [totalReplies]);

  useEffect(() => {
    const commentWrapper = document.getElementById(`main/comment/${review.id}`);
    if (replyActive && commentWrapper) {
      resize_ob.observe(commentWrapper);
    } else {
      resize_ob.unobserve(commentWrapper);
    }
    return () => {
      resize_ob.unobserve(commentWrapper);
    };
  }, [replyActive, replies]);

  useEffect(() => {
    if (replyActive) {
      const g = document.getElementById(`writereply/${comment.id}`);
      console.log(g);
      if (g) {
        g.focus();
      }
    }
  }, [replyActive]);

  const handleReply = () => {
    getReplies(true);
  };

  const giveReplyUser = (depth = 1) => {
    setReplyIsSending(true);
    let reqObj = {};
    const isAdmin = !!client.type.includes("admin");
    if (depth === 0) {
      reqObj = {
        message: commentText,
        review: review.id,
        user: client.user.id,
        depth,
        type: isAdmin ? "admin" : "user",
      };
    } else if (depth === 1) {
      reqObj = {
        message: commentText,
        review: review.id,
        parentId: comment.id,
        user: client.user.id,
        depth,
        type: "user",
      };
    }
    axios
      .post("/comment", reqObj, {
        headers: {
          role: client.type,
          authorization: `bearer ${client.tokens.access.token}`,
        },
      })
      .then(({ data }) => {
        setReplyIsSending(false);
        setCommentText("");
        setReplies([
          ...replies,
          {
            ...data,
            user: client.user,
          },
        ]);
      })
      .catch((err) => {
        setReplyIsSending(false);
      });
  };

  const giveReplyBrand = (depth = 1) => {
    setReplyIsSending(true);
    let reqObj = {};
    if (depth === 0) {
      reqObj = {
        message: commentText,
        review: review.id,
        brand: client.brand.id,
        depth,
        type: "brand",
      };
    } else if (depth === 1) {
      reqObj = {
        message: commentText,
        review: review.id,
        parentId: comment.id,
        brand: client.brand.id,
        depth,
        type: "brand",
      };
    }
    axios
      .post("/comment", reqObj, {
        headers: {
          role: client.type,
          authorization: `bearer ${client.tokens.access.token}`,
        },
      })
      .then(({ data }) => {
        setReplyIsSending(false);
        setCommentText("");
        setReplies([
          ...replies,
          {
            ...data,
            brand: client.brand,
          },
        ]);
      })
      .catch((err) => {
        console.log("err ===>>>");
        console.log(err);
        setReplyIsSending(false);
      });
  };

  const getReplies = (bool) => {
    if (page === 0) {
      setRepliesLoading(bool);
    }
    if (!bool) {
      setReplies([]);
      setPage(0);
      setReplyActive(bool);
      show.current = bool;
      return;
    }
    if (page > 0) {
      setMoreRepliesLoading(true);
    }
    const options = {
      page: page + 1,
      limit: 3,
      populate: "user.User,brand.Brand",
    };
    const filters = {
      parentId: comment.id,
      depth: 1,
    };
    axios
      .post("/comment/query", {
        options,
        filters,
      })
      .then(({ data }) => {
        setRepliesLoading(false);
        setMoreRepliesLoading(false);
        setReplies([...data.results.reverse(), ...replies]);
        setPage(page + 1);
        setTotalReplies(data.totalResults);
        setReplyActive(bool);
        show.current = bool;
        console.log(data);
      })
      .catch((err) => {
        setMoreRepliesLoading(false);
        setRepliesLoading(false);
      });
  };
  return (
    <div
      id={`main/comment/${review.id}`}
      key={index}
      className="reviewComponent__comments__array__item"
    >
      <div className="reviewComponent__comments__line" />
      <div className="reviewComponent__comments__array__item__left">
        <Link
          className="reviewComponent__comments__array__item__tag-container"
          to={`/user/${comment.user}`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={comment.user.profileImage}
              alt="logo"
              className="reviewComponent__comments__array__item__img"
            />
            <span
              style={{
                textTransform: "capitalize",
                minWidth: "max-content",
                marginLeft: 5,
              }}
            >
              {review.user.name.length > 6
                ? review.user.name.slice(0, 6) + "..."
                : review.user.name}
            </span>
          </div>
          {comment.type === "admin" && (
            <div className="reviewComponent__comments__array__item__tag">
              <p>yönetici</p>
            </div>
          )}
          {review.user.isPhoneVerified && (
            <div className="reviewComponent__comments__array__item__tag__verified">
              <VerifiedCommentSvg />
            </div>
          )}
        </Link>
        <div
          id={`linebox/${comment.id}`}
          className="reviewComponent__comments__array__item__left__lineBox"
        >
          {replyActive && replies.length > 0 && (
            <div
              className="reviewComponent__comments__array__item__left__lineBox__line"
              style={{ height: `${height}px` }}
            />
          )}
        </div>
      </div>
      <div className="reviewComponent__comments__array__item__right">
        <div className="reviewComponent__comments__array__item__upper">
          <div className="reviewComponent__comments__array__item__text">
            {comment.message}
          </div>
        </div>
        <div className="reviewComponent__comments__array__item__lower">
          {client && (
            <Button
              className="reviewComponent__buttons__button"
              client={client}
              type={"user"}
              onClick={() => handleCommentLike(comment)}
            >
              {client.type.includes("user") ? (
                client.user.likedComments.includes(comment.id) ? (
                  <p className="reviewComponent__buttons__button-liked">
                  Beğendin
                  </p>
                ) : (
                  <p className="reviewComponent__buttons__button-like">Beğen</p>
                )
              ) : null}
            </Button>
          )}
          {client && (
            <Button
              className="reviewComponent__buttons__button"
              client={client}
              type={"user"}
              onClick={handleReply}
            >
              {client.type.includes("user") ? (
                <p className="reviewComponent__buttons__button-reply">Yanıtla</p>
              ) : null}
            </Button>
          )}
        </div>
        {
          <div className="reviewComponent__commentReply-container">
            {replyActive ? (
              <p
                className="reviewComponent__commentReply__show"
                onClick={() => getReplies(false)}
              >
                Yanıtları Gizle
              </p>
            ) : (
              <p
                className="reviewComponent__commentReply__show"
                onClick={() => getReplies(true)}
              >
                Yanıtları Göster
                {repliesLoading && <LoadingIndicator />}
              </p>
            )}
            {
              <div
                id={`comment/reply/${comment.id}`}
                className="reviewComponent__commentReply__replies"
              >
                {replies.map((reply, index) => {
                  if (reply.type === "user" || reply.type === "admin") {
                    return (
                      <div
                        key={index}
                        className="reviewComponent__commentReply__replies__item"
                      >
                        <div className="reviewComponent__commentReply__line" />
                        <div className="reviewComponent__comments__array__item__left">
                          <Link
                            className="reviewComponent__comments__array__item__tag-container"
                            to={`/user/${reply.user.id}`}
                          >
                            <img
                              src={reply.user.profileImage}
                              alt="logo"
                              className="reviewComponent__comments__array__item__img"
                            />
                            {reply.type === "admin" && (
                              <div className="reviewComponent__comments__array__item__tag">
                                <p>yönetici</p>
                              </div>
                            )}
                            {review.user.isPhoneVerified && (
                              <div className="reviewComponent__comments__array__item__tag__verified">
                                <VerifiedCommentSvg />
                              </div>
                            )}
                          </Link>
                        </div>
                        <div className="reviewComponent__comments__array__item__right">
                          <div className="reviewComponent__comments__array__item__upper">
                            <div className="reviewComponent__comments__array__item__text">
                              {reply.message}
                            </div>
                          </div>
                          <div className="reviewComponent__comments__array__item__lower"></div>
                        </div>
                      </div>
                    );
                  } else if (reply.type === "brand") {
                    return (
                      <div
                        key={index}
                        className="reviewComponent__commentReply__replies__item"
                      >
                        <div className="reviewComponent__commentReply__line" />
                        <div className="reviewComponent__comments__array__item__left">
                          <Link
                            className="reviewComponent__comments__array__item__tag-container"
                            to={`/brand/${reply.brand.slug}`}
                          >
                            <img
                              src={reply.brand.logo}
                              alt="logo"
                              className="reviewComponent__comments__array__item__img"
                            />
                            {review.brand.isVerified && (
                              <div className="reviewComponent__comments__array__item__tag__verified">
                                <VerifiedCommentSvg />
                              </div>
                            )}
                          </Link>
                        </div>
                        <div className="reviewComponent__comments__array__item__right">
                          <div className="reviewComponent__comments__array__item__upper">
                            <div className="reviewComponent__comments__array__item__text">
                              {reply.message}
                            </div>
                          </div>
                          <div className="reviewComponent__comments__array__item__lower"></div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            }
            {replyActive && totalReplies > 0 && replies.length < totalReplies && (
              <button
                id={`loadmore/${comment.id}`}
                onClick={() => getReplies(true)}
              >
                Daha fazla göster
              </button>
            )}
            {replyActive && (
              <div className="review__commentReply">
                {client && (
                  <div className="reviewComponent__commentReply__writeComment-container">
                    {client ? (
                      client.type.includes("user") ? (
                        <div className="reviewComponent__commentReply__writeComment">
                          <Link to={`/user/${client.user.id}`}>
                            <img
                              className="reviewComponent__commentReply__writeComment__userImage"
                              src={client.user.profileImage}
                              alt=""
                            />
                          </Link>
                          <form onSubmit = {(e) => {
                            e.preventDefault()
                            giveReplyUser()
                          }} className="reviewComponent__commentReply__writeComment__input">
                            <input
                              id={`writereply/${comment.id}`}
                              onChange={(e) => setCommentText(e.target.value)}
                              value={commentText}
                              className=""
                              type="text"
                              placeholder="Reply"
                            />
                            {!replyIsSending ? (
                              <FiSend
                                type = 'submit'
                                onClick={() => giveReplyUser()}
                                className={`reviewComponent__commentReply__writeComment__sendIcon ${
                                  commentText.length < 1 &&
                                  `reviewComponent__commentReply__writeComment__sendIcon-hide`
                                }`}
                              />
                            ) : (
                              <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                            )}
                          </form>
                        </div>
                      ) : client.type.includes("brand") ? (
                        <div className="reviewComponent__commentReply__writeComment">
                          <Link to={`/brand/${client.brand.slug}`}>
                            <img
                              className="reviewComponent__commentReply__writeComment__userImage"
                              src={client.brand.logo}
                              alt=""
                            />
                          </Link>
                          <form onSubmit = {e => {
                            e.preventDefault()
                            giveReplyBrand()
                          }} className="reviewComponent__commentReply__writeComment__input">
                            <input
                              id={`writereply/${comment.id}`}
                              onChange={(e) => setCommentText(e.target.value)}
                              value={commentText}
                              className=""
                              type="text"
                              placeholder="Reply"
                            />
                            {!replyIsSending ? (
                              <FiSend
                                type = 'submit'
                                onClick={() => {
                                  giveReplyBrand();
                                }}
                                className={`reviewComponent__commentReply__writeComment__sendIcon ${
                                  commentText.length < 1 &&
                                  `reviewComponent__commentReply__writeComment__sendIcon-hide`
                                }`}
                              />
                            ) : (
                              <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                            )}
                          </form>
                        </div>
                      ) : null
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

const BrandComment = ({ review, comment, client, handleCommentLike }) => {
  const [commentText, setCommentText] = useState("");
  const [replyActive, setReplyActive] = useState(false);
  const [replyIsSending, setReplyIsSending] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [moreRepliesLoading, setMoreRepliesLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalReplies, setTotalReplies] = useState(0);
  const [height, setHeight] = useState(0);
  const show = useRef(false);
  const currentHeight = useRef(0);

  const resize_ob = new ResizeObserver(function (entries) {
    if (!replyActive) {
      return;
    }
    let rect = entries[0].contentRect;
    let height = rect.height;
    if (height !== currentHeight.current) {
      if (show.current) {
        updateSecondLine();
      }
      return;
    }
  });

  const updateSecondLine = () => {
    const arrayWrapper = document.getElementById(`comment/reply/${comment.id}`);
    if (arrayWrapper && replies.length > 0) {
      console.log(arrayWrapper);
      const lastChild = arrayWrapper.lastChild;
      console.log(lastChild);
      const writeReplyHeight = 40;
      const loadMoreButton = document.getElementById(`loadmore/${comment.id}`);
      let loadmoreButtonheight = 0;
      if (loadMoreButton) {
        loadmoreButtonheight = loadMoreButton.getBoundingClientRect().height;
      }
      const lineBox =
        document.getElementById(`linebox/${comment.id}`).getBoundingClientRect()
          .height -
        writeReplyHeight -
        loadmoreButtonheight;
      console.log(lineBox);
      // const padding = parseInt(window.getComputedStyle(lastChild, null).getPropertyValue('padding-top')) + parseInt(window.getComputedStyle(lastChild, null).getPropertyValue('padding-bottom'))
      const margin =
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("margin-top")
        ) +
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("margin-bottom")
        );
      const lastChildHeight = lastChild.getBoundingClientRect().height + margin;
      const final = lineBox - lastChildHeight;
      setHeight(final);
    }
  };

  useEffect(() => {
    if (replyActive && totalReplies > 0) {
      updateSecondLine();
    }
  }, [totalReplies]);

  useEffect(() => {
    if (replyActive) {
      const g = document.getElementById(`writereply/${comment.id}`);
      console.log(g);
      if (g) {
        g.focus();
      }
    }
  }, [replyActive]);

  useEffect(() => {
    const commentWrapper = document.getElementById(`main/comment/${review.id}`);
    if (replyActive && commentWrapper) {
      resize_ob.observe(commentWrapper);
    } else {
      resize_ob.unobserve(commentWrapper);
    }
    return () => {
      resize_ob.unobserve(commentWrapper);
    };
  }, [replyActive, replies]);

  useEffect(() => {
    console.log(replies.length, height);
  }, [replies]);

  const handleReply = () => {
    getReplies(true);
  };

  const giveReplyBrand = (depth = 1) => {
    setReplyIsSending(true);
    let reqObj = {};
    if (depth === 0) {
      reqObj = {
        message: commentText,
        review: review.id,
        brand: client.brand.id,
        depth,
        type: "brand",
      };
    } else if (depth === 1) {
      reqObj = {
        message: commentText,
        review: review.id,
        parentId: comment.id,
        brand: client.brand.id,
        depth,
        type: "brand",
      };
    }
    axios
      .post("/comment", reqObj, {
        headers: {
          role: client.type,
          authorization: `bearer ${client.tokens.access.token}`,
        },
      })
      .then(({ data }) => {
        setReplyIsSending(false);
        setCommentText("");
        setReplies([
          ...replies,
          {
            ...data,
            brand: client.brand,
          },
        ]);
      })
      .catch((err) => {
        console.log("err ===>>>");
        console.log(err);
        setReplyIsSending(false);
      });
  };

  const getReplies = (bool) => {
    if (page === 0) {
      setRepliesLoading(bool);
    }
    if (!bool) {
      setReplies([]);
      setPage(0);
      setReplyActive(bool);
      show.current = bool;
      return;
    }
    if (page > 0) {
      setMoreRepliesLoading(true);
    }
    const options = {
      page: page + 1,
      limit: 3,
      populate: "user.User,brand.Brand",
    };
    const filters = {
      parentId: comment.id,
      depth: 1,
    };
    axios
      .post("/comment/query", {
        options,
        filters,
      })
      .then(({ data }) => {
        setRepliesLoading(false);
        setMoreRepliesLoading(false);
        setReplies([...data.results.reverse(), ...replies]);
        setPage(page + 1);
        setTotalReplies(data.totalResults);
        if (!replyActive) {
          setReplyActive(bool);
          show.current = bool;
        }
      })
      .catch((err) => {
        setMoreRepliesLoading(false);
        setRepliesLoading(false);
      });
  };

  const giveReplyUser = (depth = 1) => {
    setReplyIsSending(true);
    let reqObj = {};
    const isAdmin = !!client.type.includes("admin");
    if (depth === 0) {
      reqObj = {
        message: commentText,
        review: review.id,
        user: client.user.id,
        depth,
        type: isAdmin ? "admin" : "user",
      };
    } else if (depth === 1) {
      reqObj = {
        message: commentText,
        review: review.id,
        parentId: comment.id,
        user: client.user.id,
        depth,
        type: "user",
      };
    }
    axios
      .post("/comment", reqObj, {
        headers: {
          role: client.type,
          authorization: `bearer ${client.tokens.access.token}`,
        },
      })
      .then(({ data }) => {
        setReplyIsSending(false);
        setCommentText("");
        setReplies([
          ...replies,
          {
            ...data,
            user: client.user,
          },
        ]);
      })
      .catch((err) => {
        setReplyIsSending(false);
      });
  };

  return (
    <div
      id={`main/comment/${review.id}`}
      className="reviewComponent__comments__array__item brandBackground"
    >
      <div className="reviewComponent__comments__line" />
      <div className="reviewComponent__comments__array__item__left">
        <Link
          className="reviewComponent__comments__array__item__tag-container"
          to={`/brand/${comment.brand && comment.brand.slug}`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={comment.brand && comment.brand.logo}
              alt="logo"
              className="reviewComponent__comments__array__item__img"
            />
            <span
              style={{
                textTransform: "capitalize",
                minWidth: "max-content",
                marginLeft: 5,
              }}
            >
              {review.brand.name.length > 6
                ? review.brand.name.slice(0, 6) + "..."
                : review.brand.name}
            </span>
          </div>
          {comment.type === "admin" && (
            <div className="reviewComponent__comments__array__item__tag">
              <p>yönetici</p>
            </div>
          )}
          {review.brand.isVerified && (
            <div className="reviewComponent__comments__array__item__tag__verified">
              <VerifiedCommentSvg />
            </div>
          )}
        </Link>
        <div
          id={`linebox/${comment.id}`}
          className="reviewComponent__comments__array__item__left__lineBox"
        >
          {replyActive && replies.length > 0 && (
            <div
              className="reviewComponent__comments__array__item__left__lineBox__line"
              style={{ height: `${height}px` }}
            />
          )}
        </div>
      </div>
      <div className="reviewComponent__comments__array__item__right">
        <div className="reviewComponent__comments__array__item__upper">
          <div
            style={{ color: "white" }}
            className="reviewComponent__comments__array__item__text"
          >
            {comment.message}
          </div>
        </div>
        <div className="reviewComponent__comments__array__item__lower">
          {client && (
            <Button
              className="reviewComponent__buttons__button"
              client={client}
              type={"brand"}
              onClick={handleReply}
            >
              {client.type.includes("brand") ? (
                <p className="background__color reviewComponent__buttons__button-reply">
                Yanıtla
                </p>
              ) : null}
            </Button>
          )}
        </div>
        {
          <div className="reviewComponent__commentReply-container">
            {replyActive ? (
              <p
                className="reviewComponent__commentReply__show reviewComponent__commentReply__show__brand"
                onClick={() => getReplies(false)}
              >
                Yanıtları Gizle
              </p>
            ) : (
              <p
                className="reviewComponent__commentReply__show reviewComponent__commentReply__show__brand"
                onClick={() => getReplies(true)}
              >
                Yanıtları Göster
                {repliesLoading && <LoadingIndicator />}
              </p>
            )}
            {
              <div
                id={`comment/reply/${comment.id}`}
                className="reviewComponent__commentReply__replies"
              >
                {replies.map((reply, index) => {
                  if (reply.type === "user" || reply.type === "admin") {
                    return (
                      <div
                        key={index}
                        className="reviewComponent__commentReply__replies__item"
                      >
                        <div
                          className="reviewComponent__commentReply__line"
                          style={{ borderColor: "#fff" }}
                        />
                        <div className="reviewComponent__comments__array__item__left">
                          <Link
                            className="reviewComponent__comments__array__item__tag-container"
                            to={`/user/${reply.user.id}`}
                          >
                            <img
                              src={reply.user.profileImage}
                              alt="logo"
                              className="reviewComponent__comments__array__item__img"
                            />
                            {reply.type === "admin" && (
                              <div className="reviewComponent__comments__array__item__tag">
                                <p>yönetici</p>
                              </div>
                            )}
                            {review.user.isPhoneVerified && (
                              <div className="reviewComponent__comments__array__item__tag__verified">
                                <VerifiedCommentSvg />
                              </div>
                            )}
                          </Link>
                        </div>
                        <div className="reviewComponent__comments__array__item__right">
                          <div className="reviewComponent__comments__array__item__upper">
                            <div className="reviewComponent__comments__array__item__text">
                              {reply.message}
                            </div>
                          </div>
                          <div className="reviewComponent__comments__array__item__lower"></div>
                        </div>
                      </div>
                    );
                  } else if (reply.type === "brand") {
                    return (
                      <div
                        key={index}
                        className="reviewComponent__commentReply__replies__item"
                      >
                        <div className="reviewComponent__commentReply__line" />
                        <div className="reviewComponent__comments__array__item__left">
                          <Link
                            className="reviewComponent__comments__array__item__tag-container"
                            to={`/brand/${reply.brand.slug}`}
                          >
                            <img
                              src={reply.brand.logo}
                              alt="logo"
                              className="reviewComponent__comments__array__item__img"
                            />
                            {comment.type === "admin" && (
                              <div className="reviewComponent__comments__array__item__tag">
                                <p>yönetici</p>
                              </div>
                            )}
                            {review.brand.isVerified && (
                              <div className="reviewComponent__comments__array__item__tag__verified">
                                <VerifiedCommentSvg />
                              </div>
                            )}
                          </Link>
                        </div>
                        <div className="reviewComponent__comments__array__item__right">
                          <div className="reviewComponent__comments__array__item__upper">
                            <div className="reviewComponent__comments__array__item__text">
                              {reply.message}
                            </div>
                          </div>
                          <div className="reviewComponent__comments__array__item__lower"></div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            }
            {replyActive && totalReplies > 0 && replies.length < totalReplies && (
              <button
                id={`loadmore/${comment.id}`}
                onClick={() => getReplies(true)}
              >
                Daha fazla göster
              </button>
            )}
            {replyActive && (
              <div className="review__commentReply">
                {client && (
                  <div className="reviewComponent__commentReply__writeComment-container">
                    {client ? (
                      client.type.includes("brand") ? (
                        <div className="reviewComponent__commentReply__writeComment">
                          <Link to={`/brand/${client.brand.slug}`}>
                            <img
                              className="reviewComponent__commentReply__writeComment__userImage"
                              src={client.brand.logo}
                              alt=""
                            />
                          </Link>
                          <form onSubmit = {e => {
                            e.preventDefault()
                            giveReplyBrand()
                          }} className="reviewComponent__commentReply__writeComment__input">
                            <input
                              id={`writereply/${comment.id}`}
                              onChange={(e) => setCommentText(e.target.value)}
                              value={commentText}
                              className=""
                              type="text"
                              placeholder="Reply"
                            />
                            {!replyIsSending ? (
                              <FiSend
                                type = 'submit'
                                onClick={() => giveReplyBrand()}
                                className={`reviewComponent__commentReply__writeComment__sendIcon ${
                                  commentText.length < 1 &&
                                  `reviewComponent__commentReply__writeComment__sendIcon-hide`
                                }`}
                              />
                            ) : (
                              <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                            )}
                          </form>
                        </div>
                      ) : client.type.includes("user") ||
                        client.type.includes("admin") ? (
                        <div className="reviewComponent__commentReply__writeComment">
                          <Link to={`/user/${client.user.id}`}>
                            <img
                              className="reviewComponent__commentReply__writeComment__userImage"
                              src={client.user.profileImage}
                              alt={client.user.name}
                            />
                          </Link>
                          <form onSubmit = {e => {
                            e.preventDefault()
                            giveReplyUser()
                          }} className="reviewComponent__commentReply__writeComment__input">
                            <input
                              id={`writereply/${comment.id}`}
                              onChange={(e) => setCommentText(e.target.value)}
                              value={commentText}
                              className=""
                              type="text"
                              placeholder="Reply"
                            />
                            {!replyIsSending ? (
                              <FiSend
                                type = 'submit'
                                onClick={() => {
                                  giveReplyUser();
                                }}
                                className={`reviewComponent__commentReply__writeComment__sendIcon ${
                                  commentText.length < 1 &&
                                  `reviewComponent__commentReply__writeComment__sendIcon-hide`
                                }`}
                              />
                            ) : (
                              <LoadingIndicator className="reviewComponent__commentReply__writeComment__sendIcon-loader" />
                            )}
                          </form>
                        </div>
                      ) : null
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Comments;
