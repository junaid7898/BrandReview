import React, { useEffect } from 'react'
import Contact from './components/Contact'

import TopReview from './components/topreview/TopReview'

import TopTenBrands from './components/TopTenBrands'
import Header from './components/Header'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import Compare from './components/Compare'
import Search from './components/Search'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import HorizantalDotBackground from '../login/components/HorizantalDotBackground'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
import { useLocation } from 'react-router'


function HomePage() {
  useEffect(() => {
        window.scrollTo(0,0)
  }, [useLocation().pathname])

    return (
        <div className="homepage">
            <div className="homepage__header-container">
                <Header />
            </div>
            <div className="homepage__searchbar-container">
                <Search />
            </div>
            <div className="homepage__topReview-container">
                <TopReview />
            </div>
            <div className="homepage__topbrands-container" style = {{position: 'relative'}}>
                <TopTenBrands/>  
                <div className = 'homepage__yello-zigzag2'>
                    <ZigZagBackgroundComponent/>
                </div> 
                <div className = 'homepage__horizantal-dot2'>
                    <HorizantalDotBackground/>
                </div>
            </div>
            <div className = 'homepage__compare-container' style = {{position: 'relative'}}>
                <div className="homepage__compare-container__inputs">
                    <BrandComparison/>
                </div>   
                <div className="homepage__compare-container__text">
                    <Compare/>
                </div>
                <div className = 'homepage__blue-spiral2'>
                    <svg width="154" height="81" viewBox="0 0 154 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M152 46.7168C122.221 70.3238 60.6765 103.374 52.7353 46.7168C42.8088 -24.1044 125.529 2.45354 101.265 46.7168C77 90.98 25.1618 31.2246 2 12.4128" stroke="#357BCE" stroke-width="5"/>
                    </svg>
                </div>
            </div>
            <div className="homepage__contact-container">
                <Contact/>
            </div>

            {/* ANCHOR Home page background...... */}
            
            <div className = 'homepage__blue-spiral'>
                <svg width="154" height="81" viewBox="0 0 154 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M152 46.7168C122.221 70.3238 60.6765 103.374 52.7353 46.7168C42.8088 -24.1044 125.529 2.45354 101.265 46.7168C77 90.98 25.1618 31.2246 2 12.4128" stroke="#357BCE" stroke-width="5"/>
                </svg>
            </div>
            <div className = 'homepage__yello-zigzag'>
                <ZigZagBackgroundComponent/>
            </div>
            <div className = 'homepage__blue-zigzag'>
                <BlueZigZagComponent/>
            </div>

            <div className = 'homepage__vertical-dot'>
                <VerticalDotBackGround/>
            </div>
            <div className = 'homepage__vertical-dot2'>
                <VerticalDotBackGround/>
            </div>
            <div className = 'homepage__horizantal-dot'>
                <HorizantalDotBackground/>
            </div>
            
        </div>
    )
}

export default HomePage
