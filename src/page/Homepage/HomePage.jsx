import React from 'react'
import Contact from './components/Contact'

import TopReview from './components/topreview/TopReview'

import TopTenBrands from './components/TopTenBrands'
import Header from './components/Header'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import Compare from './components/Compare'


function HomePage() {

    



    return (
        <div className="homepage">
            <div className="homepage__header-container">
                <Header />
            </div>
            <div className="homepage__topReview-container">
                <TopReview />
            </div>
            <div className="homepage__topbrands-container">
                <TopTenBrands/>   
            </div>
            <div className = 'homepage__compare-container'>
                <div className="homepage__compare-container__inputs">
                    <BrandComparison/>
                </div>   
                <div className="homepage__compare-container__text">
                    <Compare/></div>
                </div>
            <div className="homepage__contact-container">
                <Contact/>
            </div>

        </div>
    )
}

export default HomePage
