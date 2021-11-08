import React from 'react'
import AdminDashBoard from './components/AdminDashBoard'
import AdminPanel from './components/AdminPanel'
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'
import BlueZigZagBackgroundComponent from '../login/components/BlueZigZagComponent'
import HorizantalDotBackGround from '../login/components/HorizantalDotBackground'
const Admin = () => {
    return (
        <section className = 'admin'>
            <div className="admin__panel">
                <AdminPanel/>
            </div>
            <div className="admin__dashboard">
                <AdminDashBoard/>
            </div>
            <div className="admin__background__horizantal-dots">
                <VerticalDotBackGround/>
            </div>
            <div className="admin__background__horizantal-dots2">
                <VerticalDotBackGround/>
            </div>
            <div className="admin__blue-spiral">
                <BlueSpiralBackground/>
            </div>
            <div className = 'admin__yello-zigzag'>
                <ZigZagBackgroundComponent/>
            </div>
            <div className = 'admin__dots'>
                <HorizantalDotBackGround/>
            </div>
            <div className = 'admin__dots2'>
                <HorizantalDotBackGround/>
            </div>
            <div className = 'admin__blue-zigzag'>
                <BlueZigZagBackgroundComponent/>
            </div>
        </section>
    )
}

export default Admin
