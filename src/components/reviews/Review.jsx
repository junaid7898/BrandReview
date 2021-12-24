import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../assests/Star";
import ImageThumbnail from "../image_thumbnail/ImageThumbnail";
import ImageViewer from "../image_viewer/ImageViewer";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "../../axios/axiosInstance";
import { clientActions } from "../../Redux/clientslice/clientSlice";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import VerifiedSvg from "../../assests/verified-svg";
import EditSvg from "../../assests/edit-svg";
import Comments from "./Comments";
const Review = ({
  review,
  setUpdatedReview,
  commentsAllowed,
  brandData,
  setBrandData,
}) => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentIsSending, setCommentIsSending] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [page, setPage] = useState(0);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [clikedImage, setClickedImage] = useState(null);
  const [rating, setRating] = useState(null);
  const [firstCommentHeight, setFirstCommentHeight] = useState(0);
  const currentHeight = useRef(0);
  const show = useRef(false);
  const resize_ob = new ResizeObserver(function (entries) {
    if (!showComments) {
      return;
    }
    let rect = entries[0].contentRect;
    let height = rect.height;
    if (height !== currentHeight.current) {
      if (show.current) {
        updateFirstLine();
      }
      return;
    }
  });
  const updateFirstLine = () => {
    const arrayWrapper = document.getElementById(review.id);
    if (arrayWrapper) {
      const left =
        document.getElementById(`left/${review.id}`).getBoundingClientRect()
          .height -
        document
          .getElementById(`left/${review.id}`)
          .childNodes[0].getBoundingClientRect().height;
      const lastChild = arrayWrapper.lastChild;
      const padding =
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("padding-top")
        ) +
        parseInt(
          window
            .getComputedStyle(lastChild, null)
            .getPropertyValue("padding-bottom")
        );
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
      const lastChildHeight = lastChild.getBoundingClientRect().height;
      let loadMoreCommentButtonHeight = 0;
      const hideCommentButtonHeight = 39;
      let loadMoreCommentButton = document.getElementById(`more/${review.id}`);
      if (loadMoreCommentButton) {
        loadMoreCommentButtonHeight =
          loadMoreCommentButton.getBoundingClientRect().height +
          parseInt(
            window
              .getComputedStyle(loadMoreCommentButton, null)
              .getPropertyValue("padding-top")
          ) +
          parseInt(
            window
              .getComputedStyle(loadMoreCommentButton, null)
              .getPropertyValue("padding-bottom")
          );
      }
      const adjust = 2;
      const final =
        left -
        hideCommentButtonHeight -
        (lastChildHeight + padding + margin + loadMoreCommentButtonHeight) +
        adjust;
      setFirstCommentHeight(final);
    }
  };

  const handleCommentUser = (commentId) => {
    setCommentIsSending(true);
    let reqObj = {};
    let depth = 0;
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
        parentId: commentId,
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
        setCommentIsSending(false);
        setCommentText("");
        const updatedReview = {
          ...review,
          comments: [data.id, ...review.comments],
        };
        setUpdatedReview(updatedReview);
        if (showComments) {
          setComments([
            ...comments,
            {
              ...data,
              user: client.user,
            },
          ]);
        } else {
          handleShowComments(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setCommentIsSending(false);
      });
  };

  const handleCommentBrand = (commentId) => {
    setCommentIsSending(true);
    let reqObj = {};
    let depth = 0;
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
        parentId: commentId,
        user: client.brand.id,
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
        setCommentIsSending(false);
        setCommentText("");
        const updatedReview = {
          ...review,
          comments: [data.id, ...review.comments],
        };
        setUpdatedReview(updatedReview);
        if (showComments) {
          setComments([
            ...comments,
            {
              ...data,
              brand: client.brand,
            },
          ]);
        } else {
          handleShowComments(true);
        }
      })
      .catch((err) => {
        setCommentIsSending(false);
      });
  };

  const handleLike = () => {
    let updatedUser = null;
    let updatedReview = null;
    if (client.user.likedReviews.find((id) => id === review.id)) {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            likedReviews: [
              ...client.user.likedReviews.filter((id) => id !== review.id),
            ],
          },
        })
      );
      updatedReview = {
        ...review,
        likedByUsers: [
          ...review.likedByUsers.filter((item) => item.user !== client.user.id),
        ],
      };
    } else {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            likedReviews: [...client.user.likedReviews, review.id],
          },
        })
      );

      const newEntry = {
        user: client.user.id,
        time: new Date(),
      };

      updatedReview = {
        ...review,
        likedByUsers: [...review.likedByUsers, newEntry],
      };
    }

    setUpdatedReview(updatedReview);
    axios
      .post(
        `/review/like/${review.id}`,
        {
          user: updatedUser.payload.user,
          review: updatedReview,
        },
        {
          headers: {
            role: client.type,
            authorization: `bearer ${client.tokens.access.token}`,
          },
        }
      )
      .then(({ data }) => {});
  };

  const handleFollow = () => {
    let updatedUser = null;
    let updatedReview = null;
    if (client.user.followedReviews.find((id) => id === review.id)) {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            followedReviews: [
              ...client.user.followedReviews.filter((id) => id !== review.id),
            ],
          },
        })
      );
      updatedReview = {
        ...review,
        followedByUsers: [
          ...review.followedByUsers.filter((id) => id !== client.user.id),
        ],
      };
    } else {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            followedReviews: [...client.user.followedReviews, review.id],
          },
        })
      );
      updatedReview = {
        ...review,
        followedByUsers: [...review.followedByUsers, client.user.id],
      };
    }
    setUpdatedReview(updatedReview);
    axios
      .post(
        `/review/follow/${review.id}`,
        {
          user: updatedUser.payload.user,
          review: updatedReview,
        },
        {
          headers: {
            role: client.type,
            authorization: `bearer ${client.tokens.access.token}`,
          },
        }
      )
      .then(({ data }) => {});
  };

  const handleThank = () => {
    let updatedUser = null;
    let updatedReview = null;
    let updatedBrand = null;
    if (brandData) {
      updatedBrand = brandData;
    } else {
      updatedBrand = review.brand;
    }
    if (client.user.thankedReviews.find((id) => id === review.id)) {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            thankedReviews: [
              ...client.user.thankedReviews.filter((id) => id !== review.id),
            ],
          },
        })
      );
      updatedReview = {
        ...review,
        isThanked: false,
      };
      updatedBrand = {
        ...updatedBrand,
        thankCount: updatedBrand.thankCount - 1,
      };
    } else {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            thankedReviews: [...client.user.thankedReviews, review.id],
          },
        })
      );
      updatedReview = {
        ...review,
        isThanked: true,
      };
      updatedBrand = {
        ...updatedBrand,
        thankCount: updatedBrand.thankCount + 1,
      };
    }
    setUpdatedReview(updatedReview);
    if (brandData) {
      setBrandData(updatedBrand);
    }
    axios
      .post(
        `/review/thank/${review.id}`,
        {
          user: updatedUser.payload.user,
          review: updatedReview,
          brand: updatedBrand,
        },
        {
          headers: {
            role: client.type,
            authorization: `bearer ${client.tokens.access.token}`,
          },
        }
      )
      .then(({ data }) => {});
  };

  const handleResolve = () => {
    let updatedUser = null;
    let updatedReview = null;
    let updatedBrand = null;
    if (brandData) {
      updatedBrand = brandData;
    } else {
      updatedBrand = review.brand;
    }
    if (client.user.resolvedReviews.find((id) => id === review.id)) {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            resolvedReviews: [
              ...client.user.resolvedReviews.filter((id) => id !== review.id),
            ],
          },
        })
      );
      updatedReview = {
        ...review,
        isResolved: false,
      };
      updatedBrand = {
        ...updatedBrand,
        resolveCount: updatedBrand.resolveCount - 1,
      };
    } else {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            resolvedReviews: [...client.user.resolvedReviews, review.id],
          },
        })
      );
      updatedReview = {
        ...review,
        isResolved: true,
      };
      updatedBrand = {
        ...updatedBrand,
        resolveCount: updatedBrand.resolveCount + 1,
      };
    }
    setUpdatedReview(updatedReview);
    if (brandData) {
      setBrandData(updatedBrand);
    }
    axios
      .post(
        `/review/resolve/${review.id}`,
        {
          user: updatedUser.payload.user,
          review: updatedReview,
          brand: updatedBrand,
        },
        {
          headers: {
            role: client.type,
            authorization: `bearer ${client.tokens.access.token}`,
          },
        }
      )
      .then(({ data }) => {});
  };

  useEffect(() => {
    const arrayWrapper = document.getElementById(`main/${review.id}`);
    if (arrayWrapper && showComments) {
      resize_ob.observe(arrayWrapper);
    } else {
      resize_ob.unobserve(arrayWrapper);
    }
    return () => {
      resize_ob.unobserve(arrayWrapper);
    };
  }, [showComments]);

  const handleShowComments = (bool) => {
    const arrayWrapper = document.getElementById(review.id);
    if (!showComments) {
      setCommentsLoading(bool);
    }
    if (!bool) {
      resize_ob.unobserve(arrayWrapper);
      setComments([]);
      setPage(0);
      show.current = bool;
      setShowComments(bool);
      setPage(0);
      return;
    }

    // if(page > 0){
    //   setMoreCommentsLoading(true)
    // }
    const options = {
      page: page + 1,
      limit: 3,
      populate: "user.User,brand.Brand",
    };
    const filters = {
      review: review.id,
      parentId: null,
    };
    axios
      .post("/comment/query", {
        options,
        filters,
      })
      .then(({ data }) => {
        setCommentsLoading(false);
        setMoreCommentsLoading(false);
        setComments([...data.results.reverse(), ...comments]);
        setPage(page + 1);
        setTotalComments(data.totalResults);
        show.current = bool;
        setShowComments(bool);
        console.log(data);
      })
      .catch((err) => {
        setMoreCommentsLoading(false);
        setCommentsLoading(false);
      });
  };

  const handleCommentLike = (comment) => {
    let updatedUser = null;
    let updatedComment = null;
    if (client.user.likedComments.find((id) => id === comment.id)) {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            likedComments: [
              ...client.user.likedComments.filter((id) => id !== comment.id),
            ],
          },
        })
      );
      updatedComment = {
        ...comment,
        likeCount: comment.likeCount - 1,
      };
    } else {
      updatedUser = dispatch(
        clientActions.setClient({
          ...client,
          user: {
            ...client.user,
            likedComments: [...client.user.likedComments, comment.id],
          },
        })
      );
      updatedComment = {
        ...comment,
        likeCount: comment.likeCount + 1,
      };
    }
    setComments([
      ...comments.map((item) => {
        if (item.id === comment.id) {
          return updatedComment;
        }
        return item;
      }),
    ]);
    axios
      .post(
        "/comment/like",
        {
          user: updatedUser.payload.user,
          comment: updatedComment,
        },
        {
          headers: {
            role: client.type,
            authorization: `bearer ${client.tokens.access.token}`,
          },
        }
      )
      .then(({ data }) => {});
  };

  const reviewChanges = useRef({
    text: "",
    rating: null,
  });

  useEffect(() => {
    if (review) {
      reviewChanges.current = {
        text: review.message,
        rating: review.ratingCount,
      };
    }
  }, [review]);

  const handleConfirmChanges = () => {
    // dispatch(statusAction.setNotification({
    //   message: "updating review",
    //   type:"loading"
    // }))
    setIsEditingReview(false);
    const changes = {
      message: reviewChanges.current.text,
      rating: reviewChanges.current.rating,
    };
    const updatedReview = {
      ...review,
      ...changes,
    };
    setUpdatedReview(updatedReview);

    axios
      .patch(`review/${review.id}`, { ...changes })
      .then(({ data }) => {})
      .catch((err) => {});
  };

  const handleCancelChanges = () => {
    setIsEditingReview(false);
    reviewChanges.current = {
      message: "",
      rating: null,
    };
  };

  useEffect(() => {
    if (rating) {
      reviewChanges.current.rating = rating;
    }
  }, [rating]);

  return review ? (
    <div
      id={`main/${review.id}`}
      className="reviewComponent-container"
      style={{ backgroundColor: review.isResolved && "rgb(205, 243, 212)"  }}
    >
      <div className="reviewComponent-container__upper">
        <div
          id={`left/${review.id}`}
          className="reviewComponent-container__left"
        >
          <div className="reviewComponent__userImage">
            <img src={review.user.profileImage} alt={review.user.name} />
          </div>
          <div className="reviewComponent-container__left__lineBox">
            {showComments && (
              <div
                className="reviewComponent-container__left__lineBox__line"
                style={{ height: firstCommentHeight }}
              />
            )}
          </div>
        </div>
        <div className="reviewComponent-container__right">
          <div className="reviewComponent">
            {/* row directioned profile intro and images */}
            <div className="reviewComponent__profile">
              {/* it containes profile img, name, rating, label, and pictures */}
              <div className="reviewComponent__profile__intro">
                <div className="reviewComponent__profile__intro__name">
                  <div className="reviewComponent__profile__intro__name-container">
                    <Link to={`/user/${review.user.id}`}>
                      <p>{review.user.name}</p>
                    </Link>
                    {review.user.isPhoneVerified && (
                      <VerifiedSvg className="reviewComponent__profile__intro__name-container-svg" />
                    )}
                    {client ? (
                      review && client.type.includes("user") ? (
                        review.user.id === client.user.id ? (
                          <EditSvg
                            onClick={() => setIsEditingReview(!isEditingReview)}
                            className="reviewComponent__profile__intro__name-container-editsvg"
                          />
                        ) : null
                      ) : null
                    ) : null}
                  </div>
                  {isEditingReview ? (
                    <div>
                      <ReactStars
                        count={5}
                        onChange={setRating}
                        size={30}
                        isHalf={true}
                        activeColor="#357bce"
                      />
                    </div>
                  ) : (
                    <div className="reviewComponent__profile__intro__name__rating">
                      <Star
                        starLines="#357BCE"
                        starGradient1="#357BCE"
                        starGradiet2="#357BCE"
                      />
                      <h4>{review.rating}</h4>
                    </div>
                  )}
                </div>
                <div className="reviewComponent__profile__intro__status">
                  {review.isResolved && (
                    <div className="reviewComponent__profile__intro__status__review-label">
                      {/* TODO wether review is a complaint/thanked/resolved */}
                      <p>Çözümlendi</p>
                    </div>
                  )}
                  {review.isThanked && (
                    <div className="reviewComponent__profile__intro__status__thank-label">
                      {/* TODO wether review is a complaint/thanked/resolved */}
                      <p>Teşekkür Etti</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="reviewComponent__profile__pics">
                {/* import component image preview */}
                {review.images.map((image, index) => {
                  return (
                    <div
                      id={index}
                      onClick={() => {
                        setClickedImage(image);
                      }}
                    >
                      <ImageThumbnail image={image} />
                    </div>
                  );
                })}
                {clikedImage !== null ? (
                  <ImageViewer image={clikedImage} setImage={setClickedImage} />
                ) : null}
              </div>
            </div>

            <div
              id={`review/text/${review.id}`}
              className="reviewComponent__text"
            >
              {isEditingReview ? (
                <textarea
                  id="edit_textarea"
                  onChange={(e) =>
                    (reviewChanges.current.text = e.target.value)
                  }
                  className="reviewComponent__text__edit"
                  defaultValue={review.message}
                  placeholder="Enter your changes here"
                  rows={4}
                />
              ) : (
                <p className="reviewComponent__text__para">{review.message}</p>
              )}
            </div>
            {isEditingReview && (
              <div className="reviewComponent__text__edit__buttons">
                <button onClick={() => handleConfirmChanges()}>onaylamak</button>
                <button onClick={() => handleCancelChanges()}>iptal</button>
              </div>
            )}
            <div
              id={`review/buttons/${review.id}`}
              className="reviewComponent__buttons"
            >
              {/* <div className="reviewComponent__buttons__likeCount">
              <p>Popularity: </p>
            </div> */}
              {client ? (
                <>
                  <Button
                    className="reviewComponent__buttons__button"
                    client={client}
                    type={"user"}
                    onClick={handleLike}
                  >
                    {client.type.includes("user") ? (
                      client.user.likedReviews.includes(review.id) ? (
                        <p className="reviewComponent__buttons__button-liked">  
                        beğenildi : {review.likedByUsers.length}
                        </p>
                      ) : (
                        <p className="reviewComponent__buttons__button-like">
                          Beğen: {review.likedByUsers.length}
                        </p>
                      )
                    ) : null}
                  </Button>
                  <Button
                    className="reviewComponent__buttons__button"
                    client={client}
                    type={"user"}
                    onClick={() =>
                      document
                        .getElementById(`review-${review.id}-write-comment`)
                        .focus()
                    }
                  >
                    {client.type.includes("user") ? (
                      <p className="reviewComponent__buttons__button-reply">
                        Yanıtla
                      </p>
                    ) : null}
                  </Button>
                  <Button
                    onClick={handleFollow}
                    className="reviewComponent__buttons__button"
                    client={client}
                    type={"user"}
                  >
                    {client.type.includes("user") ? (
                      client.user.followedReviews.includes(review.id) ? (
                        <p className="reviewComponent__buttons__button-following">
                        Takip etmek
                        </p>
                      ) : (
                        <p className="reviewComponent__buttons__button-follow">
                        Takip Et
                        </p>
                      )
                    ) : null}
                  </Button>
                  <Button
                    onClick={handleResolve}
                    className="reviewComponent__buttons__button"
                    client={client}
                    type={"user"}
                  >
                    {client.type.includes("user") &&
                    !review.isThanked &&
                    client.user.id === review.user.id ? (
                      client.user.resolvedReviews.includes(review.id) ? (
                        <p className="reviewComponent__buttons__button-resolved">
                        Çözümlendi
                        </p>
                      ) : (
                        <p className="reviewComponent__buttons__button-resolve">
                        Sorun Çözüldü
                        </p>
                      )
                    ) : null}
                  </Button>
                  <Button
                    className="reviewComponent__buttons__button "
                    onClick={handleThank}
                    client={client}
                    type={"user"}
                  >
                    {review &&
                    client.type.includes("user") &&
                    client.user.id === review.user.id ? (
                      review.isResolved ? (
                        review.isThanked ? (
                          <p className="reviewComponent__buttons__button-thanked">
                            Teşekkür Etti
                          </p>
                        ) : (
                          <p className="reviewComponent__buttons__button-thank">
                          Teşekkür
                          </p>
                        )
                      ) : null
                    ) : null}
                  </Button>
                </>
              ) : null}
            </div>
          </div>
          {
            <div id={`review/comment/${review.id}`}>
              {review.comments.length > 0 ? (
                <Comments
                  setHeight={setFirstCommentHeight}
                  commentsAllowed={commentsAllowed}
                  review={review}
                  comments={comments}
                  client={client}
                  showComments={showComments}
                  commentsLoading={commentsLoading}
                  moreCommentsLoading={moreCommentsLoading}
                  totalComments={totalComments}
                  handleCommentLike={handleCommentLike}
                  handleShowComments={handleShowComments}
                  updateFirstLine={updateFirstLine}
                />
              ) : null}
            </div>
          }
        </div>
      </div>
      <div className="reviewComponent-container__lower">
        <div className="reviewComponent__comments__writeComment-container">
          {client ? (
            client.type.includes("user") || client.type.includes("admin") ? (
              <div className="reviewComponent__comments__writeComment">
                <Link to={`/user/${client.user.id}`}>
                  <img
                    className="reviewComponent__comments__writeComment__userImage"
                    src={client.user.profileImage}
                    alt=""
                  />
                </Link>
                <form onSubmit = {(e) => {
                  e.preventDefault()
                  handleCommentUser()
                }} className="reviewComponent__comments__writeComment__input">
                  <input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    className=""
                    type="text"
                    placeholder="Yorumunuzu Yazın"
                    id={`review-${review.id}-write-comment`}
                  />
                  {!commentIsSending ? (
                    <FiSend
                      type = 'submit'
                      onClick={handleCommentUser}
                      className={`reviewComponent__comments__writeComment__sendIcon ${
                        commentText.length < 1 &&
                        `reviewComponent__comments__writeComment__sendIcon-hide`
                      }`}
                    />
                  ) : (
                    <LoadingIndicator className="reviewComponent__comments__writeComment__sendIcon-loader" />
                  )}
                </form>
              </div>
            ) : client.type.includes("brand") &&
              client.brand.id === review.brand.id ? (
              <div className="reviewComponent__comments__writeComment">
                <Link to={`/brand/${client.brand.slug}`}>
                  <img
                    className="reviewComponent__comments__writeComment__userImage"
                    src={client.brand.logo}
                    alt=""
                  />
                </Link>
                <form onSubmit = {(e) => {
                  e.preventDefault()
                  handleCommentBrand()
                }} className="reviewComponent__comments__writeComment__input">
                  <input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    className=""
                    type="text"
                    placeholder="Yorumunuzu Yazın"
                    id={`review-${review.id}-write-comment`}
                  />
                  {!commentIsSending ? (
                    <FiSend
                      type = 'submit'
                      onClick={handleCommentBrand}
                      className={`reviewComponent__comments__writeComment__sendIcon ${
                        commentText.length < 1 &&
                        `reviewComponent__comments__writeComment__sendIcon-hide`
                      }`}
                    />
                  ) : (
                    <LoadingIndicator className="reviewComponent__comments__writeComment__sendIcon-loader" />
                  )}
                </form>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default Review;
