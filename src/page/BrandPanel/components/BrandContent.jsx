import React, { useState } from "react";
import BrandIcon from "../../../assests/images/brand_icon.png";
import Star from '../../../assests/Star'

const BrandContent = ({item}) => {
  console.log('item: ', item);
  const [brand] = useState(
    {
      brandName: "BMW",
      brandIcon: BrandIcon,
      brandDetail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      brandReviews: '16m',
      brandRating: '4.9'
    }
  )

  return (
    <section >
      <div className = 'brand' >
          <div className="brand__logo">
              <img src = {item.logo} alt={`brand ${item.name} logo`}/>
          </div>
          <div className="brand__info">
              <h1 className="brand__info__name"> {item.name} </h1>
              <p className="brand__info__para">{item.about}</p>
          </div>    
          <div className="brand__progress">
              <div className="brand__progress__reviews">
                  <h1 className="brand__progress__reviews__count">{item.totalReviewCount}</h1>
                  <h3>Reviews</h3>
              </div>
              <div className = 'brand__progress__ratings'>
              <span>
                {
                  Array(Math.round(item.ratingCount < 1 ? 1 : item.ratingCount )).fill().map((_)=>(
                      <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                  ))
                }
                </span>
                <p>{item.ratingCount} Ratings</p>
              </div>
          </div>
      </div> 
    </section>
  );
};

export default BrandContent;
