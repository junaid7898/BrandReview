import React, { useEffect, useState } from 'react'
import Star from '../../../assests/Star'
import BrandComparison from '../../../components/brand_comparison/BrandComparison'
import { axios } from '../../../axios/axiosInstance'

const BrandInfo = ({brand}) => {
    const [averageRatings, setAverageRatings] = useState(null)
    const [numberOfRatings, setNumberOfRatings] = useState(null)
    useEffect(() => {
        if(brand){
            const filters = { brand: brand.id }
            const options = {limit: 100000}
            axios.post('/review/query', {filters, options})
            .then(({data}) => {
              console.log('brand review: ', data);
              let avgRatings = 0;
              data.results.map(item => {
                avgRatings = avgRatings + item.ratingCount
              })
              setAverageRatings((avgRatings / data.results.length).toFixed(1))
              setNumberOfRatings(data.results.length)
            })
        }
    }, [brand])
    return (
        <div className="brand__information">
            <div className="brand__information__img-ratings">
                <div className="brand__information__img-ratings__info">
                    <img src = {brand.logo} className = 'brand__information__img-ratings__img' alt = 'brand'/>

                    <div className="brand__information__img-ratings__info__stars">
                    {
                        Array(Math.round(brand.ratingCount < 1 ? 1 : brand.ratingCount ) + 3).fill().map((_)=>(
                            <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                        ))
                    }
                    </div>
                    
                    <p>{averageRatings && numberOfRatings ? `${averageRatings} ratings out of ${numberOfRatings} reviews`: 'no reviews'} </p> 
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
