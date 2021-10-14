import React, { useRef, useState, useEffect } from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import {GrRadial, GrRadialSelected} from 'react-icons/gr'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'

const FilterComponent = () => {
    const [showList, setShowList] = useState(true)
    const filterRef = useRef(null)
    const [sortOption, setSortOption] = useState(1)
    const [filterOption, setFilterOption] = useState([0])


    useEffect(() => {
        if (showList) {
          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener('keydown', handleEsc)
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener('keydown', handleEsc)
        }
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener('keydown', handleEsc)
        };
      }, [filterRef, showList]);


      function handleClickOutside(event) {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          setShowList(false);
        }
      }

        const handleEsc = (e) => {
            if(e.keyCode === 27){
                setShowList(false)
            }
        }

        useEffect(() => {
            console.log(sortOption);
        }, [sortOption])

        const handleFilters = (option) => {
            if(filterOption.includes(option)){
                setFilterOption(filterOption.filter(item => item !== option))
                return 0
            }
            else{
                setFilterOption([...filterOption, option])
                return 0
            }
        }


    return (
        <div ref = {filterRef} className="filter">
            <div className="filter__div"  onClick = {() => setShowList(!showList)}>
                <h1>Filter & Sort</h1>
                <div className="filter__div__icon">
                    <FaSortAmountDownAlt size = {24} color = '#357BCE'/>
                </div>
            </div>
            {showList ? 
            (
                <div  className="filter__options">
                    <p>Sort By</p>
                    <div onClick={() => setSortOption(1)} className={`filter__options__item ${sortOption === 1 && `filter__options__item-selected` }`}>
                        <h5>Highest Rated</h5>
                    </div>
                    <div onClick={() => setSortOption(2)} className={`filter__options__item ${sortOption === 2 && `filter__options__item-selected` }`}>
                        <h5>Lowest Rated</h5>
                    </div>
                    <p>Filter Options</p>
                    <div onClick = {() => handleFilters(1)} 
                         className={`filter__options__filter ${filterOption.includes(1) && `filter__options__filter-selected` }`}>
                        <h5>resolved</h5>
                    </div>

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



// {
//     sortBy.map((item, index) => {
//     {console.log('clicked: ' + clicked)}
//     return(
//         <div className="filter__options__items" id = {index} onClick = {() => setClicked(true)}>
//             <label htmlFor = 'checkBox'>{item}</label>
//             {/* <input id = 'checkBox' type = 'checkbox' className = 'filter__options__items__input'/> */}
//             {clicked === true ? (<GrRadialSelected size = {24} color = 'blue'/>): (<GrRadial size = {24}/>)}
            
//         </div>
//     )
// })
// }