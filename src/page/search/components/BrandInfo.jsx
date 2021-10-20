import React from 'react'
import Star from '../../../assests/Star'
import BrandComparison from '../../../components/brand_comparison/BrandComparison'

const BrandInfo = ({brand}) => {
    return (
        <div className="brand__information">
            <div className="brand__information__img-ratings">
                <img src = {brand.logo} className = 'brand__information__img-ratings__img' alt = 'brand'/>
                <div className="brand__information__img-ratings__info">
                    <div className="brand__information__img-ratings__info__stars">
                    {
                        Array(Math.round(brand.ratingCount < 1 ? 1 : brand.ratingCount )).fill().map((_)=>(
                            <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                        ))
                    }
                    </div>
                    
                    <p>{4.3} out of {23423432} ratings</p>
                </div>
            </div>
            <div className="brand__information__title-about">
                {/* TODO brand logo, name, about */}
                <h3>{brand.name}</h3>
                <p className = 'brand__information__title-about__para'>{brand.about}</p>
            </div>
            <div className="brand__information__comapre">
                {/* TODO brand comparison component */}
                <BrandComparison/>
            </div>
        </div>
    )
}

export default BrandInfo
