import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAverageReviewRating } from '../../helpers/getAverageReview'
import { Link } from 'react-router-dom'
import FirstPosition from '../../assests/images/1st.png'
import SecontPosition from '../../assests/images/2nd.png'
import ThirdPosition from '../../assests/images/3rd.png'
import Star from "../../assests/Star"
function TopBrands({category, rank, length}) {


    const {brands} = useSelector(state => state.brands)
    const [brandsData, setBrandsData] = useState([])

    useEffect(() => {
        if(brands){

            if(!category){
                let sorted = [...brands]
                function mycomparator(a,b) {
                    return parseInt(b.averageRating) - parseInt(a.averageRating);
                }
                sorted.sort(mycomparator);
                setBrandsData([...sorted.slice(0, length)])
            }
            else if(category){
                const similarBrands = [...brands.filter(brand => brand.category === category)]
                let sorted = [...similarBrands]
                function mycomparator(a,b) {
                    return parseInt(b.averageRating) - parseInt(a.averageRating);
                }
                sorted.sort(mycomparator);
                setBrandsData([...sorted.slice(0, length)])
            }

        }
    }, [brands, category])


    return (

            <table className = 'topbrands__table'>
            {
                brandsData.length > 0 &&
                brandsData.map((item, index) => {
                    return(
                        <Link to={`brand/${item.slug}`} className="topbrands__list">
                            {
                                rank && (index === 0 || index === 1 || index === 2) ? 
                                (
                                <img alt="brand ranking" src = {index === 0 ? FirstPosition : index === 1 ? SecontPosition : ThirdPosition } className = 'topbrands__list__position'/>)
                                :
                                (null)
                            }   
                            <td className="topbrands__list__icon">
                                <img alt={`brand ${item.name} logo`} className="topbrands__list__icon__img" src = {item.logo}/>
                            </td>

                            <td className="topbrands__list__name">
                                    <p>{item.name}</p>
                            </td>
                            {
                                rank &&
                                <td className="topbrands__list__category">
                                    <p>{item.category ? item.category : 'no category' }</p>
                                </td>
                            }
                            <td className="topbrands__list__ratings">
                                <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                <p className="topbrands__list__ratings__text">{item.averageRating} Ratings</p>
                            </td>
                        </Link>  
                    )
                })
            }
            </table>
    )
}

export default TopBrands
