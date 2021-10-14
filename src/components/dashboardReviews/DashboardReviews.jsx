import React from 'react'
import Review from '../reviews/Review'

export const DashboardReviews = ({reviews}) => {
    return (
        <div className = 'dashboard__review__component'>
            <Review/>
        </div>
    )
}
