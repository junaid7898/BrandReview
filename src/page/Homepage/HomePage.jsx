import React from 'react'
import Contact from './components/contact/Contact'
import TopTenBrands from './components/top-ten-brands/TopTenBrands'

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage__contact-container">
                <TopTenBrands/>   
                {/* <Contact /> */}
            </div>
        </div>
    )
}

export default HomePage
