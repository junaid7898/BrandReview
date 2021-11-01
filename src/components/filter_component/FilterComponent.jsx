import React, { useRef, useState, useEffect } from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import {GrRadial, GrRadialSelected} from 'react-icons/gr'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'

const FilterComponent = ({tab, setFilters, setSortOptions}) => {
    const [showList, setShowList] = useState(false)
    const filterRef = useRef(null)
    const [sort, setSort] = useState({
        createdAt: "desc"
    })
    const [filterOption, setFilterOption] = useState({})
    const [isAscending, setIsAscending] = useState(true)

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

        

        const handleFilters = (option) => {
            if(option === "email"){
                if(filterOption.isEmailVerified){
                    let g = filterOption
                    delete g.isEmailVerified
                    setFilterOption({...g})                }
                else{
                    setFilterOption({...filterOption, isEmailVerified: true})
                }
            }
            else if(option === "phone"){
                if(filterOption.isPhoneVerified){
                    let g = filterOption
                    delete g.isPhoneVerified
                    setFilterOption({...g})
                }
                else{
                    setFilterOption({...filterOption, isPhoneVerified: true})
                }
            }
            else if(option === "resolved"){
                if(filterOption.isResolved){
                    let g = filterOption
                    delete g.isResolved
                    setFilterOption({...g})
                }
                else{
                    setFilterOption({...filterOption, isResolved: true})
                }
            }
            else if(option === "verified"){
                if(filterOption.isVerified){
                    let g = filterOption
                    delete g.isVerified
                    setFilterOption({...g})
                }
                else{
                    setFilterOption({...filterOption, isVerified: true})
                }
            }
            
        }

        const handleOption = (option) => {
            if(option === "likes"){
                setSort({
                    likedByUsers: isAscending ? 1: -1
                })
            }
            else if(option === "date"){
                setSort({
                    createdAt: isAscending ? 1 : -1
                })
            }
        }

        useEffect(() => {
            const g = sort
            for(var prop in g) {
                g[prop] = isAscending ? 1 : -1
            }
            setSort({...g})
        }, [isAscending])


        useEffect(() => {
            setSortOptions(sort)
        }, [sort])

        useEffect(() => {
            setFilters(filterOption)
        }, [filterOption])



    return (
        <div ref = {filterRef} className="filter">
            <div className="filter__div"  >
                <div onClick = {() => setShowList(!showList)} className="filter__div__div">
                    <h1>Filter & Sort</h1>
                </div>
                <div className="filter__div__icon">
                    <FaSortAmountDownAlt onClick={() => setIsAscending(!isAscending)} className={`filter__div__icon__svg ${isAscending && `filter__div__icon__svg-asc`}`} size = {24} color = '#357BCE'/>
                </div>
            </div>
            {showList ? 
            (
                <div  className="filter__options">
                    <p>Sort By</p>
                    {
                        tab === "review" &&
                        <div onClick={() => handleOption("likes")} className={`filter__options__item ${sort.likedByUsers && `filter__options__item-selected` }`}>
                            <h5>Rating</h5>
                        </div>
                    }
                    <div onClick={() => handleOption("date")} className={`filter__options__item ${sort.createdAt && `filter__options__item-selected` }`}>
                        <h5>Date Created</h5>
                    </div>

                    <p>Filter Options</p>
                    {
                        tab === "review" &&
                        <div onClick = {() => handleFilters('resolved')} 
                         className={`filter__options__filter ${filterOption.isResolved && `filter__options__filter-selected` }`}>
                            <h5>Resolved</h5>
                        </div>
                    }
                    {
                        tab === "client" &&
                        <>
                        <div onClick = {() => handleFilters('email')} 
                         className={`filter__options__filter ${filterOption.isEmailVerified && `filter__options__filter-selected` }`}>
                            <h5>IsEmailVerified</h5>
                        </div>
                        <div onClick = {() => handleFilters('phone')} 
                            className={`filter__options__filter ${filterOption.isPhoneVerified && `filter__options__filter-selected` }`}>
                            <h5>isPhoneVerified</h5>
                        </div>
                        </>
                    }
                    {
                        tab === "review" &&
                        <div onClick = {() => handleFilters('verified')} 
                         className={`filter__options__filter ${filterOption.isVerified && `filter__options__filter-selected` }`}>
                            <h5>IsVerified</h5>
                        </div>
                    }

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