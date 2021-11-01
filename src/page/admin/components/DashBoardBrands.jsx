import React, { useEffect, useState } from 'react'
import {axios} from '../../../axios/axiosInstance'
import Pagination from '../../../components/Pagination/Pagination'
import FilterComponent from "../../../components/filter_component/FilterComponent"
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import ImageViewer from '../../../components/image_viewer/ImageViewer'
import { statusAction } from '../../../Redux/statusSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function DashBoardBrands({filters, sortOptions}) {

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [brandData, setBrandData] = useState(null)
    const [sort, setSort] = useState({})
    const [blackListing, setBlackListng] = useState([])
    const [showImage, setShowImage] = useState(null)
    const dispatch = useDispatch()
    const {client} = useSelector(state => state.client)
    const handlePageination = (index) =>{
        setPage(index)
    }
    useEffect(() => {
        setBrandData(null)
        const options = {
            page,
            limit: 10,
            sortBy: sortOptions
        }
        console.log(filters, options)
        axios.post('/brand/query', {filters, options})
        .then(({data}) => {
            setBrandData(data.results)
            setTotalPages(data.totalPages)
        })
    }, [page, filters, sortOptions])

    const handleBlackListing = (brandId) =>{
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {blackListed: true}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand blacklisted",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            setBlackListng([...blackListing.filter(item => item.id !== brandId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setBlackListng([...blackListing.filter(item => item.id !== brandId)])
        })
    }
    const handleRemoveBlackListing = (brandId) => {
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {blackListed: false}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand removed from blacklist",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            setBlackListng([...blackListing.filter(item => item.id !== brandId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setBlackListng([...blackListing.filter(item => item.id !== brandId)])
        })
    } 

    return (
        <div className="dashboard__brands">
            <div className="dashboard__brands__data">
            {
                brandData &&
                brandData.map(
                    brand => (
                        <div className="dashboard__brands__data__brand">

                            <div className="dashboard__brands__data__brand__intro">
                                <img src = {brand.logo} onClick = {() => {setShowImage(brand.logo)}}/>
                                <Link to = {`brand/${brand.id}`}>
                                    <h5 className = 'dashboard__brands__data__brand__intro__name'>{brand.name}</h5>
                                </Link>
                            </div>

                            <div className="dashboard__brands__data__brand__details">


                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Email</label>
                                    <p>{brand.email}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Reviews Count</label>
                                    <p>{brand.reviews.length > 0 ? brand.reviews.length: 'No Reviews Yet' }</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__address">
                                    <label>About</label>
                                    <p>{brand.about}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__phone">
                                    <label>Phone</label>
                                    <p>{brand.countryCode + " " + brand.phoneNumber}</p>
                                </div>

                                {
                                    !brand.blackListed ?
                                        <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                            <button onClick={() => handleBlackListing(brand.id)}>
                                                BlackList
                                                {
                                                    blackListing.includes(brand.id) &&
                                                    <LoadingIndicator />
                                                }
                                            </button>
                                        </div>
                                    :
                                        <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                            <button onClick={() => handleRemoveBlackListing(brand.id)}>
                                                Remove from Blacklist
                                                {
                                                    blackListing.includes(brand.id) &&
                                                    <LoadingIndicator />
                                                }
                                            </button>
                                        </div>
                                }

                            </div>
                            {showImage ? ( <ImageViewer image = {showImage} setImage = {setShowImage}/> ) : ( null ) }
                        </div>
                    )
                )
            }
            </div>
            <div className="dashboard__brands__pagination">
                <Pagination totalPages={totalPages} handlePageination={handlePageination} />
            </div>
        </div>
    )
}

export default DashBoardBrands
