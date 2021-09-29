import React, {useState}from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'

const BrandDetail = () => {
    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const handleShowDashBoard = () => {
        setShowDashBoard(true)
        setShowReviews(false)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowReviews = () => {
        setShowDashBoard(false)
        setShowReviews(true)
        setShowSettings(false)
        setShowReport(false)
    }

    const handleShowSettings = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowSettings(true)
        setShowReport(false)
    }

    const handleShowReport = () => {
        setShowDashBoard(false)
        setShowReviews(false)
        setShowSettings(false)
        setShowReport(true)
    }

    return (
        
            <div className = 'dashboard__list'>
                <ul>
                    <li onClick = {handleShowDashBoard} className = {showDashBoard ? 'list__click': ''}>Dashboard</li>
                    <li onClick = {handleShowReviews} className = {showReviews ? 'list__click': ''}>Reviews</li>
                    <li onClick = {handleShowSettings} className = {showSettings ? 'list__click': ''}>Settings</li>
                    <li onClick = {handleShowReport} className = {showReport ? 'list__click': ''}>Reports</li>
                </ul>
                <div className="dashboard__list__filter">
                    <input type = 'text' placeholder = 'Filter and Sort'/>
                    <FaSortAmountDownAlt className = 'dashboard__list__filter__icon'/>
                </div>
                
            </div>
    )
}

export default BrandDetail
