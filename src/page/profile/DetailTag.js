import React from 'react'
import './myDetails.css'

const DetailTag = ({label, value, class1}) => {
    return (
        <div className = {class1}>
            <label>{label}</label>
            <value>{value}</value>
        </div>
    )
}

export default DetailTag
