import React from 'react'

const DetailTag = ({label, value, class1}) => {
    return (
        <div className = {class1}>
            <label>{label}</label>
            <value>{value ? value : '-'}</value>
        </div>
    )
}

export default DetailTag
