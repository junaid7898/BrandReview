import React, { useEffect, useState } from "react";
import Star from '../../../assests/Star'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";

const BrandContent = ({item}) => {
  console.log('item: ', item);
  const [imageIsLoading, setImageIsLoading] = useState(true)

  return (
    <section >
      <div className = 'brand' >
          <div className="brand__logo">
              <img onLoad={() => setImageIsLoading(false) }src = {item.logo} alt={`brand ${item.name} logo`}/>
              {
                imageIsLoading &&
                <LoadingIndicator />
              }
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
