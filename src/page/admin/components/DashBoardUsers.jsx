import React, {useEffect, useState} from 'react'
import ProfileImg from '../../../assests/images/Profile Image.png'
import ImageViewer from '../../../components/image_viewer/ImageViewer'
import Pagination from '../../../components/Pagination/Pagination'
import {axios} from '../../../axios/axiosInstance'
import FilterComponent from '../../../components/filter_component/FilterComponent'
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {statusAction} from "../../../Redux/statusSlice"
import { Link } from 'react-router-dom'
const DashBoardUsers = ({filters, sortOptions}) => {
    const [showImage, setShowImage] = useState(null)
    const {client} = useSelector(state => state.client)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [userData, setUserData] = useState(null)
    const [blackListing, setBlackListng] = useState([])
    const handlePageination = (index) =>{
        setPage(index)
    }

    useEffect(() => {
        const options = {
            page,
            limit: 10,
            sortBy: sortOptions
        }
        let newFilters = {
            ...filters,
            role:JSON.stringify({
                $not: {$in: ["admin"]}
            })
        }
        console.log(newFilters)
        setUserData(null)
        axios.post(`/user/query`,{filters: newFilters, options})
        .then(({data}) => {
            console.log(data)
            setUserData(data.results)
            setTotalPages(data.totalPages)
        })
        console.log(newFilters, options)
        
    }, [page, filters, sortOptions])

    const handleBlackListing = (userId) =>{
        setBlackListng([...blackListing, userId])
        axios.patch(`/user/${userId}`, {blackListed: true}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "user blacklisted",
                type: "success"
            }))
            setUserData([...userData.map(item => {
                if(item.id === userId){
                    return data
                }
                return item
            })])
            setBlackListng([...blackListing.filter(item => item.id !== userId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setBlackListng([...blackListing.filter(item => item.id !== userId)])
        })
    }
    const handleRemoveBlackListing = (userId) => {
        setBlackListng([...blackListing, userId])
        axios.patch(`/user/${userId}`, {blackListed: false}, {
            headers:{
                "role" : client.role,
                "authorization" : `bearer ${client.tokens.access.token}`
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(statusAction.setNotification({
                message: "user removed from blacklist",
                type: "success"
            }))
            setUserData([...userData.map(item => {
                if(item.id === userId){
                    return data
                }
                return item
            })])
            setBlackListng([...blackListing.filter(item => item.id !== userId)])
        }).catch(err => {
            console.log(err)
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
            }))
            setBlackListng([...blackListing.filter(item => item.id !== userId)])
        })
    } 

    return (
        <div className="dashboard__users">
            <div className="dashboard__users__data">
            {
                userData &&
                userData.map(
                    user => (
                        <div className="dashboard__users__data__user">

                            <div className="dashboard__users__data__user__intro">
                                <img src = {user.profileImage} onClick = {() => {setShowImage(user.profileImage)}}/>
                                <Link to = {`user/${user.id}`}>
                                    <h5 className = 'dashboard__users__data__user__intro__name'>{user.name}</h5>
                                </Link>
                            </div>

                            <div className="dashboard__users__data__user__details">


                                <div className="dashboard__users__data__user__item dashboard__users__data__user__details__email">
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>

                                <div className="dashboard__users__data__user__item dashboard__users__data__user__details__address">
                                    <label>Address</label>
                                    <p>{user.address ? user.address: 'No Address' }</p>
                                </div>

                                <div className="dashboard__users__data__user__item dashboard__users__data__user__details__phone">
                                    <label>Phone</label>
                                    <p>{user.countryCode ? user.countryCode + " " + user.phoneNumber : 'No Phone Number'}</p>
                                </div>

                                {
                                    !user.blackListed ?
                                        <div className="dashboard__users__data__user__item dashboard__users__data__user__details__button">
                                            <button disabled={!!blackListing.find(item => item.id === user.id)} onClick={() => handleBlackListing(user.id)}>
                                                BlackList
                                                {
                                                    blackListing.includes(user.id) &&
                                                    <LoadingIndicator />
                                                }
                                            </button>
                                        </div>
                                    :
                                        <div className="dashboard__users__data__user__item dashboard__users__data__user__details__button">
                                            <button disabled={!!blackListing.find(item => item.id === user.id)} onClick={() => handleRemoveBlackListing(user.id)}>
                                                Remove from Blacklist
                                                {
                                                    blackListing.includes(user.id) &&
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
            <div className="dashboard__users__pagination">
                <Pagination totalPages={totalPages} handlePageination={handlePageination} />
            </div>
        </div>
    )
}

export default DashBoardUsers
