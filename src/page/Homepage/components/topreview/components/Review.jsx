import React from 'react'
import { Link } from 'react-router-dom'
import Star from '../../../../../assests/Star';
function Review(props) {
    function truncateString(str, num) {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
    }
    return (
        <div className="topReview__item">
            <div className="topReview__item__heading">
                <Link to="/" className="topReview__item__heading__userImage"><img src="https://findfahad.com/static/media/profile.41fb5230.png" alt="idk"/></Link>
                <Link to="/" className="topReview__item__heading__userName"><p className="topReview__item__heading__name">Fahad</p></Link>
            </div>
            <div className="topReview__item__body">
                <Link to="/" className="topReview__item__body__brandName"><p>Toyota</p></Link>
                <p className="topReview__item__body__reviewText">"{truncateString(props.text,250)}"</p>
            </div>
            <div className="topReview__item__footer">
                <div className="topReview__item__footer__stars">
                    {
                        Array(Math.round(props.rating)).fill().map((_)=>(
                            <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                        ))
                    }
                </div>
                <div className="topReview__item__footer__rating">
                    <p>{props.rating} Ratings</p>
                </div>
            </div>
        </div>
    )
}

export default Review
