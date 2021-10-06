import React from 'react'
import Stars from '../../../assests/images/Stars.png'
import BrandComparison from '../../../components/brand_comparison/BrandComparison'

const BrandInfo = ({brand}) => {
    return (
        <div className="brand__information">
            <div className="brand__information__img-ratings">
                {/* TODO img and brand ratings */}
                <img src = {brand.brandImage} className = 'brand__information__img-ratings__img' alt = 'brand'/>
                <div className="brand__information__img-ratings__info">
                    <img src = {Stars} className = 'brand__information__img-ratings__info__img' alt = 'brand'/>
                    <p>{brand.brandRatings} out of {brand.brandTotalRatings} ratings</p>
                </div>
            </div>
            <div className="brand__information__title-about">
                {/* TODO brand logo, name, about */}
                <img src = {brand.brandLogo} alt = 'brand'/>
                <h3>{brand.brandName}</h3>
                <p className = 'brand__information__title-about__para'>{brand.brandAbout}</p>
            </div>
            <div className="brand__information__comapre">
                {/* TODO brand comparison component */}
                <BrandComparison/>
            </div>
        </div>
    )
}

export default BrandInfo
