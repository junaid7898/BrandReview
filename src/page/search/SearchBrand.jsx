import React, { useEffect, useState } from "react";
import BrandInfo from "./components/BrandInfo";
import Review from "../../components/reviews/Review";
import WriteYourReviewComponent from "../../components/write_your_review_input/WriteYourReviewComponent";
import { useParams } from "react-router";
import EmptyData from "../../components/EmptyDataComponent/EmptyData";
import {axios} from "../../axios/axiosInstance";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import TopBrands from "../../components/top-brands/TopBrands"
const SearchBrand = () => {
  

  const {brandSlug} = useParams()
  const {client} = useSelector(state => state.client)
  const [brandData, setBrandData] = useState(null)
  const [reviewData, setReviewData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [areReviewsLoading, setAreReviewsLoading] = useState(true)
  const [updatedReview, setUpdatedReview] = useState(null)
  useEffect(() => {
    
    if(brandSlug){
      console.log(brandSlug)
      axios
        .get(`/brand/page/${brandSlug}`)
        .then(({data}) => {
          setBrandData(data)
        })
        .catch(err =>{
          console.log(err)
          // console.log(err.response.data.message)
        })
      }
  }, [brandSlug])

  useEffect(() => {
    if(brandData){
      const options = {
        page,
        limit: 10,
        populate: "user.User"
      }
      const filters={
        "brand.details": brandData.id
      }
      if(brandData.id){
        axios
        .post(`/review/query`,{
          options,
          filters
        })
        .then(({data}) =>{
          console.log(data)
          setCurrentPage(data.page)
          setTotalPages(data.totalPages)
          setReviewData(data.results)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }, [brandData, page])


  const handlePageination = (index) => {
    setPage(index)
    setReviewData([])
  }


  useEffect(() => {
    if(updatedReview){
      setReviewData(
        reviewData.map(review => {
          if(review.id === updatedReview.id){
            return updatedReview
          }
          return review
        })
      )
      setUpdatedReview(null)
    }
  }, [updatedReview])


  return (
    <div className="brandMain">

      {
        brandData &&
        <BrandInfo brand={brandData} />
      }
      {/* <div className="brandMain__writeReview">
        <WriteYourReviewComponent setPage = { setPage } brandId = {brandId}/>
      </div> */}
      <div className="brandMain__lower">
        <div className="brandMain__reviews-container">
        
          <div className="brandMain__reviews">
            {
              reviewData.length > 0 && areReviewsLoading ?
              reviewData.map(review =>{
              return <Review review = {review} brandData = {brandData} setBrandData = {setBrandData} setUpdatedReview = {setUpdatedReview} commentsAllowed={true} /> 
            })
            :
              <EmptyData value = 'No reviews posted for this brand...'/>
            }

          </div>
            <Pagination currentPage={currentPage} totalPages = {totalPages} handlePageination= {handlePageination} />
        </div>
        { 
          brandData && 
          <div className="brandMain__topbrands">
                <h2>Top brands in the same category</h2>
                {/* <TopBrands  rank={false} length={5} /> */}
          </div>
        }
      </div>
    </div>
  );
};

export default SearchBrand;
