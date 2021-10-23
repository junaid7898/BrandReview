import React, {useEffect, useState} from 'react'
import ProfileImg from '../../../assests/images/Profile Image.png'
import ImageViewer from '../../../components/image_viewer/ImageViewer'
import Pagination from '../../../components/Pagination/Pagination'
import {axios} from '../../../axios/axiosInstance'
import FilterComponent from '../../../components/filter_component/FilterComponent'

const DashBoardUsers = () => {
    const [showImage, setShowImage] = useState(null)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [userData, setUserData] = useState(null)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({})
    const handlePageination = (index) =>{
        setPage(index)
    }

    useEffect(() => {
        const options = {
            page,
            limit: 10,
            sortBy: sort
        }
        setUserData(null)
        axios.post(`/user/query`,{filters, options})
        .then(({data}) => {
            console.log(data)
            setUserData(data.results)
            setTotalPages(data.totalPages)
        })
        
    }, [page, filters, sort])

    return (
        <div className="dashboard__users">
            <FilterComponent tab = "user" setFilters = {setFilters} setSortOptions = {setSort}/>
            <div className="dashboard__users__data">
            {
                userData &&
                userData.map(
                    user => (
                        <div className="dashboard__users__data__user">

                            <div className="dashboard__users__data__user__intro">
                                <img src = {user.profileImage} onClick = {() => {setShowImage(user.profileImage)}}/>
                                <h5>{user.name}</h5>
                            </div>

                            <div className="dashboard__users__data__user__details">


                                <div className="dashboard__users__data__user__details__email">
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__address">
                                    <label>Address</label>
                                    <p>{user.address}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__phone">
                                    <label>Phone</label>
                                    <p>{user.countryCode + " " + user.phoneNumber}</p>
                                </div>

                                <div className="dashboard__users__data__user__details__phone">
                                    <button>BlackList</button>
                                </div>

                            </div>
                            {showImage ? ( <ImageViewer image = {showImage} setImage = {setShowImage}/> ) : ( null ) }
                        </div>
                    )
                )
            }
            </div>
            <div className="dashboard__users__pagination">
                <Pagination totalPages={totalPages} handlePageination={handlePageination} />
            </div>
        </div>
    )
}

export default DashBoardUsers
