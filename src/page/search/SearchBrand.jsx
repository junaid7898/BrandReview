import React, { useEffect, useRef, useState } from "react";
import BrandInfo from "./components/BrandInfo";
import Review from "../../components/reviews/Review";
import WriteYourReviewComponent from "../../components/write_your_review_input/WriteYourReviewComponent";
import { useLocation, useParams } from "react-router";
import EmptyData from "../../components/EmptyDataComponent/EmptyData";
import {axios} from "../../axios/axiosInstance";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import TopBrands from "../../components/top-brands/TopBrands"
import VerticalDotBackGround from "../login/components/VerticalDotBackGround";
import HorizantalDotBackground from "../login/components/HorizantalDotBackground";
import BlueSpiralBackground from "../login/components/BlueSpiralBackground";
import ZigZagBackgroundComponent from "../login/components/ZigZagBackgroundComponent";
import SpiralBackground from "../login/components/SpiralBackground";
import BrandComparison from "../../components/brand_comparison/BrandComparison";
const SearchBrand = () => {
    useEffect(() => {
      window.scrollTo(0,0)
  }, [useLocation().pathname])
  const query = new URLSearchParams(useLocation().search)
  const {brandSlug} = useParams()
  const {client} = useSelector(state => state.client)
  const [brandData, setBrandData] = useState(null)
  const [reviewData, setReviewData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [areReviewsLoading, setAreReviewsLoading] = useState(true)
  const [updatedReview, setUpdatedReview] = useState(null)
  const [queryReviewId, setQueryReviewId] = useState(null)
  const [isBrandDataSet, setIsBrandDataSet] = useState(false)
  const [isUrlQuery, setIsUrlQuery] = useState(false)
  useEffect(() => {
    if(brandSlug){
      setIsUrlQuery(true)
      console.log(brandSlug)
      axios
        .get(`/brand/page/${brandSlug}`)
        .then(({data}) => {
          setBrandData(data)
          setIsBrandDataSet(true)
        })
        .catch(err =>{
          console.log(err)
        })
      }
  }, [brandSlug])

  useEffect(() => {
        if(isBrandDataSet){
          const options = {
            page,
            limit: 10,
            populate: "user.User"
          }
          let filters={
            "brand": brandData.id
          }
          const reivewId = query.get("review")
          if(reivewId && isUrlQuery){
            filters={
              "_id": reivewId
            }
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
  }, [isBrandDataSet, page, isUrlQuery])


  const handlePageination = (index) => {
    setPage(index)
    setReviewData([])
  }

  const handleShowAllComments = () =>{
    setReviewData([])
    setIsUrlQuery(false)
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
    <div className="brandMain" style = {{position: 'relative'}}>

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
            {
              isUrlQuery &&
              <button className="brandMain__showAllButton" onClick={ () => handleShowAllComments()}>
                Show all comments
              </button>
            }
        </div>
        <div className="brandMain__right">
          { 
            brandData && 
            <div className="brandMain__topbrands">
                  <h2>Top brands in the same category</h2>
                  <TopBrands category={brandData.category} skipBrandId={brandData.id}  rank={false} length={5} />
            </div>
          }
            {/* <div className="brandMain__right__compare">
                <BrandComparison />
            </div> */}
        </div>
      </div>


      
      <div className = 'brandMain__background__vertical-dot'>
        <VerticalDotBackGround/>
      </div>
      <div className = 'brandMain__background__vertical-dot2'>
        <VerticalDotBackGround/>
      </div>
      <div className = 'brandMain__background__horizantal-dot'>
        <HorizantalDotBackground/>
      </div>
      <div className = 'brandMain__background__blue-spiral'>
        <BlueSpiralBackground/>
      </div>
      <div className = 'brandMain__background__yellow-spiral'>
        <SpiralBackground/>
      </div>
      <div className = 'brandMain__background__yello-zigzag'>
        <ZigZagBackgroundComponent/>
      </div>
    </div>
  );
};

export default SearchBrand;
