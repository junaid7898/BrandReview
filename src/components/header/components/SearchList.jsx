import React from 'react'
import { Link } from 'react-router-dom'


const SearchList = ({styling ,divStyling,  data, setShowResult}) => {
    
    
    return (
        <div className = {styling}>
            {
                data ?
                data.map((item) => {
                return(
                    <Link to ={`/brand/${item.id}`} className = {divStyling} onClick = { () => setShowResult(false)}>
                        <img alt={`brand ${item.name} logo`} src = {item.logo} style = {{width: 50, borderRadius: 2  }}/>
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