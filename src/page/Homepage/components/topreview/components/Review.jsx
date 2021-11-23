import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Star from '../../../../../assests/Star';
import Dots from '../../../../../assests/Dots'
function Review({review}) {
    function truncateString(str, num) {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
    }
    return (
        review &&
        <div className="topReview__item" id = {review._id}>
                <div className="topReview__item-dots">
                    <Dots />
                </div>
            <div className="topReview__item__heading">
                <Link to={`/user/${review.user._id}`} className="topReview__item__heading__userImage"><img src={review.user.profileImage} alt="idk"/></Link>
                <Link to={`/user/${review.user._id}`} className="topReview__item__heading__userName"><p className="topReview__item__heading__name">{review.user.name}</p></Link>
            </div>
            <div className="topReview__item__body">
                <Link to={`/brand/${review.brand.slug}`} className="topReview__item__body__brandName"><p>{review.brand.name}</p></Link>
                <Link to={`/brand/${review.brand.slug}?review=${review._id}`}><p className="topReview__item__body__reviewText">"{truncateString(review.message,250)}"</p></Link>
            </div>
            <div className="topReview__item__footer">
                <div className="topReview__item__footer__stars">
                    {
                        Array(Math.round(review.rating)).fill().map((_)=>(
                            <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                        ))
                    }
                </div>
                <div className="topReview__item__footer__rating">
                    <p>{review.rating} Ratings</p>
                </div>
            </div>
        </div>
    )
}

export default Review
