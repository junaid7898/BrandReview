import React from 'react'
import img1 from '../../../assests/images/img1.png'
import img2 from '../../../assests/images/Vector 3.png'

const BackgroundContent = () => {  
    return (
        <section className = 'banner'>
            <img src = {img1}  className = 'banner__img' alt = 'background'/>
            {/* <img src = {dots} className = 'banner__dots' alt = 'background'/> */}
            <svg width="218" height="50" viewBox="0 0 218 50" fill="none" xmlns="http://www.w3.org/2000/svg" className = 'banner__dots'>
                    <g opacity="0.3">                         
                    <circle r="4" transform="matrix(1 0 0 -1 4 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 4 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 4 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 4 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 116 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 116 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 116 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 116 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 18 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 18 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 18 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 18 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 130 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 130 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 130 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 130 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 32 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 32 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 32 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 32 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 144 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 144 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 144 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 144 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 46 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 46 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 46 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 46 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 158 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 158 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 158 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 158 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 60 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 60 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 60 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 60 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 172 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 172 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 172 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 172 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 74 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 74 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 74 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 74 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 186 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 186 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 186 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 186 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 88 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 88 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 88 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 88 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 200 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 200 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 200 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 200 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 102 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 102 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 102 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 102 4)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 214 46)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 214 18)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 214 32)" fill="#357BCE"/>
                    <circle r="4" transform="matrix(1 0 0 -1 214 4)" fill="#357BCE"/>
                    </g>
                </svg>

            <img src = {img2} className = 'banner__img' alt = 'background'/>
        </section>
    )
}

export default BackgroundContent
