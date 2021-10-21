import React, { useEffect, useState } from "react";
import BrandInfo from "./components/BrandInfo";
import BrandImage from "../../assests/images/brandcar.png";
import BrandLogo from "../../assests/images/kia_logo.png";
import Profile from "../../assests/images/Profile Image.png";
import Review from "../../components/reviews/Review";
import WriteYourReviewComponent from "../../components/write_your_review_input/WriteYourReviewComponent";
import { useParams } from "react-router";

import {axios} from "../../axios/axiosInstance";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import { useSelector } from "react-redux";
const SearchBrand = () => {
  

  const {brandId} = useParams()
  const {client} = useSelector(state => state.client)
  const [brandData, setBrandData] = useState(null)
  const [reviewData, setReviewData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [areReviewsLoading, setAreReviewsLoading] = useState(true)
  useEffect(() => {
    
    if(brandId){
      axios
        .get(`/brand/${brandId}`)
        .then(({data}) => {
          setBrandData(data)
          let num = data.reviews.length/10
          if(num > Math.round(num)){
            num = Math.round(num + 1)
          }
          setTotalPages(num)
        })
        .catch(err =>{
          console.log(err)
          // console.log(err.response.data.message)
        })
      }
  }, [brandId])

  useEffect(() => {
    if(brandId){
      axios
      .get(`review/brand/${brandId}?page=${page}`)
      .then(({data}) =>{
        setReviewData(data)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [brandId, page])


  const handlePageination = (index) => {
    setPage(index)
    setReviewData([])
  }

  return (
    <div className="brandMain">

      {
        brandData &&
        <BrandInfo brand={brandData} />
      }
      <div className="brandMain__writeReview">
        <WriteYourReviewComponent setPage = { setPage }/>
      </div>
      <div className="brandMain__reviews-container">
      
      <div className="brandMain__reviews">
        {
          reviewData.length > 0 && areReviewsLoading ?
          reviewData.map(review =>{
          return <Review review = {review} /> 
        })
        :
          <LoadingIndicator />
        }

      </div>
        <div className="brandMain__pagination">
          {
            Array(Math.round(totalPages)).fill().map((_, index) =>
              <div key={index} onClick={ () => handlePageination(index + 1)} className="brandMain__pagination__item">
                <p>{ index + 1 }</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBrand;
