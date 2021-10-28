import React from 'react'
import AdminDashBoard from './components/AdminDashBoard'
import AdminPanel from './components/AdminPanel'
const Admin = () => {
    return (
        <section className = 'admin'>
            <div className="admin__panel">
                <AdminPanel/>
            </div>
            <div className="admin__dashboard">
                <AdminDashBoard/>
            </div>
        </section>
    )
}

export default Admin
