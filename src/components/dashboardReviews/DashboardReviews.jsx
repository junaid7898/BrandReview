import React, { useState, useEffect } from 'react'
import Review from '../reviews/Review'
import { axios } from "../../axios/axiosInstance"
import Pagination from "../Pagination/Pagination"
import FilterComponent from '../filter_component/FilterComponent'
export const DashboardReviews = () => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [reviewData, setReviewData] = useState(null)
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState()
    const handlePageination = (index) =>{
        setPage(index)
    }

    useEffect(() => {
        setReviewData(null)
        console.log(sortOptions)
        const options = {
            page,
            limit: 10,
            sortBy: sortOptions
        }
        console.log(options)
        axios.post('/review/query',{filters, options})
        .then(({data}) => {
            console.log(data)
            setReviewData(data.results)
            setTotalPages(data.totalPages)
        })
        
    }, [page,filters, sortOptions])


    return (
        <div className = 'dashboard__review__component'>
            <FilterComponent tab = "review" setFilters= {setFilters} setSortOptions = {setSortOptions}/>
            {
                reviewData &&
                reviewData.map(review =>
                    <div>
                        <p>
                            {
                                review.likedByUsers.length
                            }
                        </p>
                        {
                            // JSON.stringify(review)    
                        }
                    </div>
                )
            }

            <Pagination totalPages={totalPages} handlePageination={handlePageination} />

        </div>
    )
}
