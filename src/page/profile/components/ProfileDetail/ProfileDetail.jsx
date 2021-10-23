import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import MyDetails from './components/MyDetails/MyDetails'
import { axios } from "../../../../axios/axiosInstance";
import Review from "../../../../components/reviews/Review";
import Pagination from "../../../../components/Pagination/Pagination"
const ProfileDetail = ({user, visitorIsUser, userId}) => {
  console.log('user:>', user);
  const location = useLocation()
  const [option ,setOption] = useState(0)
  const [page, setPage] = useState(1)
  const [followPage, setFollowPage] = useState(1)
  const [totalfollowPage, setTotalFollowPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [reviewData, setReviewData] = useState([])
  const [followData, setFollowData] = useState([])
  const [areReviewsLoading, setAreReviewsLoading] = useState(true)


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
        let num = user.reviews.length/10;
        
        if(num > Math.round(num)){
          num = Math.round(num + 1)
        }
        else{
          num = Math.round(num)
        }
        console.log('total reviews:', num);
        setTotalPages(num)
      axios
      .get(`review/user/${userId}?page=${page}`)
      .then(({data}) =>{
        setReviewData(data)
      })
      .catch(err => {
        console.log(err)
      })
    
  }, [page])

  //ANCHOR use effect for getting user reviews|follows

  useEffect(() => {
    let num = user.followedReviews.length/10;
    if(num > Math.round(num)){
      num = Math.round(num + 1)
    }
    else{
      num = Math.round(num)
    }
    console.log('followed NUM:', num);
    setTotalFollowPage(num)


    axios
    .get(`review/user/follow/${userId}?page=${followPage}`)
    .then(({data}) =>{ 
      setFollowData(data)
    })
    .catch(err => {
      console.log(err)
    })
  
}, [followPage])



  


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
        {
          visitorIsUser &&
          <li onClick={() => {option === 4 ? setOption(0) : setOption(4)}} className = {option === 4 ? 'details__list__click': ''}>Manaing Brands</li>
        }
      </ul>
            {
              option === 1 ? 
                (
                    <MyDetails user={user}/>      
                )
              : option === 2  ? 
                (

                  <div className="details__reviews">
                    <div className="details__reviews__comment">
                      {
                        reviewData.length > 0  ?
                          (reviewData.map(review =>
                            {
                              return <Review review = {review} /> 
                            }
                          ))
                      :
                        /* <LoadingIndicator /> */
                        <h1>oops no reviews yet.....</h1>
                      }
                    </div>
                    <Pagination handlePageination = {handlePageination} totalPages={totalPages}/>
                  </div>
          
                  

                )
              : option === 3  ? 
                (
                  <div className="details__reviews">
                    <div className="details__reviews__comment">
                      {
                        followData.length > 0  ?
                          (followData.map(follow =>
                            {
                              return <Review review = {follow} /> 
                            }
                          ))
                      :
                        /* <LoadingIndicator /> */
                        <h1>you hav not follow any review yet.....</h1>
                      }
                    </div>
                    <Pagination handlePageination = {handlePageinationForFollow} totalPages={totalfollowPage}/>
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
