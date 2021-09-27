import React from 'react'
import Contact from './components/contact/Contact'
import TopReview from './components/topreview/TopReview'

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage__topReview-container">
                <TopReview />
            </div>
            <div className="homepage__contact-container">
                <Contact />
            </div>
        </div>
    )
}

export default HomePage
