import React from 'react'
import { Link } from 'react-router-dom'


const SearchList = ({styling ,divStyling,  data, setShowResult, event}) => {
    
    
    return (
        <div className = {styling}>
            {
                data ?
                data.map((item) => {
                return(
                    <Link to ={`/brand/${item.id}`} className = {divStyling} onClick = { () => {setShowResult(false); event.current.value = null}}>
                        <img alt={`brand ${item.name} logo`} src = {item.logo} style = {{width: 50, height: 50, objectFit:"contain", borderRadius: 2  }}/>
                        <p>{item.name}</p>
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