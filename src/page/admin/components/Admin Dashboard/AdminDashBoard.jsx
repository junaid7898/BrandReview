import React, {useState} from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import DashBoardLink from './components/Dashboard Link/DashBoardLink'
const AdminDashBoard = () => {

    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const [showBrands, setShowBrands] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const handleShowDashBoard = () => {
        setShowDashBoard(true)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowReviews = () => {
        setShowDashBoard(false)
        setShowReviews(true)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowUsers = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(true)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowBrands = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(true)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowSettings = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(true)
        setShowReport(false)
    }

    const handleShowReport = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setShowReport(true)
    }

    return (
        <section >
            <div className = 'dashboard'>
                <ul>
                    <li onClick = {handleShowDashBoard} className = {showDashBoard ? 'dashboard__list__click': ''}>Dashboard</li>
                    <li onClick = {handleShowReviews} className = {showReviews ? 'dashboard__list__click': ''}>Reviews</li>
                    <li onClick = {handleShowUsers} className = {showUsers ? 'dashboard__list__click': ''}>Users</li>
                    <li onClick = {handleShowBrands} className = {showBrands ? 'dashboard__list__click': ''}>Brands</li>
                    <li onClick = {handleShowSettings} className = {showSettings ? 'dashboard__list__click': ''}>Settings</li>
                    <li onClick = {handleShowReport} className = {showReport ? 'dashboard__list__click': ''}>Report</li>
                </ul>
                <div className = 'dashboard__filter__input'>
                    <input type = 'text' placeholder = 'Filter and Sort'/>
                    <FaSortAmountDownAlt/>
                </div>
            </div>
            {
                showDashBoard ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            {
                showReviews ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            {
                showUsers ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            {
                showBrands ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            {
                showSettings ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            {
                showReport ? 
                    <>
                        <DashBoardLink/>
                    </>
                    :
                    (null)
            }
            

        </section>
    )
}

export default AdminDashBoard
