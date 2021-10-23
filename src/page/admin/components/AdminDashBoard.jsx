import React, {useState} from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import FilterComponent from '../../../components/filter_component/FilterComponent'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import { DashboardReviews } from '../../../components/dashboardReviews/DashboardReviews'
import DashBoardUsers from './DashBoardUsers'

const AdminDashBoard = () => {

    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)   
    const [showUsers, setShowUsers] = useState(false)
    const [showBrands, setShowBrands] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const [dashboardPhone, setDashBoardPhone] = useState('Dashboard')
    const [showDashboardPhone, setShowDashboardPhone] = useState(null)

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
                        {/* <DashBoardLink/> */}
                        <h1>hello 4</h1>
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
                    <>
                        {/* <DashBoardLink/> */}
                        <h1>hello 6</h1>
                    </>
                    :
                    (null)
            }
            

        </section>
    )
}

export default AdminDashBoard
