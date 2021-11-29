import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import MyDetails from './components/MyDetails/MyDetails'
import { axios } from "../../../../axios/axiosInstance";
import Review from "../../../../components/reviews/Review";
import Pagination from "../../../../components/Pagination/Pagination"
import LoadingIndicator from "../../../../components/loadingIndicator/LoadingIndicator";
import FilterComponent from "../../../../components/filter_component/FilterComponent"
import { useSelector } from "react-redux";
const ProfileDetail = ({user, visitorIsUser, userId, setClientDetails}) => {
  // console.log('user:>', user);
  const {client} = useSelector(state => state.client)
  const location = useLocation()
  const [option ,setOption] = useState(2)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})
  const [sortOptions, setSortOptions] = useState({})
  const [followPage, setFollowPage] = useState(1)
  const [totalfollowPage, setTotalFollowPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [updatedReview, setUpdatedReview] = useState(null)
  const [reviewData, setReviewData] = useState([])
  const [followData, setFollowData] = useState([])
  const [areReviewsLoading, setAreReviewsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [followCurrentPage, setFollowCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState({
    review: true,
    follow: true
  })
  const handlePageination = (index) => {
    setPage(index)
    setReviewData([])
  }

  const handlePageinationForFollow = (index) => {
    setFollowPage(index)
    setFollowData([])
  }

  useEffect(() => {
    if(visitorIsUser){
      if(visitorIsUser){
        setOption(1)
      }
      else{
        setOption(2)
      }
    }
    if(location){
      const search = location.search
      const n = new URLSearchParams(location.search).get('option')
      console.log(n)
      if(n === "brands"){
        setOption(4)
      }
    }
  }, [visitorIsUser, location])


  //ANCHOR use effect for getting user reviews from api

  useEffect(() => {
        if(option === 2){
          setIsLoading({...isLoading, review: true})
          let filters = {
            "user": user.id,

            ...filter
          }
      if(!visitorIsUser){
        filters = {
          ...filters,
          isVerified : true,
        }
      }
      axios
      .post(`review/query/`,{

        filters,
        options:{
          page,
          limit: 10,
          populate:"user.User, brand.Brand",
          sortBy: sortOptions,
      }
      })
      .then(({data}) =>{
        setReviewData(data.results)
        setTotalPages(data.totalPages)
        setIsLoading({...isLoading, review: false})
        setCurrentPage(data.page)
      })
      .catch(err => {
        setIsLoading({...isLoading, review: false})
        console.log(err)
      })
      }
      else{
        setReviewData([])
      }
  }, [page, option, sortOptions, filter])

  //ANCHOR use effect for getting user reviews|follows

  useEffect(() => {
    if(option === 3){
      setIsLoading({...isLoading, follow: true})
      

    axios
    .post(`/review/query`,{
      filters:{
        followedByUsers:JSON.stringify({
          $in: user.id
        }),
        ...filter
      },
      options:{
        page,
        limit: 10,
        populate:"user.User, brand.Brand",
        sortBy: sortOptions
    }
    })
    .then(({data}) =>{ 
      setIsLoading({...isLoading, follow: false})
      setReviewData(data.results)
      setTotalFollowPage(data.totalPages)
      setFollowCurrentPage(data.page)
    })
    .catch(err => {
      setIsLoading({...isLoading, follow: false})
      console.log(err)
    })
    }
    else{
      setFollowData([])
    }
  
}, [followPage, option, sortOptions, filter])


useEffect(() => {
  if(updatedReview){
    console.log(updatedReview);
    console.log(reviewData);
    setReviewData(
      reviewData.map(review => {
        
        if(option === 3){
          if(updatedReview.id === review.id){
            if(updatedReview.followedByUsers.length !== review.followedByUsers.length){
              return null
            }
            else{
              return updatedReview
            }
          }
        }
        else{
          if(review.id === updatedReview.id){
            return updatedReview
          }
        }
        return review
      }).filter(review => review !== null)
    )
    setUpdatedReview(null)
  }
}, [updatedReview])

  


  // console.log(visitorIsUser)

  return (
    <section className="details">
      <div className="details__list">
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
          <div className="details__list__filters">
            {
              option !== 1 &&
              <FilterComponent tab="review" setFilters={setFilter} setSortOptions={setSortOptions} />
            }
          </div>
      </div>
            {
              option === 1 ? 
                (
                    <MyDetails user={user} setClientDetails = {setClientDetails}/>      
                )
              : option === 2  ? 
                (

                  <div className="details__reviews">
                    <div className="details__reviews__comment" style = {{position: 'relative'}}>
                      {
                        reviewData.length > 0  ?
                          (reviewData.map(review =>
                            {
                              return <Review setUpdatedReview ={setUpdatedReview} review = {review} commentsAllowed={true} /> 
                            }
                          ))
                      :
                        isLoading.review 
                        ?
                            <LoadingIndicator />
                        :
                          <h1>no reviews yet.....</h1>
                      }
                    </div>
                    {
                      totalPages > 1 &&
                      <Pagination currentPage ={currentPage} handlePageination = {handlePageination} totalPages={totalPages}/>
                    }
                  </div>
          
                  

                )
              : option === 3  ? 
                (
                  <div className="details__reviews">
                    <div className="details__reviews__comment" style = {{position: 'relative'}}>
                      {
                        reviewData.length > 0  ?
                          (reviewData.map(follow =>
                            {
                              return <Review review = {follow} setUpdatedReview ={setUpdatedReview} commentsAllowed={true} /> 
                            }
                          ))
                      :
                      isLoading.follow 
                        ?
                            <LoadingIndicator />
                        :
                          <h1>oops no ff yet.....</h1>
                      }
                    </div>
                    {
                      followData.length > 9 &&
                      <Pagination handlePageination = {handlePageinationForFollow} totalPages={totalfollowPage}/>
                    }
                  </div>
                )
                : option === 4  ? 
                (
                  <h1>Brands Manaing</h1>
                )
              :
                  null
            }
    </section>
  );
};

export default ProfileDetail;
