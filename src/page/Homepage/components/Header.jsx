import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Star from '../../../assests/Star';
import {getAverageReviewRating} from "../../../helpers/getAverageReview"

function Header() {

    const {brands} = useSelector(state => state.brands)


    return (
        <div className="homepage__header-container">
            <div className="homepage__header">
                <div className="homepage__header__left">
                    <div className="homepage__header__left__sub">
                        <h1 className="homepage__header__infoHeading">
                        Choose The Best Brand Item with Us
                        </h1>
                        <p className="homepage__header__infoText">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
                        </p>
                        <Link to="/review" className="homepage__header__link">
                            Write a Review
                        </Link>
                    </div>
                </div>
                {
                    brands.length > 0 &&
                    <div className="homepage__header__right">
                    <div className="homepage__header__brand">
                        <div className="homepage__header__brand__col1">
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[0].id}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[0].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{getAverageReviewRating(brands[0].reviews).averageReviewRating} out of {getAverageReviewRating(brands[0].reviews).totalReviews} Reviews</p>
                                </div>
                            </div>
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[1].id}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[1].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{getAverageReviewRating(brands[1].reviews).averageReviewRating} out of {getAverageReviewRating(brands[1].reviews).totalReviews} Reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="homepage__header__brand__col2">
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[2].id}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[2].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{getAverageReviewRating(brands[2].reviews).averageReviewRating} out of {getAverageReviewRating(brands[2].reviews).totalReviews} Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Header
