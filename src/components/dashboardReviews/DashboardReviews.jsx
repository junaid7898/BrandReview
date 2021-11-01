import React, { useState, useEffect } from 'react'
import Review from '../reviews/Review'
import { axios } from "../../axios/axiosInstance"
import Pagination from "../Pagination/Pagination"
import FilterComponent from '../filter_component/FilterComponent'
import MultiDatePicker from '../multi_date_picker/MultiDatePicker'

import Star from '../../assests/Star'
import ImageThumbnail from '../image_thumbnail/ImageThumbnail'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { Link } from 'react-router-dom'
import ImagePreview from '../image_preview/ImagePreview'
import ImageViewer from '../image_viewer/ImageViewer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { statusAction } from '../../Redux/statusSlice'
export const DashboardReviews = ({filters, sortOptions, date}) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [reviewData, setReviewData] = useState(null)
    // const [filters, setFilters] = useState({})
    // const [sortOptions, setSortOptions] = useState()
    // const [date, setDate] = useState(null)
    const [isVerifing, setIsVerifing] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const {client} = useSelector(state => state.client)
    const dispatch = useDispatch()
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
                createdAt: JSON.stringify({
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

    const handleVerification = (reviewId) =>{
        setIsVerifing([...isVerifing, reviewId])

        axios.patch(`/review/${reviewId}`, {isVerified: true}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "Removed from verified list",
                type: "success"
            }))
            setReviewData([...reviewData.map(item => {
                if(item.id === reviewId){
                    return data
                }
                return item
            })])
            setIsVerifing([...isVerifing.filter(item => item.id !== reviewId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setIsVerifing([...isVerifing.filter(item => item.id !== reviewId)])
        })
    }

    const handleUnVerification = (reviewId) => {
        setIsVerifing([...isVerifing, reviewId])
        axios.patch(`/review/${reviewId}`, {isVerified: false}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "Removed from verified list",
                type: "success"
            }))
            setReviewData([...reviewData.map(item => {
                if(item.id === reviewId){
                    return data
                }
                return item
            })])
            setIsVerifing([...isVerifing.filter(item => item.id !== reviewId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setIsVerifing([...isVerifing.filter(item => item.id !== reviewId)])
        })
    }

    return (
        <div className = 'dashboard__review__component'>
            <div className = 'dashboard__panel__reports'>
                <table className="dashboard__panel__reports__table">
                    <tr>
                        <th>User Name</th>
                        <th>Ratings</th>
                        <th>Review</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                    {
                        reviewData && reviewData.map((item) => {
                            console.log('itemData: ', item)
                            return(
                                <>
                                <tr className = 'dashboard__panel__reports__table__data-rows' id = {item.id}>
                                    <td className = 'dashboard__panel__reports__table__data-rows__name'>
                                        <Link to ={`user/${item.user.id}`} >
                                            <h4 className = 'admin__dashboard__name-tag'>{item.user.name}</h4>
                                        </Link>
                                    </td>
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
                                    
                                    <td className = 'dashboard__panel__reports__table__comment'>{item.message}
                                    <div className = 'dashboard__panel__reports__images'>
                                    
                                
                                        {
                                            item.images.map(img => {
                                                return(
                                                    <div className="dashboard__panel__reports__images__item" onClick = {() => setPreviewImage(img)}>
                                                        <ImageThumbnail image = {img}/>
                                                    </div>
                                                )
                                            })
                                            
                                        }
                                        {
                                            previewImage? 
                                                <ImageViewer image = {previewImage} setImage = {setPreviewImage}/>
                                            :
                                                null
                                        }
                                </div></td>
                                    <td>{ new Date(item.createdAt).toDateString()}</td>
                                    <td className = "dashboard__panel__reports__button">
                                    {
                                            !item.isVerified ?
                                                <button onClick={() => handleVerification(item.id)}>
                                                    Verify
                                                    {
                                                        isVerifing.includes(item.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                            :
                                                <button onClick={() => handleUnVerification(item.id)}>
                                                    Unverify
                                                    {
                                                        isVerifing.includes(item.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                    }
                                    </td>
                                </tr>
                                    </>
                            )
                        }
                        )
                    }
                </table>
            </div>
            
    <Pagination totalPages={totalPages} handlePageination={handlePageination} />

        </div>
    )
}
