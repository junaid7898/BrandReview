import React, {useEffect, useState} from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import FilterComponent from '../../../components/filter_component/FilterComponent'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import { DashboardReviews } from '../../../components/dashboardReviews/DashboardReviews'
import DashBoardUsers from './DashBoardUsers'
import Star from '../../../assests/Star'
import { useSelector } from 'react-redux'

const AdminDashBoard = () => {

    const {brands: topBrands} = useSelector(state => state.brands)
    console.log('brands: ', topBrands);

    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)   
    const [showUsers, setShowUsers] = useState(false)
    const [showBrands, setShowBrands] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const [dashboardPhone, setDashBoardPhone] = useState('Dashboard')
    const [showDashboardPhone, setShowDashboardPhone] = useState(null)

    const allReviews = [{name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'nadeem khan', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf asddd aaaaaaaa ddddd ffffff ddddddd dddddd ddddddd ddddddd  dddddd ddddd', date: '1/25/2021'},
    {name: 'alam husain subsvardi shehnvari', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid abbasi', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},
    {name: 'junaid', ratings: 1.5, comment: 'hello hello hello ehlloo hello hello hello hello ehlloodadf adfadf adfadf adfadf adfadfdf adfadfadf', date: '1/25/2021'},    
]

   const handleHideDashboardPhone = () => {
       setShowDashboardPhone(false)
   }

    const handleShowDashBoard = () => {
        setDashBoardPhone('Dashboard')
        setShowDashBoard(true)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowReviews = () => {
        setDashBoardPhone('Reviews')
        setShowDashBoard(false)
        setShowReviews(true)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowUsers = () => {
        setDashBoardPhone('Users')
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(true)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowBrands = () => {
        setDashBoardPhone('Brands')
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(true)
        setShowSettings(false)
        setShowReport(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowSettings = () => {
        setDashBoardPhone('Settings')
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(true)
        setShowReport(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowReport = () => {
        setDashBoardPhone('Report')
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(true)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleShowDashboard = () => {
        if(showDashboardPhone === false || showDashboardPhone === null){
            setShowDashboardPhone(true)
        }
        else{
            setShowDashboardPhone(false)
        }
    }

    useEffect(() => {
        //TODO get all reviews from api
    }, [])


    return (
        <section >
            <div className = 'dashboard'>
                <div className="dashboard__links">
                    <div className="dashboard__links__header"  onClick = {() => handleShowDashboard()}>
                        <h1>{dashboardPhone}</h1>
                        <AiFillCaretDown size = {24}/>
                    </div>
                    <ul className = {`dashboard__links__list ${showDashboardPhone === true ? `dashboard__links__show`:`dashboard__links__hide`}` }>
                        <li onClick = {handleShowDashBoard} className = {showDashBoard ? 'dashboard__list__click': ''}>Dashboard</li>
                        <li onClick = {handleShowReviews} className = {showReviews ? 'dashboard__list__click': ''}>Reviews</li>
                        <li onClick = {handleShowUsers} className = {showUsers ? 'dashboard__list__click': ''}>Users</li>
                        <li onClick = {handleShowBrands} className = {showBrands ? 'dashboard__list__click': ''}>Brands</li>
                        <li onClick = {handleShowSettings} className = {showSettings ? 'dashboard__list__click': ''}>Settings</li>
                        <li onClick = {handleShowReport} className = {showReport ? 'dashboard__list__click': ''}>Report</li>
                    </ul>

                </div>
                
                <div className = 'dashboard__filter__input'>

                    <div className="dashboard__filter__input__filter">
                        <FilterComponent/>
                    </div>

                    <div className="dashboard__filter__input__picker">
                        {/* <MultiDatePicker/> */}
                    </div>
                    
                </div>
            </div>
            {
                showDashBoard ? 
                    <>
                        {/* <DashBoardLink/> */}
                        {/* TODO give a prop like reviews = {data from api} to display */}
                        <h1>admin charts</h1>
                    </>
                    :
                    (null)
            }
            {
                showReviews ? 
                    <>
                        {/* <DashBoardLink/> */}    
                        <DashboardReviews/>
                    </>
                    :
                    (null)
            }
            {
                showUsers ? 
                    <>
                        {/* <DashBoardLink/> */}
                        {/* TODO send as a prop users = {data from api} first delete dummy data from below component */}
                        <div className="dashboard__panel__user">
                            <DashBoardUsers/>
                        </div>
                        
                    </>
                    :
                    (null)
            }
            {
                showBrands ? 
                    <>
                        <table className = 'admin__dashboard__brands'>
                            {
                                topBrands.map(brand => {
                                    return(
                                        <tr>
                                            <td>
                                                <div className="admin__dashboard__brands__title">
                                                    <img src = {brand.logo} className = 'admin__dashboard__brands__title__image'/>
                                                    <h3>{brand.name}</h3>
                                                </div>
                                            </td>
                                            <td>
                                                <h3>{brand.category}</h3>
                                            </td>
                                            <td>
                                                <div className="dashboard__panel__reports__table__data-rows__ratings">
                                                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M26.526 8.6112L18.6896 7.8844L15.5768 0.65609C15.3588 0.149956 14.6412 0.149956 14.4233 0.65609L11.3104 7.88435L3.47403 8.6112C2.9253 8.66206 2.70358 9.34456 3.11755 9.70825L9.03014 14.9024L7.2998 22.5799C7.17863 23.1175 7.75924 23.5392 8.23303 23.2579L15 19.2398L21.767 23.2579C22.2409 23.5393 22.8214 23.1175 22.7003 22.5799L20.9699 14.9024L26.8825 9.70825C27.2965 9.34456 27.0747 8.66206 26.526 8.6112Z" fill="#FFDC64"/>
                                                        <path d="M6.98892 0.407324C7.38841 0.962207 8.51599 3.34522 9.16064 4.73401C9.26201 4.95233 8.98808 5.14956 8.81318 4.98415C7.70066 3.93227 5.79841 2.10696 5.39892 1.55201C5.0828 1.11297 5.18247 0.500781 5.62157 0.184667C6.06062 -0.131447 6.67281 -0.0317202 6.98892 0.407324Z" fill="#FFF082"/>
                                                        <path d="M23.0111 0.407324C22.6116 0.962207 21.484 3.34522 20.8393 4.73401C20.738 4.95233 21.0119 5.14956 21.1868 4.98415C22.2993 3.93227 24.2015 2.1069 24.6011 1.55201C24.9172 1.11297 24.8175 0.500781 24.3784 0.184667C23.9394 -0.131447 23.3272 -0.0317202 23.0111 0.407324Z" fill="#FFF082"/>
                                                        <path d="M29.3239 16.6792C28.6739 16.4673 26.0609 16.117 24.5419 15.9249C24.3032 15.8946 24.1985 16.2155 24.4092 16.3319C25.7494 17.0722 28.0664 18.3299 28.7164 18.5419C29.2307 18.7096 29.7837 18.4287 29.9514 17.9143C30.1192 17.3999 29.8382 16.847 29.3239 16.6792Z" fill="#FFF082"/>
                                                        <path d="M0.676088 16.6792C1.32613 16.4673 3.93912 16.117 5.45805 15.9249C5.69682 15.8946 5.80147 16.2155 5.59082 16.3319C4.25061 17.0722 1.93363 18.3299 1.28359 18.5419C0.769252 18.7096 0.216302 18.4287 0.0485477 17.9143C-0.119206 17.3999 0.161751 16.847 0.676088 16.6792Z" fill="#FFF082"/>
                                                        <path d="M14.0504 27.7347C14.0504 27.051 14.5277 24.4582 14.8159 22.9545C14.8612 22.7181 15.1988 22.7181 15.2441 22.9545C15.5324 24.4582 16.0096 27.051 16.0096 27.7347C16.0096 28.2757 15.571 28.7143 15.03 28.7143C14.489 28.7143 14.0504 28.2757 14.0504 27.7347Z" fill="#FFF082"/>
                                                        <path d="M16.7087 3.28461L15.5767 0.65609C15.3587 0.149956 14.6411 0.149956 14.4232 0.65609L11.3104 7.88435L3.47403 8.6112C2.9253 8.66206 2.70358 9.34456 3.11755 9.70825L9.03014 14.9024L7.2998 22.5799C7.17863 23.1175 7.75924 23.5392 8.23303 23.2579L9.13367 22.7231C10.6102 13.1653 14.7611 6.14915 16.7087 3.28461Z" fill="#FFC850"/>
                                                    </svg>
                                                    <h4>{brand.ratings} ratings</h4>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                                
                        
                    </>
                    :
                    (null)
            }
            {
                showSettings ? 
                    <>
                        {/* <DashBoardLink/> */}
                        <h1>hello 5</h1>
                    </>
                    :
                    (null)
            }
            {
                showReport ? 
                    <div className = 'dashboard__panel__reports'>
                        {/* <DashBoardLink/> */}
                        <table className="dashboard__panel__reports__table">
                            <tr>
                                <th>User Name</th>
                                <th>Ratings</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>
                            {
                                allReviews.map((item, index) => {
                                    return(
                                        <tr className = 'dashboard__panel__reports__table__data-rows'>
                                            <td className = 'dashboard__panel__reports__table__data-rows__name'>{item.name}</td>
                                            <td>
                                                <div className="dashboard__panel__reports__table__data-rows__ratings">
                                                    <h4>{item.ratings}</h4>
                                                    <span className ='dashboard__panel__reports__table__data-rows__ratings__stars'>
                                                        {
                                                            Array(Math.round(item.ratingCount < 1 ? 1 : item.ratings )).fill().map((_)=>(
                                                                <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082"/>
                                                            ))
                                                        }
                                                    </span>
                                                </div>
                                            </td>
                                            <td className = 'dashboard__panel__reports__table__comment'>{item.comment}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    :
                    (null)
            }
            

        </section>
    )
}

export default AdminDashBoard
