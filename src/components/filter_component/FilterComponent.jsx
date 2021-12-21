import React, { useRef, useState, useEffect } from 'react'
import {FaSortAmountDownAlt} from 'react-icons/fa'

const FilterComponent = ({tab, setFilters, setSortOptions}) => {
    const [showList, setShowList] = useState(false)
    const filterRef = useRef(null)
    const [sort, setSort] = useState({
        createdAt: -1
    })
    const [filterOption, setFilterOption] = useState({})
    const [isAscending, setIsAscending] = useState(false)

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
            if(option === "rating"){
                setSort({
                    rating: isAscending ? 1: -1
                })
            }
            else if(option === "date"){
                setSort({
                    createdAt: isAscending ? 1 : -1
                })
            }
        }

        const handleInput = (e) =>{
            const searchQuery = e.target.value.trimStart()
            const g = filterOption
            if(searchQuery === ""){
                delete g.query
                setFilterOption({...g})
                return 
            }
            setFilterOption({
                ...filterOption,
                query: JSON.stringify({$text: `{$search: ${searchQuery}}`}),
            })
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
                    <input onChange={(e) => handleInput(e)} type="text" placeholder="Sırala" />
                </div>
                <div className="filter__div__icon">
                    <FaSortAmountDownAlt onClick={() => setIsAscending(!isAscending)} className={`filter__div__icon__svg ${isAscending && `filter__div__icon__svg-asc`}`} size = {24} color = '#357BCE'/>
                </div>
            </div>
            {showList ? 
            (
                <div  className="filter__options">
                    <p>Göre Sırala</p>
                    {
                        tab === "review" &&
                        <div onClick={() => handleOption("rating")} className={`filter__options__item ${sort.rating && `filter__options__item-selected` }`}>
                            <h5>Memnuniyet</h5>
                        </div>
                    }
                    <div onClick={() => handleOption("date")} className={`filter__options__item ${sort.createdAt && `filter__options__item-selected` }`}>
                        <h5>Tarihe Göre</h5>
                    </div>

                    <p>Filtrele</p>
                    {
                        tab === "review" &&
                        <div onClick = {() => handleFilters('resolved')} 
                         className={`filter__options__filter ${filterOption.isResolved && `filter__options__filter-selected` }`}>
                            <h5>Çözümlenen</h5>
                        </div>
                    }
                    {
                        (tab === "user" || tab === "brand") &&
                        <div onClick = {() => handleFilters('email')} 
                         className={`filter__options__filter ${filterOption.isEmailVerified && `filter__options__filter-selected` }`}>
                            <h5>IsEmailVerified</h5>
                        </div>
                    }
                    {
                        tab === "user" &&
                        <div onClick = {() => handleFilters('phone')} 
                            className={`filter__options__filter ${filterOption.isPhoneVerified && `filter__options__filter-selected` }`}>
                            <h5>isPhoneVerified</h5>
                        </div>
                    }
                    {
                        (tab === "review" || tab === "brand") &&
                        <div onClick = {() => handleFilters('verified')} 
                         className={`filter__options__filter ${filterOption.isVerified && `filter__options__filter-selected` }`}>
                            <h5>Onaylanan</h5>
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

