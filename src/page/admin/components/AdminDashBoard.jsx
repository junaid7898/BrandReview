import React, {useEffect, useState} from 'react'
import { DashboardReviews } from '../../../components/dashboardReviews/DashboardReviews'
import DashBoardUsers from './DashBoardUsers'
import { useSelector } from 'react-redux'

import DashBoardBrands from './DashBoardBrands'
import {AiFillCaretDown} from 'react-icons/ai'

import Chart from '../../../components/charts/Chart'
import Select from "react-select";

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

    const [option1, setOption1] = useState(null)
    const [option2, setOption2] = useState(null)
    const [option3, setOption3] = useState(null)

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

    const settingOptions1 = [
        {value: 'y', label: 'Yes'},
        {value: 'n', label: 'No'},
    ]

    const settingOptions2 = [
        {value: 'y', label: 'Yes'},
        {value: 'n', label: 'No'},
    ]

    const settingOptions3 = [
        {value: 'y', label: 'Yes'},
        {value: 'n', label: 'No'},
    ]

    const handleAdminSettingsChange = () => {
        alert(`${option1.value}, ${option2.value}, ${option3.value}`)
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
                        <li onClick = {handleShowReviews} className = {showReviews ? 'dashboard__list__click': ''}>Report</li>
                        <li onClick = {handleShowUsers} className = {showUsers ? 'dashboard__list__click': ''}>Users</li>
                        <li onClick = {handleShowBrands} className = {showBrands ? 'dashboard__list__click': ''}>Brands</li>
                        <li onClick = {handleShowSettings} className = {showSettings ? 'dashboard__list__click': ''}>Settings</li>
                    </ul>

                </div>
            {
                showDashBoard ? 
                    <div className = 'dashboard__panel__chart'>
                       <Chart />
                    </div>
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
                        <div className="dashboard1__settings">
                            <div className="dashboard1__settings__option1">
                                <label htmlFor="reviewVerify">Allow Verify Review</label>
                                <Select
                                    id = 'reviewVerify'
                                    value = {option1}
                                    onChange = {setOption1}
                                    options = {settingOptions1}
                                    className = 'dashboard1__settings__option1__dropdown'
                                    placeholder = 'Do you want brand to verify reviews?'    
                                />
                            </div>

                            <div className="dashboard1__settings__option1">
                                <label htmlFor="reviewVerify">Email Verification settings</label>
                                <Select
                                    id = 'reviewVerify'
                                    value = {option2}
                                    onChange = {setOption2}
                                    options = {settingOptions2}
                                    className = 'dashboard1__settings__option1__dropdown'
                                    placeholder = 'Email verification must require to post review?'    
                                />
                            </div>

                            <div className="dashboard1__settings__option1">
                                <label htmlFor="reviewVerify">
                                    Phone Verification settings
                                </label>
                                <Select
                                    id = 'reviewVerify'
                                    value = {option3}
                                    options = {settingOptions3}
                                    onChange = {setOption3}
                                    className = 'dashboard1__settings__option1__dropdown'
                                    placeholder = 'Phone verification must require to post review?'    
                                />
                            </div>

                            <div className = 'dashboard1__settings__button' onClick = {handleAdminSettingsChange}>
                                <h3>Ok</h3>
                            </div>
                        </div>
                    </>
                    :
                    (null)
            }
            </div>
        </section>
    )
}

export default AdminDashBoard
