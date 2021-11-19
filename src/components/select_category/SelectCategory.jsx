import { computeHeadingLevel } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { axios } from '../../axios/axiosInstance';
const SelectCategory = ({value, setValue}) => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
         axios.get('/category')
         .then(res => {
            setCategories(res.data)
         })
    }, [])
    return (
        <div className = 'select__category'>
            <Select
                id = 'reviewVerify'
                value = {value}
                options = {categories && categories.map(item => {
                    return {value: item.category, label: item.category}
                })}
                onChange = {setValue}
                className = 'select__category__select'
                // placeholder = {` Phone verification must require to post review? (${settings.phoneVerificationRequired ? "Yes" : "No"})`}
            />
        </div>
    )
}

export default SelectCategory
