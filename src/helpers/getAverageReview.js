export const getAverageReviewRating = (reviews) => {
    
    const totalReviews = reviews.length

    if(totalReviews === 0){
        return{totalReviews, averageReviewRating: 0}
    }

    let sum = 0

    reviews.map(reivew => {
        sum = sum + reivew.ratingCount 
    })

    let averageReviewRating = (sum / totalReviews).toFixed(1)
    if(averageReviewRating === NaN){
        averageReviewRating = 1
    }

    return{totalReviews, averageReviewRating}

}