import React, {useEffect, useState} from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import FilterComponent from '../../../components/filter_component/FilterComponent'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import { DashboardReviews } from '../../../components/dashboardReviews/DashboardReviews'
import DashBoardUsers from './DashBoardUsers'
import Star from '../../../assests/Star'
import { useSelector } from 'react-redux'

import DashBoardBrands from './DashBoardBrands'

import Chart from '../../../components/charts/Chart'

const AdminDashBoard = () => {

    const {brands: topBrands} = useSelector(state => state.brands)
    // console.log('brands: ', topBrands);

    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)   
    const [showUsers, setShowUsers] = useState(false)
    const [showBrands, setShowBrands] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [date, setDate] = useState(null)
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
                        {/* <FilterComponent/> */}
                    </div>

                    <div className="dashboard__filter__input__picker">
                        {/* <MultiDatePicker date = {date} setDate = {setDate}/> */}
                    </div>
                    
                </div>
            </div>
            {
                showDashBoard ? 
                    <>
                       <Chart />
                    </>
                    :
                    (null)
            }
            {
                showReviews && 
                    <div className="dashboard__panel__review">
                        <DashboardReviews/>
                    </div>
            }
            {
                showUsers && 
                    <div className="dashboard__panel__user">
                        <DashBoardUsers/>
                    </div>
                        
            }
            {
                showBrands && 
                    <div className="dashboard__panel__user">
                        <DashBoardBrands />
                    </div>
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
