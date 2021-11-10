import React, {useEffect, useState} from 'react'
import { DashboardReviews } from '../../../components/dashboardReviews/DashboardReviews'
import DashBoardUsers from './DashBoardUsers'
import { useSelector } from 'react-redux'

import DashBoardBrands from './DashBoardBrands'
import {AiFillCaretDown} from 'react-icons/ai'

import Chart from '../../../components/charts/Chart'
import Select from "react-select";
import { axios } from '../../../axios/axiosInstance'
import FilterComponent from '../../../components/filter_component/FilterComponent'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker'
import DashboardAddBrand from './DashboardAddBrand'

const AdminDashBoard = () => {

    const {brands: topBrands} = useSelector(state => state.brands)
    // console.log('brands: ', topBrands);

    const [showDashBoard , setShowDashBoard] = useState(true)
    const [showReviews , setShowReviews] = useState(false)   
    const [showUsers, setShowUsers] = useState(false)
    const [showBrands, setShowBrands] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [date, setDate] = useState(null)
    const [dashboardPhone, setDashBoardPhone] = useState('Dashboard')
    const [showDashboardPhone, setShowDashboardPhone] = useState(null)
    const [newBrand, setNewBrand] = useState(false)

    const [option1, setOption1] = useState(null)
    const [option2, setOption2] = useState(null)
    const [option3, setOption3] = useState(null)
    const [settings, setSettings] = useState(null)
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
        setNewBrand(false)
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
        setNewBrand(false)
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
        setNewBrand(false)
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
        setNewBrand(false)
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
        setNewBrand(false)
        if(showDashboardPhone){
            handleHideDashboardPhone()
        }
    }

    const handleAddBrand = () => {
        setDashBoardPhone('Settings')
        setShowDashBoard(false)
        setShowReviews(false)
        setShowUsers(false)
        setShowBrands(false)
        setShowSettings(false)
        setNewBrand(true)
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



    useEffect(() => {
        if(option1){
            let newSettings
            if(option1.value === "y"){
                newSettings = {
                    ...settings,
                    reviewVerificationRequired : false
                }
            }
            else{
                newSettings = {
                    ...settings,
                    reviewVerificationRequired : true
                }
            }
            console.log(settings)
            setSettings({...newSettings})
            axios.patch("/settings",{
                ...newSettings
            })
            .then(() =>{
                console.log("tyes")
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    }, [option1])
    useEffect(() => {
        if(option2){
            let newSettings;
            if(option2.value === "y"){
                newSettings = ({
                    ...settings,
                    emailVerificationRequired : true
                })
            }
            else{
                newSettings = ({
                    ...settings,
                    emailVerificationRequired : false
                })
            }
            setSettings({...newSettings})
            axios.patch("/settings",{
                ...newSettings
            })
            .then(() =>{
                console.log("tyes")
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    }, [option2])
    useEffect(() => {
        console.log(option3)
        if(option3){
            let newSettings;
            if(option3.value === "y"){
                newSettings = ({
                    ...settings,
                    phoneVerificationRequired : true
                })
            }
            else{
                newSettings = ({
                    ...settings,
                    phoneVerificationRequired : false
                })
            }
            setSettings(newSettings)
            axios.patch("/settings",{
                ...newSettings
            })
            .then(() =>{
                console.log("tyes")
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    }, [option3])

    useEffect(() => {
        axios.get('settings/')
        .then(({data}) =>{
            console.log(data.settings)
            setSettings(data.settings)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState({})
    return (
        <section >
            <div className = 'dashboard'>
                <div className="dashboard__links">
                    <div className="dashboard__links-container">
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
                            <li onClick = {handleAddBrand} className = {newBrand ?  'dashboard__list__click': ''}>Add Brand</li>
                        </ul>
                    </div>
                    <div className="dashboard__links__filters">
                        {
                            !showSettings && !newBrand && !showDashBoard &&
                            <div className="dashboard__links__filters__item">
                                <FilterComponent tab = { showReviews ? "review" : showBrands ? "brand" : showUsers ? "user" : null } setFilters= {setFilters} setSortOptions = {setSortOptions}/>
                            </div>
                        }
                        {
                            !showSettings && !newBrand && !showUsers && !showBrands &&
                            <div className="dashboard__links__filters__item">
                                <MultiDatePicker date = {date}  setDate={setDate} />
                            </div>
                        }
                    </div>
                </div>
                
            {
                showDashBoard ? 
                    <div className = 'dashboard__panel__chart'>
                       <Chart date={date} />
                    </div>
                    :
                    (null)
            }
            {
                showReviews && 
                    <div className="dashboard__panel__review">
                        <DashboardReviews filters={filters} sortOptions={sortOptions} date={date}/>
                    </div>
            }
            {
                showUsers && 
                    <div className="dashboard__panel__user">
                        <DashBoardUsers filters={filters} sortOptions={sortOptions} date={date}/>
                    </div>
                        
            }
            {
                showBrands && 
                    <div className="dashboard__panel__user">
                        <DashBoardBrands filters={filters} sortOptions={sortOptions} date={date} />
                    </div>
            }
            {
                newBrand &&
                    <div className = 'dashboard__panel__add-brand'>
                        <DashboardAddBrand/>
                    </div>
            }
            {
                showSettings ? 
                    <>
                        <div className="dashboard1__settings">
                            {
                                settings &&
                                <>
                                    <div className="dashboard1__settings__option1">
                                        <label htmlFor="reviewVerify">Allow Verify Review</label>
                                        <Select
                                            id = 'reviewVerify'
                                            onChange = {setOption1}
                                            options = {settingOptions1}
                                            className = 'dashboard1__settings__option1__dropdown'
                                            placeholder = {`Do you want Admin to verify reviews? (${settings.reviewVerificationRequired ? "Yes" : "No"})`}   
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
                                            placeholder = {` Email verification must require to post review? (${settings.emailVerificationRequired ? "Yes" : "No"})`}   
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
                                            placeholder = {` Phone verification must require to post review? (${settings.phoneVerificationRequired ? "Yes" : "No"})`}
                                        />
                                    </div>
                                </>
                            }
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
