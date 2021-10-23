import React, { useEffect, useState } from 'react'
import {axios} from '../../../axios/axiosInstance'
import Pagination from '../../../components/Pagination/Pagination'
import FilterComponent from "../../../components/filter_component/FilterComponent"
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator'
import ImageViewer from '../../../components/image_viewer/ImageViewer'
function DashBoardBrands() {

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [brandData, setBrandData] = useState(null)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({})
    const [blackListing, setBlackListng] = useState([])
    const [showImage, setShowImage] = useState(null)
    const handlePageination = (index) =>{
        setPage(index)
    }

    const handleBlackListing = (userId) =>{
        setBlackListng([...blackListing, userId])
    }
    const handleRemoveBlackListing = (userId) => {
        setBlackListng([...blackListing, userId])
    } 
    useEffect(() => {
        setBrandData(null)
        const options = {
            page,
            limit: 10,
            sortBy: sort
        }
        axios.post('/brand/query', {filters, options})
        .then(({data}) => {
            console.log(data)
            setBrandData(data.results)
            setTotalPages(data.totalPages)
        })
        
    }, [page, filters, sort])

    return (
        <div className="dashboard__brands">
            <FilterComponent tab = "brand" setFilters = {setFilters} setSortOptions = {setSort}/>
            <div className="dashboard__brands__data">
            {
                brandData &&
                brandData.map(
                    brand => (
                        <div className="dashboard__brands__data__brands">

                            <div className="dashboard__brands__data__brand__intro">
                                <img src = {brand.logo} onClick = {() => {setShowImage(brand.logo)}}/>
                                <h5>{brand.name}</h5>
                            </div>

                            <div className="dashboard__brands__data__brand__details">


                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Email</label>
                                    <p>{brand.email}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__email">
                                    <label>Average Rating</label>
                                    <p>{69.6}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__address">
                                    <label>About</label>
                                    <p>{brand.about}</p>
                                </div>

                                <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__phone">
                                    <label>Phone</label>
                                    <p>{brand.countryCode + " " + brand.phoneNumber}</p>
                                </div>

                                {
                                    !brand.blackListed ?
                                        <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                            <button onClick={() => handleBlackListing(brand.id)}>
                                                BlackList
                                                {
                                                    blackListing.includes(brand.id) &&
                                                    <LoadingIndicator />
                                                }
                                            </button>
                                        </div>
                                    :
                                        <div className="dashboard__brands__data__brand__item dashboard__brands__data__brand__details__button">
                                            <button onClick={() => handleRemoveBlackListing(brand.id)}>
                                                Remove from Blacklist
                                                {
                                                    blackListing.includes(brand.id) &&
                                                    <LoadingIndicator />
                                                }
                                            </button>
                                        </div>
                                }

                            </div>
                            {showImage ? ( <ImageViewer image = {showImage} setImage = {setShowImage}/> ) : ( null ) }
                        </div>
                    )
                )
            }
            </div>
            <div className="dashboard__brands__pagination">
                <Pagination totalPages={totalPages} handlePageination={handlePageination} />
            </div>
        </div>
    )
}

export default DashBoardBrands
