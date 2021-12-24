import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Star from '../../../assests/Star';
import {getAverageReviewRating} from "../../../helpers/getAverageReview"
import Search from './Search';

function Header() {

    const {brands} = useSelector(state => state.brands)
    const [brandIndexArray, setBrandIndexArray] = useState([])
    
    useEffect(() => {
        if(brands && brands.length > 0){
            let indexes = []
            for (let i=0; i<3; i++){
                indexes.push(Math.floor(Math.random() * brands.length))
            }
            setBrandIndexArray(indexes)
        }
        console.log(brandIndexArray)
    }, [brands])

    return (
        <div className="homepage__header-container">
            <div className="homepage__header">
                <div className="homepage__header__left">
                    <div className="homepage__header__left__sub">
                        <h1 className="homepage__header__infoHeading">
                        En Iyi Marka Ürününü Bizimle Seçin
                        </h1>
                        <p className="homepage__header__infoText">
                        Markalar, şirketler veya internet siteleri hakkında ki yorumlarınızı bizlerle paylaşarak siz de diğer kullanıcılara yardımda bulunabilir veya yazılmış olan yorumlarla kararınızı rahatlıkla verebilirsiniz.
                        </p>
                        <Link to="/review" className="homepage__header__link">
                            Yorum Yaz
                        </Link>
                    </div>
                </div>
                <div className="homepage__header__search">
                    <Search />
                </div>
                {
                    brandIndexArray.length > 0 &&
                    <div className="homepage__header__right">
                    <div className="homepage__header__brand">
                        <div className="homepage__header__brand__col1">
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[brandIndexArray[0]].slug}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[brandIndexArray[0]].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{brands[brandIndexArray[0]].averageRating.toFixed(1)} Puan {brands[brandIndexArray[0]].reviews.length} Yorumdan</p>
                                </div>
                            </div>
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[brandIndexArray[1]].slug}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[brandIndexArray[1]].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{brands[brandIndexArray[1]].averageRating.toFixed(1)} Puan {brands[brandIndexArray[1]].reviews.length} Yorumdan</p>
                                </div>
                            </div>
                        </div>
                        <div className="homepage__header__brand__col2">
                            <div className="homepage__header__brand__item">
                                <Link to = {`/brand/${brands[brandIndexArray[2]].slug}`} className="homepage__header__brand__item__logo-container">
                                    <img src={brands[brandIndexArray[2]].logo} className="homepage__header__brand__item__logo"/>
                                </Link>
                                <div className="homepage__header__brand__item__rating">
                                    <Star starGradient1="#FFDC64" starGradiet2="#FFC850" starLines="#FFF082" />
                                    <p>{brands[brandIndexArray[2]].averageRating.toFixed(1)} Puan {brands[brandIndexArray[2]].reviews.length} Yorumdan</p>
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
