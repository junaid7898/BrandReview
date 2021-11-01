import React, { useEffect, useState } from 'react'
import Review from './components/Review'
import Ticker from 'react-ticker'
import {axios} from '../../../../axios/axiosInstance'
function TopReview() {
    const [reviewsDataUpper, setReviewsDataUpper] = useState([])
    const [reviewsDataLower, setReviewsDataLower] = useState([])
    useEffect(() => {
        axios.get("/review/topreviews")
        .then(({data}) =>{
            const halfwayThrough = Math.floor(data.length / 2)
            const arrayFirstHalf = data.slice(0, halfwayThrough);
            const arraySecondHalf = data.slice(halfwayThrough, data.length);
            setReviewsDataUpper(arrayFirstHalf)
            setReviewsDataLower(arraySecondHalf)
        })
    }, [])


    // useEffect(() => {
    //     console.log(reviewsDataUpper)
    //     console.log(reviewsDataLower)
    // }, [setReviewsDataUpper, reviewsDataLower])


    return (
        <div className="topReview">
            {
                reviewsDataUpper.length > 0 &&
                <Ticker speed={5}>
                    {   
                        () => (
                            <div className="topReview__review-container topReview__review-container-upper">
                                {
                                    reviewsDataUpper.map(review =>
                                        <Review review={review} />
                                    )
                                }
                            </div>
                        )
                    }
                </Ticker>
            }
            {
                reviewsDataLower.length > 0 &&
                <Ticker speed={5}>
                {
                    () => (
                        <div className="topReview__review-container topReview__review-container-lower">
                            {
                                reviewsDataLower.map(review =>
                                    <Review review={review} />
                                )
                            }
                        </div>

                    )
                }
                </Ticker>
            }
                
        </div>
    )
}

export default TopReview
