import React, { useEffect, useState } from "react";
import Star from '../../../assests/Star'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { axios } from "../../../axios/axiosInstance";

const BrandContent = ({item}) => {
  console.log('item: ', item);
  const [imageIsLoading, setImageIsLoading] = useState(true)
  const [avgRating, setAvgRating] = useState(null)

  useEffect(() => {
    const filters = { brand: item.id }
    const options = {limit: 100000}
    axios.post('/review/query', {filters, options})
    .then(({data}) => {
      console.log('brand review: ', data);
      let totalCount = 0;
      data.results.map(item => {
        totalCount = totalCount + item.ratingCount
        console.log('rating: ', item.ratingCount, 'totalCount: ', totalCount);
      })
      setAvgRating(Math.round(totalCount / data.results.length))
    })
  }, [])

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
                  <h1 className={item.totalReviewCount > 0 ? 'brand__progress__reviews__count' : 'brand__progress__reviews__count-zero'}>
                    {item.reviews.length > 0 ? item.reviews.length : 'no reviews yet'}
                  </h1>
                  <h3>Reviews</h3>
              </div>
              <div className = 'brand__progress__ratings'>
              <span>
                {
                  Array(Math.round(avgRating < 1 ? 1 : avgRating )).fill().map((_)=>(
                      <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                  ))
                }
                </span>
                <p>{avgRating} Ratings</p>
              </div>
          </div>
      </div> 
    </section>
  );
};

export default BrandContent;
