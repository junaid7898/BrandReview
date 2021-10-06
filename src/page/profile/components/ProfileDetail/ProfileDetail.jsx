import React, { useState } from "react";

import MyDetails from './components/MyDetails/MyDetails'
import BrandReviews from "../../../search/components/BrandReviews";
import BrandImage from "../../../../assests/images/brandcar.png";
import BrandLogo from "../../../../assests/images/kia_logo.png";
import Profile from "../../../../assests/images/Profile Image.png";

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

  const [testBrand, setTestBrand] = useState({
    brandImage: BrandImage,
    brandRatings: 4.9,
    brandTotalRatings: 1200,
    brandLogo: BrandLogo,   
    brandName: "Kia sportage",
    brandAbout:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. ",
    comments: [
      {
        userName: 'junaid',
        userImg: Profile,
        userRatings: 5.0,
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        commentReplies: [
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      },
      {
        userName: 'junaid',
        userImg: Profile,
        userRatings: 5.0,
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        commentReplies: [
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      },
      {
        userName: 'junaid',
        userImg: Profile,
        userRatings: 5.0,
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        commentReplies: [
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      },
      {
        userName: 'junaid',
        userImg: Profile,
        userRatings: 5.0,
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        commentReplies: [
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
          {
            userImg: Profile,
            reply:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      }
    ],
  });

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
                (<BrandReviews comments = {testBrand.comments}/>)
                :
                (<h1>hello this is show reviews and followings</h1>)
            )}
    </section>
  );
};

export default ProfileDetail;
