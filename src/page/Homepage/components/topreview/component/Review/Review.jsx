import React from 'react'
import { Link } from 'react-router-dom'
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
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.3366 6.60198L14.3287 6.04477L11.9422 0.503063C11.7751 0.115027 11.2249 0.115027 11.0578 0.503063L8.67132 6.04473L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L11.5 14.7506L16.688 17.8311C17.0513 18.0468 17.4964 17.7234 17.4035 17.3113L16.0769 11.4252L20.6099 7.44306C20.9273 7.16423 20.7573 6.64097 20.3366 6.60198Z" fill="#FFDC64"/>
                                <path d="M5.35812 0.312281C5.6644 0.737692 6.52888 2.56467 7.02311 3.62941C7.10082 3.79679 6.89081 3.94799 6.75672 3.82118C5.90379 3.01474 4.4454 1.61533 4.13912 1.18988C3.89676 0.853276 3.97318 0.383932 4.30982 0.141578C4.64642 -0.100776 5.11577 -0.0243188 5.35812 0.312281Z" fill="#FFF082"/>
                                <path d="M17.6418 0.312281C17.3356 0.737692 16.4711 2.56467 15.9769 3.62941C15.8991 3.79679 16.1092 3.94799 16.2432 3.82118C17.0962 3.01474 18.5545 1.61529 18.8609 1.18988C19.1032 0.853276 19.0268 0.383932 18.6901 0.141578C18.3535 -0.100776 17.8842 -0.0243188 17.6418 0.312281Z" fill="#FFF082"/>
                                <path d="M22.4816 12.7874C21.9832 12.6248 19.98 12.3563 18.8154 12.209C18.6324 12.1858 18.5522 12.4318 18.7136 12.5211C19.7411 13.0887 21.5175 14.0529 22.0159 14.2154C22.4102 14.344 22.8341 14.1286 22.9627 13.7342C23.0913 13.3399 22.8759 12.916 22.4816 12.7874Z" fill="#FFF082"/>
                                <path d="M0.518334 12.7874C1.0167 12.6248 3.01999 12.3563 4.1845 12.209C4.36756 12.1858 4.44779 12.4318 4.2863 12.5211C3.2588 13.0887 1.48245 14.0529 0.984085 14.2154C0.58976 14.344 0.165831 14.1286 0.0372199 13.7342C-0.0913916 13.3399 0.124009 12.916 0.518334 12.7874Z" fill="#FFF082"/>
                                <path d="M10.772 21.2633C10.772 20.7391 11.1379 18.7513 11.3589 17.5984C11.3936 17.4172 11.6524 17.4172 11.6871 17.5984C11.9081 18.7513 12.274 20.7391 12.274 21.2633C12.274 21.678 11.9378 22.0143 11.523 22.0143C11.1082 22.0143 10.772 21.678 10.772 21.2633Z" fill="#FFF082"/>
                                <path d="M12.81 2.51826L11.9421 0.503063C11.775 0.115027 11.2249 0.115027 11.0578 0.503063L8.67127 6.04472L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L7.00247 17.4211C8.13445 10.0935 11.3168 4.71441 12.81 2.51826Z" fill="#FFC850"/>
                            </svg>
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
