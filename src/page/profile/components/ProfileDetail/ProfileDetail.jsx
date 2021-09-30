import React, { useState } from "react";

import MyDetails from './components/MyDetails/MyDetails'
import MyReviews from './components/MyReviews'
import ReviewsAndFollowings from './components/ReviewsAndFollowings'

const ProfileDetail = ({user}) => {
  const [showDetails, setShowDetails] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewFollow, setShowReviewsFollow] = useState(false);

  const handleShowDetail = () => {
    setShowDetails(true);
    setShowReviews(false);
    setShowReviewsFollow(false);
  };

  const handleShowReviews = () => {
    setShowDetails(false);
    setShowReviews(true);
    setShowReviewsFollow(false);
  };

  const handleShowReviewFollow = () => {
    setShowDetails(false);
    setShowReviews(false);
    setShowReviewsFollow(true);
  };

  return (
    <section className="details">
      <ul>
        <li onClick={handleShowDetail} className = {showDetails ? 'details__list__click': ''}>My Details</li>
        <li onClick={handleShowReviews} className = {showReviews ? 'details__list__click': ''} >My Reviews</li>
        <li onClick={handleShowReviewFollow} className = {showReviewFollow ? 'details__list__click': ''}>Reviews | Follow</li>
      </ul>
            {showDetails ? (
                <MyDetails user={user}/>
            ):(
                showReviews ? 
                (<MyReviews/>)
                :
                (<ReviewsAndFollowings/>)
            )}
    </section>
  );
};

export default ProfileDetail;
