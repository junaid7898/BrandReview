import React, { useEffect } from 'react'
import "./topreview.scss"
import Review from './component/Review/Review'
import Ticker from 'react-ticker'
function TopReview() {
    const rating = 2.5
    const text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt error at eos temporibus enim tempora reiciendis animi laboriosam. Maiores ad in ullam, laudantium non magnam minus eum repellendus doloremque aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id repellendus atque necessitatibus sit ut eligendi culpa similique provident, numquam non accusamus quam debitis perferendis fugiat maiores amet enim porro corrupti? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, porro magni debitis ex tempora hic quam? Velit, adipisci pariatur laudantium libero ducimus consequuntur asperiores commodi facere enim distinctio fuga voluptates."
    const loop = 1

    const handleEnter = () =>{
        console.log("enterereds")
    }


    useEffect(() => {
        console.log(document.getElementsByClassName('topReview__item'))
        //.addEventListener('onmouseenter', handleEnter)
        return () => {
            // document.getElementsByClassName('topReview__item')[0].removeEventListener(handleEnter)
        }
    }, [])


    return (
        <div className="topReview">
            <Ticker speed={5}>
                {
                    () => (
                        <div className="topReview__review-container topReview__review-container-upper">
                            <Review rating = { rating } text = { text } />
                            <Review rating = { rating } text = { text } />
                        </div>

                    )
                }
            </Ticker>
            <Ticker speed={5}>
                {
                    () => (
                        <div className="topReview__review-container topReview__review-container-lower">
                            <Review rating = { rating } text = { text } />
                            <Review rating = { rating } text = { text } />
                        </div>

                    )
                }
            </Ticker>
                
        </div>
    )
}

export default TopReview
