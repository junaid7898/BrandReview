import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Star from '../../../../../assests/Star';
function Review({review}) {

    useEffect(() => {
        console.log(review)
    }, [review])

    function truncateString(str, num) {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
    }
    return (
        review &&
        <div className="topReview__item">
            <div className="topReview__item__heading">
                <Link to={`/user/${review.user.id}`} className="topReview__item__heading__userImage"><img src={review.user.profileImage} alt="idk"/></Link>
                <Link to={`/user/${review.user.id}`}className="topReview__item__heading__userName"><p className="topReview__item__heading__name">{review.user.name}</p></Link>
            </div>
            <div className="topReview__item__body">
                <Link to={`brand/${review.brand.id}`} className="topReview__item__body__brandName"><p>{review.brand.name}</p></Link>
                <p className="topReview__item__body__reviewText">"{truncateString(review.message,250)}"</p>
            </div>
            <div className="topReview__item__footer">
                <div className="topReview__item__footer__stars">
                    {
                        Array(Math.round(review.ratingCount)).fill().map((_)=>(
                            <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                        ))
                    }
                </div>
                <div className="topReview__item__footer__rating">
                    <p>{review.ratingCount} Ratings</p>
                </div>
            </div>
        </div>
    )
}

export default Review
