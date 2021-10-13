import React, { useState } from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import {GrRadial, GrRadialSelected} from 'react-icons/gr'

const FilterComponent = () => {
    let sortBy = ['Lowest Rated', 'Highest Rated', 'Lowest Rated', 'Highest Rated', 'Lowest Rated', 'Highest Rated']
    const [showList, setShowList] = useState(false)
    const [clicked, setClicked] = useState(false)
    return (
        <div className="filter">
            <div className="filter__div" onClick = {() => {
                if(showList === true){
                    setShowList(false)
                }
                else{
                    setShowList(true)
                }
            }}>
                <h1>Filter & Sort</h1>
                <div className="filter__div__icon">
                    <FaSortAmountDownAlt size = {24} color = '#357BCE'/>
                </div>
            </div>
            {showList ? 
            (
                <div className="filter__options">
                    <p>Sort By</p>
                    {sortBy.map((item, index) => {
                        {console.log('clicked: ' + clicked)}
                        return(
                            <div className="filter__options__items" id = {index} onClick = {() => setClicked(true)}>
                                <label htmlFor = 'checkBox'>{item}</label>
                                {/* <input id = 'checkBox' type = 'checkbox' className = 'filter__options__items__input'/> */}
                                {clicked === true ? (<GrRadialSelected size = {24} color = 'blue'/>): (<GrRadial size = {24}/>)}
                                
                            </div>
                        )
                    })}
                </div>
            ):
            (
                null
            )
            }
            
        </div>
    )
}

export default FilterComponent
