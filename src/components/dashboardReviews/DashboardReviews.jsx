import React, { useState, useEffect } from 'react'
import Review from '../reviews/Review'
import { axios } from "../../axios/axiosInstance"
import Pagination from "../Pagination/Pagination"
import FilterComponent from '../filter_component/FilterComponent'
import MultiDatePicker from '../multi_date_picker/MultiDatePicker'
export const DashboardReviews = () => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [reviewData, setReviewData] = useState(null)
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState()
    const [date, setDate] = useState(null)
    const handlePageination = (index) =>{
        setPage(index)
    }

    useEffect(() => {
        setReviewData(null)
        console.log(sortOptions)
        const options = {
            page,
            limit: 10,
            sortBy: sortOptions,
            populate:"user.User,brand.Brand"
        }
        console.log(filters)
        let newFilter = filters

        if(date){
            newFilter = {
                ...newFilter,
                createdOn: JSON.stringify({
                    $gt: new Date(date[0]),
                    $lt: new Date(date[1])
                })
            }
        }
        console.log(newFilter)
        axios.post('/review/query',{filters: newFilter, options})
        .then(({data}) => {
            console.log(data)
            setReviewData(data.results)
            setTotalPages(data.totalPages)
        })

        
    }, [page,filters, sortOptions, date])


    return (
        <div className = 'dashboard__review__component'>
            <FilterComponent tab = "review" setFilters= {setFilters} setSortOptions = {setSortOptions}/>
            <MultiDatePicker date = {date}  setDate={setDate} />
            {
                reviewData &&
                reviewData.map(review =>
                    <div>
                        <p>
                            {
                                new Date(review.createdOn).toLocaleString()
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
