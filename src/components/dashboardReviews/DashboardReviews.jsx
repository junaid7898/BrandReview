import React, { useState, useEffect } from 'react'
import Review from '../reviews/Review'
import { axios } from "../../axios/axiosInstance"
import Pagination from "../Pagination/Pagination"
import FilterComponent from '../filter_component/FilterComponent'
import Star from '../../assests/Star'
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
            sortBy: sortOptions,
            populate: 'user.User,brand.Brand'
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
            { reviewData && reviewData.map(item => console.log('review item::: ========>',item))}
            <FilterComponent tab = "review" setFilters= {setFilters} setSortOptions = {setSortOptions}/>
            
                    <div>
                    <div className = 'dashboard__panel__reports'>
                        
                        <table className="dashboard__panel__reports__table">
                            <tr>
                                <th>User Name</th>
                                <th>Ratings</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>
                            {
                                reviewData && reviewData.map((item) => {
                                    return(
                                        <tr className = 'dashboard__panel__reports__table__data-rows' id = {item.id}>
                                            <td className = 'dashboard__panel__reports__table__data-rows__name'>{item.user.name}</td>
                                            <td>
                                                <div className="dashboard__panel__reports__table__data-rows__ratings">
                                                    <h4>{item.ratingCount}</h4>
                                                    <span className ='dashboard__panel__reports__table__data-rows__ratings__stars'>
                                                        {
                                                            Array(Math.round(item.ratingCount < 1 ? 1 : item.ratingCount )).fill().map((_)=>(
                                                                <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                                                            ))
                                                        }
                                                    </span>
                                                </div>
                                            </td>
                                            <td className = 'dashboard__panel__reports__table__comment'>{item.message}</td>
                                            <td>{ new Date(item.createdOn).toDateString()}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                        {/* <p>
                            {
                                review.likedByUsers.length
                            }
                        </p>
                        {
                            // JSON.stringify(review)    
                        } */}
                    </div>
                
            

            <Pagination totalPages={totalPages} handlePageination={handlePageination} />

        </div>
    )
}
