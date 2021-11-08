import React, { useEffect, useState } from 'react'
import Star from '../../../assests/Star'
import BrandComparison from '../../../components/brand_comparison/BrandComparison'
import { axios } from '../../../axios/axiosInstance'

const BrandInfo = ({brand}) => {
    return (
        <div className="brand__information">
            <div className="brand__information__img-ratings">
                <div className="brand__information__img-ratings__info">
                    <img src = {brand.logo} className = 'brand__information__img-ratings__img' alt = 'brand'/>
                    <div className="brand__information__img-ratings__info__stars">
                    {
                        Array(Math.round(brand.averageRating < 1 ? 1 : brand.averageRating )).fill().map((_)=>(
                            <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                        ))
                    }
                    </div>
                    <p>{`${brand.averageRating} ratings out of ${brand.reviews.length} reviews`} </p> 
                </div>

                <div className="brand__information__title-about">
                    <h3>{brand.name}</h3>
                    <p className = 'brand__information__title-about__para'>{brand.about}</p>
                </div>

            </div>
            
            <div className="brand__information__comapre">
                {/* TODO brand comparison component */}
                <BrandComparison/>
            </div>
        </div>
    )
}

export default BrandInfo
