import React from 'react'
import './dashboardLink.css'
import DashBoardChart from './DashBoardChart'
const DashBoardLink = () => {
    return (
        <section className = 'dashboard__link'>
            <DashBoardChart/>
            <DashBoardChart/>
        </section>
    )
}

export default DashBoardLink
