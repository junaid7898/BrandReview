import React from 'react'
import HalfStar from '../../../assests/HalfStar'
import Star from '../../../assests/Star'
import BrandComparison from '../../../components/brand_comparison/BrandComparison'

const BrandInfo = ({brand}) => {
    return (
        <div className="brand__information">
            <div className="brand__information__img-ratings">
                <div className="brand__information__img-ratings__info">
                    <img src = {brand.logo} className = 'brand__information__img-ratings__img' alt = 'brand'/>
                    <div className="brand__information__img-ratings__info__stars">
                    {
                        Array(Math.ceil(brand.averageRating)).fill().map((_, index)=>{
                            if(index < Math.floor(brand.averageRating)){
                                return    <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                            }
                            else{
                                return <HalfStar />
                            }
                        })
                    }
                    </div>
                    <p>{brand.reviews.length > 0 ? `${brand.averageRating.toFixed(1)} out of ${brand.reviews.length} reviews` : 'No reviews for now'} </p> 
                </div>
            </div>

            <div className="brand__information__title-about">
                <div className = 'brand__information__title-about__premeired'>
                    <h3>{brand.name}</h3>
                    {
                        brand.premiered ? 
                            <div className = 'brand__information__title-about__premeired__tag'>
                                Premiered                                
                            </div>
                            :
                            null
                    }
                </div>
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
