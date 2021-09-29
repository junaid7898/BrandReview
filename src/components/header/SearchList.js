import React from 'react'
import { Link } from 'react-router-dom'

import CarImage from '../../assests/images/car_image.jpg'

const SearchList = ({styling ,divStyling,  data, setShowResult}) => {
    
    
    return (
        <div className = {styling}>
            {
                data ?
                data.map((item) => {
                return(
                    <Link to ={`${"/"}`} className = {divStyling} onClick = { () => setShowResult(false)}>
                        <img src = {item.img} style = {{width: 50, borderRadius: 2  }}/>
                        <h1>{item.name}</h1>
                    </Link>
                    
                )
            }) :
                <h3 style={{padding: 10}}>
                    No Relavant Resutls
                </h3>
            }
        </div>
    )
}

export default SearchList