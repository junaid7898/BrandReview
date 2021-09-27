import React from 'react'
import Contact from './components/contact/Contact'

import TopReview from './components/topreview/TopReview'

import TopTenBrands from './components/top-ten-brands/TopTenBrands'
import Header from './components/Header/Header'


function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage__header-container">
                <Header />
            </div>
            <div className="homepage__topReview-container">
                <TopReview />
            </div>
            <div className="homepage__contact-container">
                <TopTenBrands/>   
                {/* <Contact /> */}
            </div>
        </div>
    )
}

export default HomePage
