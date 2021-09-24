import React from 'react'

const SearchList = ({styling, showResult, data}) => {
    return (
        <div className = {styling} style = {{display: showResult}}>
            {data.map((item) => {
                return(
                    <h1>{item}</h1>
                )
            })}
        </div>
    )
}

export default SearchList
