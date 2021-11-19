import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchIcon from "../../../assests/SearchIcon"
function Search() {

    const {brands} = useSelector(state => state.brands)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef()

    useEffect(() => {
        if (showSearchResults) {
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
      }, [searchRef, showSearchResults]);

    function handleClickOutside(event) {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearchResults(false);
        }
    }
    const handleEsc = (e) => {
        if(e.keyCode === 27){
            setShowSearchResults(false)
        }
    }
    const handleSearch = (e) => {
        if (e.trimStart() === "") {
          setSearchResults([]);
          return;
        }
        setSearchResults(
            brands.filter((item) => {
            if (item.name.toLowerCase().includes(e.trimStart().toLowerCase())) {
              return item;
            }
            return null;
          })
        );
      };

    return (
        <div ref={searchRef} className="header__searchbar-container">
            <div className="header__searchbar" onClick={ () => setShowSearchResults(true) }>
                <div className="header__searchbar__input">
                    <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Search here" />
                </div>
                <div className="header__searchbar__icon">
                    <SearchIcon />
                </div>
            </div>
            {
                showSearchResults ?
                    <div className="header__searchbar__dropdown-container">
                        {
                            searchResults.length > 0 
                            ?
                                searchResults.map(item =>

                                        <Link to={`/brand/${item.slug}`} onClick={() => setShowSearchResults(false)} className="header__searchbar__dropdown-item">
                                            <img src={item.logo} alt="brand logo" />
                                            <p>{item.name}</p>
                                        </Link>
                                )
                            :
                                <p className="header__searchbar__dropdown-empty">Nothing to show</p>
                        }
                    </div>
                :
                    null
            }
        </div>
    )
}

export default Search
