import React, { useEffect, useState } from "react";

import MyDetails from './components/MyDetails/MyDetails'
import BrandReviews from "../../../search/components/BrandReviews";
import BrandImage from "../../../../assests/images/brandcar.png";
import BrandLogo from "../../../../assests/images/kia_logo.png";
import Profile from "../../../../assests/images/Profile Image.png";

const ProfileDetail = ({user, visitorIsUser}) => {
  const [showDetails, setShowDetails] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewFollow, setShowReviewsFollow] = useState(false);   

  const [option ,setOption] = useState(0)

  useEffect(() => {
    if(visitorIsUser){
      if(visitorIsUser){
        setOption(1)
      }
      else{
        setOption(2)
      }
    }
  }, [visitorIsUser])

  const [testBrand] = useState({
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

  console.log(visitorIsUser)

  return (
    <section className="details">
      <ul>
        {
          visitorIsUser &&
          <li onClick={() => {option === 1 ? setOption(0) : setOption(1)}} className = {option === 1 ? 'details__list__click': ''}>Details</li>
        }
        <li onClick={() => {option === 2 ? setOption(0) : setOption(2)}} className = {option === 2 ? 'details__list__click': ''} >Reviews</li>
        {
          visitorIsUser &&
          <li onClick={() => {option === 3 ? setOption(0) : setOption(3)}} className = {option === 3 ? 'details__list__click': ''}>Reviews I Follow</li>
        }
      </ul>
            {
              option === 1 ? 
                (
                    <MyDetails user={user}/>
                )
              : option === 2  ? 
                (
                  <BrandReviews comments = {testBrand.comments}/>
                )
              : option === 3  ? 
                (
                  <h1>hello this is show reviews and followings</h1>
                )
              :
                  null
            }
    </section>
  );
};

export default ProfileDetail;
