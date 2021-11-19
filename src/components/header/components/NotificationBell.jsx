import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineBell} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import brandImg from '../../../assests/images/brandcar.png'
import userImg from '../../../assests/images/Profile Image.png'
import { useSelector } from 'react-redux'
const NotificationBell = () => {
    // const [newNotificationCount, setNewNotificationCount] = useState(0)
    const newNotificationCount = useRef(0)
    //ANCHOR user notificatios
    const [notifications, setNotification] = useState([
        {
            brand: {
                name: 'beats',
                image: brandImg,
            },
            review: '1',
            date: new Date(244566674667),
            brandId: '11',
            userId: '111',
            user:{
                name: 'test user',
                image: userImg
            },
            isSeenByUser: false,
            isSeenByBrand: false,
            isSeenByAdmin: false,
            type: 'ADMIN-NEW-REVIEW',
            forAdmin: true
        },
        {
            brand: {
                name: 'bmw',
                image: brandImg,
            },
            review: '2',
            date: new Date(244566674667),
            brandId: '22',
            userId: '222',
            user:{
                name: 'junaid abbasi',
                image: userImg
            },            
            isSeenByUser: false,
            isSeenByBrand: false,
            isSeenByAdmin: false,
            type: 'BRAND-NEW-REVIEW',
            forAdmin: false

        },
        {
            brand: {

                name: 'kia',
                image: brandImg,
            },
            review: '3',
            date: new Date(),
            brandId: '33',
            userId: '333',
            user:{

                name: 'fahad nadeem',
                image: userImg
            },
            isSeenByUser: false,
            isSeenByBrand: false,
            isSeenByAdmin: false,
            type:'BRAND-REVIEW-RESOLVE',
            forAdmin: false
        },
        {
            brand: {
                name: 'test brand 2',
                image: brandImg,
            },
            review: '4',
            date: new Date(),
            brandId: '44',
            userId: '444',
            user:{
                name: 'test user 2',
                image: userImg
            },
            isSeenByUser: false,
            isSeenByBrand: false,
            isSeenByAdmin: false,
            type:'USER-REVIEW-REPLY-BY-BRAND',
            forAdmin: false
        }
    ])

    const [showNotificationContainer, setShowNotificationContainer] = useState(false)
    const { client } = useSelector((state) => state.client);


    let [normalizedData, setNormalizedData] = useState({})
    useEffect(() => {
        if(notifications){
            let norm = {}
            newNotificationCount.current = 0
            notifications.map(item => {
                if(norm[item.date]){
                    norm[item.date].unshift(item)
                }
                else{
                    norm[item.date] = [item]
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
            setNormalizedData(norm)
        }
    }, [notifications])


    const hanleNotification = () => {
        const a = showNotificationContainer
        setShowNotificationContainer(!showNotificationContainer)

        if(!a && newNotificationCount.current > 0){
            setNotification([...notifications.map(item =>{
                if(client.type.includes('user')){
                    item.isSeenByUser = true
                }
                else if(client.type.includes('brand')){
                    item.isSeenByBrand = true
                }
                else if(client.type.includes('admin')){
                    item.isSeenByAdmin = true
                }
                // item.isSeenByUser = true
                return item
            })])
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

                <div className="header__notification" id = 'headerNotification'>
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
    const USER_REVIEW_REPLY_BY_BRAND = 'USER-REVIEW-REPLY-BY-BRAND'
    if(notification.type === ADMIN_NEW_REVIEW){
        return(
            <Link className = 'header__notification__item__notification'>
                <img src = {notification.user.image} alt = {notification.user.name}/>
                <p>{notification.user.name} added a review on {notification.brand.name}</p>
            </Link>
        )
    }
    if(notification.type === BRAND_NEW_REVIEW){
        return (
            <Link className = 'header__notification__item__notification'>
                <img src = {notification.user.image} alt = 'user'/>
                <p>{notification.brand.name} replied a review from {notification.user.name}</p>
            </Link>
        )
    }

    if(notification.type === BRAND_REVIEW_RESOLVE){
        return (
            <Link className = 'header__notification__item__notification'>
                <img src = {notification.user.image}  alt = {notification.user.name}/>
                <p>{notification.user.name} reviewd {notification.brand.name}</p>
            </Link>
        )
    }
    if(notification.type === USER_REVIEW_REPLY_BY_BRAND){
        return(
            <Link className = 'header__notification__item__notification'>
                <img src = {notification.brand.image}  alt = {notification.brand.name}/>
                <p>{notification.brand.name} replied a review from {notification.user.name}</p>
            </Link>
        )
    }
    return null
}
export default NotificationBell
