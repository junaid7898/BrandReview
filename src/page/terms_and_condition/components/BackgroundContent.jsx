import React from 'react'
import img1 from '../../../assests/images/img1.png'
import dots from '../../../assests/images/Dots.png'
import img2 from '../../../assests/images/Vector 3.png'

const BackgroundContent = () => {
    return (
        <section className = 'banner'>
            <img src = {img1}  className = 'banner__img' alt = 'background'/>
            <img src = {dots} className = 'banner__dots' alt = 'background'/>
            <img src = {img2} className = 'banner__img' alt = 'background'/>
        </section>
    )
}

export default BackgroundContent
