import React, { useState } from "react";
import BrandInfo from "./components/BrandInfo";
import BrandImage from "../../assests/images/brandcar.png";
import BrandLogo from "../../assests/images/kia_logo.png";
import Profile from "../../assests/images/Profile Image.png";
import BrandReviews from "./components/BrandReviews";
import Review from "../../components/reviews/Review";

const SearchBrand = () => {
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
    <div>
      <BrandInfo brand={testBrand} />
      {/* <BrandReviews comments = {testBrand.comments}/>    */}
      <Review/>
    </div>
  );
};

export default SearchBrand;
