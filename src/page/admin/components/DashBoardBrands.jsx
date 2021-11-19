import React, { useEffect, useState } from 'react'
import {axios} from '../../../axios/axiosInstance'
import Pagination from '../../../components/Pagination/Pagination'
import FilterComponent from "../../../components/filter_component/FilterComponent"
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import ImageViewer from '../../../components/image_viewer/ImageViewer'
import { statusAction } from '../../../Redux/statusSlice'
import {brandAction} from "../../../Redux/brandInfoSlice/brandInfoSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {TiTick} from 'react-icons/ti'
// import PremierIcon from '../../../assests/icons/p'
function DashBoardBrands({filters, sortOptions}) {

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [brandData, setBrandData] = useState(null)
    const [sort, setSort] = useState({})
    const [blackListing, setBlackListng] = useState([])
    const [showImage, setShowImage] = useState(null)
    const dispatch = useDispatch()
    const {client} = useSelector(state => state.client)
    const {brands} = useSelector(state => state.brands)
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
            dispatch(brandAction.setBrands([...brands.filter(brand => brand.id !== brandId)]))
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
            dispatch(brandAction.setBrands([...brands, data]))
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



    //ANCHOR adding in demotion
    const handleDemotion = (brandId) =>{
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {isDemoted: true}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand demoted....",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            dispatch(brandAction.setBrands([...brands.map(brand =>{
                if(brand.id === brandId){
                    return data
                }
                return brand
            })]))
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



    //ANCHOR remove from demotion
    const handleRemoveDemotion = (brandId) => {
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {isDemoted: false}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand removed from demotion...",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            dispatch(brandAction.setBrands([...brands.map(brand =>{
                if(brand.id === brandId){
                    return data
                }
                return brand
            })]))
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


    // SECTION handle premeired
    const handlePremeired = (brandId) => {
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {premiered: true}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand added to premeired list....",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            dispatch(brandAction.setBrands([...brands.map(brand =>{
                if(brand.id === brandId){
                    return data
                }
                return brand
            })]))
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

    // SECTION remove Premeired
    const handleRemovePremeired = (brandId) => {
        setBlackListng([...blackListing, brandId])
        axios.patch(`/brand/${brandId}`, {premiered: false}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "brand removed from premeired list...",
                type: "success"
            }))
            setBrandData([...brandData.map(item => {
                if(item.id === brandId){
                    return data
                }
                return item
            })])
            dispatch(brandAction.setBrands([...brands.map(brand =>{
                if(brand.id === brandId){
                    return data
                }
                return brand
            })]))
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
                        <div className={brand.premiered ? ' dashboard__brands__data__brand dashboard__brands__data__brand__premeired': 'dashboard__brands__data__brand'}>

                            <div className="dashboard__brands__data__brand__intro">
                                <img src = {brand.logo} onClick = {() => {setShowImage(brand.logo)}}/>
                                <Link to = {`brand/${brand.slug}`}>
                                    <h5 className = 'dashboard__brands__data__brand__intro__name'>{brand.name} </h5>
                                </Link>
                                {
                                    brand.premiered ? 
                                        <div className = 'dashboard__brands__data__brand__intro__tick'>
                                            Premiered
                                        </div>
                                    : 
                                        null
                                }
                            </div>

                            <div className="dashboard__brands__data__brand__details">


                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Email</label>
                                    <p>{brand.email ? brand.email : 'No Email Address...'}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Reviews Count</label>
                                    <p>{brand.reviews.length > 0 ? brand.reviews.length: 'No Reviews Yet...' }</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__address">
                                    <label>About</label>
                                    <p>{brand.about ? brand.about : 'No About Info...'}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__phone">
                                    <label>Phone</label>
                                    <p>{brand.countryCode ? brand.countryCode + " " + brand.phoneNumber : 'No Phone Number...'}</p>
                                </div>
                                <div className = 'admin__panel__brands__button__container'>
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
                                    
                                    <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                        <Link to = {`/brand/panel/${brand.id}`}>
                                            <button className = 'dashboard__brands__data__brand__details__button__button2' >
                                                Visit Panel
                                            </button>
                                        </Link>
                                    </div>

                                    {
                                        !brand.isDemoted ?
                                            <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                                <button onClick={() => handleDemotion(brand.id)}>
                                                    Demote
                                                    {
                                                        blackListing.includes(brand.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                                
                                            </div>
                                        :
                                            <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                                <button onClick={() => handleRemoveDemotion(brand.id)}>
                                                    Remove from Demotion
                                                    {
                                                        blackListing.includes(brand.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                            </div>
                                    }

                                    {
                                        !brand.premiered ?
                                            <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                                <button onClick={() => handlePremeired(brand.id)}>
                                                    Premier
                                                    {
                                                        blackListing.includes(brand.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                                
                                            </div>
                                        :
                                            <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                                <button onClick={() => handleRemovePremeired(brand.id)}>
                                                    Remove from Premiered
                                                    {
                                                        blackListing.includes(brand.id) &&
                                                        <LoadingIndicator />
                                                    }
                                                </button>
                                            </div>
                                    }

                                </div>

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
