import React from 'react'
import './writeReviewContent.css'
import ReviewImg from '../../assests/images/review_img.png'
const WriteReviewContent = () => {
    return (
        <section className = 'review'>

            <img className = 'review__img' src = {ReviewImg}/>

            <div className = 'review__content'>

                <div className = 'review__content__tboxes'>
                    <input type = 'text' placeholder = 'Select the Brand' className = 'review__content__textbox'/>
                    <input type = 'text' placeholder = 'Subject' className = 'review__content__textbox'/>
                    <textarea  placeholder = 'Write Your Review' className = 'review__content__textarea' rows = {10} />
                </div>

                <div className = 'review__content__buttons'>
                    <h3 className = 'review__content__uploadButton'>Upload Media</h3>
                    <h3 className = 'review__content__publishButton'>Publish</h3>
                </div>

            </div>
        </section>
    )
}

export default WriteReviewContent
