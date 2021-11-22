import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineBell} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import brandImg from '../../../assests/images/brandcar.png'
import userImg from '../../../assests/images/Profile Image.png'
import { useSelector } from 'react-redux'
import { axios } from '../../../axios/axiosInstance'
import WebsiteLogo from '../../../assests/WebsiteLogo'
import {io} from 'socket.io-client';

const ENDPOINT = 'https://sikayetbox.com'
// const ENDPOINT = "http://localhost:5000"
const NotificationBell = () => {
    const { client } = useSelector((state) => state.client);
    const [showNotificationContainer, setShowNotificationContainer] = useState(false)
    // const [newNotificationCount, setNewNotificationCount] = useState(0)
    const newNotificationCount = useRef(0)
    const socket = useRef(null)

    const notificationRef = useRef(null)
    useEffect(() => {
      if (showNotificationContainer) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener('keydown', handleEsc)
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener('keydown', handleEsc)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener('keydown', handleEsc)
      };
    }, [notificationRef, showNotificationContainer]);

    function handleClickOutside(event) {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setShowNotificationContainer(false);
        }
      }

    const handleEsc = (e) => {
    if(e.keyCode === 27){
        setShowNotificationContainer(false)
    }
    }


    useEffect(() => {
        socket.current = io(ENDPOINT)
        socket.current.on("update-notification", () =>{
            getNotifications()
        })
    }, [])

    
    const [notifications, setNotifications] = useState([])

    const getNotifications = () =>{
        const options = {sortBy: {createdAt: 1}, populate:"userId.User,brandId.Brand"}
            if(client.type.includes('user')){
                axios.post('/notification/',{filters: {userId: client.user.id, forUser: true}, options})
                .then(({data}) => {
                    console.log("notifications")
                    console.log(data)
                    setNotifications(data.results)
                })
            }
            else if(client.type.includes('brand')){
                axios.post('/notification/',{filters: {brandId: client.brand.id, forBrand: true},options})
                .then(({data}) => {
                    console.log("notifications")
                    console.log(data)
                    console.log(client.brand)
                    setNotifications(data.results)
                })
            }
            else if(client.type.includes("admin")){
                axios.post('/notification/',{filters: {forAdmin: true},options})
                .then(({data}) => {
                    console.log("notifications")
                    console.log(data)
                    setNotifications(data.results)
                })
            }
    }

    useEffect(() => {
        if(client){
            getNotifications()
        }

    }, [client])


    


    let [normalizedData, setNormalizedData] = useState({})
    useEffect(() => {
        if(notifications){
            let norm = {}
            console.log(notifications)
            newNotificationCount.current = 0
            notifications.map(item => {
                item.createdAt = new Date(item.createdAt).toDateString()
                if(norm[item.createdAt]){
                    norm[item.createdAt].unshift(item)
                }
                else{
                    norm[item.createdAt] = [item]
                }
        
                if(client.type.includes('user')){
                    if(!item.isSeenByUser){
                        newNotificationCount.current++
                    }
                }
                else if(client.type.includes('brand')){
                    if(!item.isSeenByBrand){
                        newNotificationCount.current++
                    }
                }
                else if(client.type.includes('admin')){
                    if(!item.isSeenByAdmin){
                        newNotificationCount.current++
                    }
                }
                
            })
            console.log(norm)
            setNormalizedData(norm)
        }
    }, [notifications])


    const hanleNotification = () => {
        const a = showNotificationContainer
        setShowNotificationContainer(!showNotificationContainer)
        let notificationIds = []
        if(!a && newNotificationCount.current > 0){
            setNotifications([...notifications.map(item =>{
                notificationIds = [...notificationIds, item.id]
                if(client.type.includes('user')){
                    item.isSeenByUser = true
                }
                else if(client.type.includes('brand')){
                    item.isSeenByBrand = true
                }
                else if(client.type.includes('admin')){
                    item.isSeenByAdmin = true
                }
                return item
            })])
        }
        // console.log(notificationIds)
        if(notificationIds.length > 0){
            axios.patch('/notification/',{notificationIds, type: client.type[0]})
            .then( (_) => {
                console.log("done")
            })
        }
    }


    return (
        <div className = 'header__notification-container'>
        {
            newNotificationCount.current > 0 &&
            <div className="header__notification__counter">
                {newNotificationCount.current}
            </div>
        }
            <AiOutlineBell size = {24} onClick = {hanleNotification}/>
            {
                showNotificationContainer && normalizedData !== {} &&

                <div ref = {notificationRef} className="header__notification" id = 'headerNotification'>
                    {
                        Object.keys(normalizedData).map(item => 
                            <div className = 'header__notification__item'>
                                <p className = 'header__notification__item__date'>
                                    {new Date(item).toDateString()}
                                </p>
                                {
                                    normalizedData[item].map(entry => 
                                        <NotificationItem notification = {entry}/>
                                    )
                                }
                                
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}


const NotificationItem = ({notification}) => {
    const ADMIN_NEW_REVIEW = "ADMIN-NEW-REVIEW"
    const BRAND_NEW_REVIEW = 'BRAND-NEW-REVIEW'
    const BRAND_REVIEW_RESOLVE = 'BRAND-REVIEW-RESOLVE'
    const USER_REVIEW_APPROVED = 'USER-REVIEW-APPROVED'
    const USER_REVIEW_REPLY_BY_BRAND = 'USER-REVIEW-REPLY-BY-BRAND'
    console.log(notification)
    if(notification.type === ADMIN_NEW_REVIEW){
        return(
            <Link to={`/admin`} className = 'header__notification__item__notification'>
                <img src = {notification.user.image} alt = {notification.user.name}/>
                <p>{notification.user.name} added a review on {notification.brand.name}</p>
            </Link>
        )
    }
    if(notification.type === BRAND_NEW_REVIEW){
        return (
            <Link to={`/brand/${notification.brandId.slug}?review=${notification.reviewId}`} className = 'header__notification__item__notification'>
                <img src = {notification.user.image} alt = 'user'/>
                <p>{notification.user.name} added a new review</p>
            </Link>
        )
    }

    if(notification.type === BRAND_REVIEW_RESOLVE){
        return (
            <Link to={`/brand/${notification.brandId.slug}?review=${notification.reviewId}`} className = 'header__notification__item__notification'>
                <img src = {notification.user.image}  alt = {notification.user.name}/>
                <p>{notification.user.name} resolved a review</p>
            </Link>
        )
    }
    if(notification.type === USER_REVIEW_REPLY_BY_BRAND){
        return(
            <Link to={`/brand/${notification.brandId.slug}?review=${notification.reviewId}`} className = 'header__notification__item__notification'>
                <img src = {notification.brand.image}  alt = {notification.brand.name}/>
                <p>{notification.brand.name} replied to your review</p>
            </Link>
        )
    }
    if(notification.type === USER_REVIEW_APPROVED){
        return(
            <Link to={`/brand/${notification.brandId.slug}?review=${notification.reviewId}`} className = 'header__notification__item__notification'>
                <WebsiteLogo className = 'header__notification__item__notification__logo'/>
                <p>Your review on {notification.brand.name} has been approved</p>
            </Link>
        )
    }
    return null
}
export default NotificationBell
