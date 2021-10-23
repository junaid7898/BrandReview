import React, { useEffect, useState } from 'react'
import {axios} from '../../../axios/axiosInstance'
import Pagination from '../../../components/Pagination/Pagination'
import FilterComponent from "../../../components/filter_component/FilterComponent"
function DashBoardBrands() {

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [brandData, setBrandData] = useState(null)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({})
    const handlePageination = (index) =>{
        setPage(index)
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
        <div>
            <FilterComponent tab = "brand" setFilters = {setFilters} setSortOptions = {setSort}/>
            {
                brandData &&
                brandData.map(user => 
                    JSON.stringify(user, null ,2)
                )
            }

            <Pagination totalPages={totalPages} handlePageination={handlePageination} />

        </div>
    )
}

export default DashBoardBrands
