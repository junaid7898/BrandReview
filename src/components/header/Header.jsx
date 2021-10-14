import React, { useState } from "react";
import HeaderIcon from "../../assests/icons/header_icon.png";
import SearchIcon from "../../assests/icons/search_icon.png";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import SearchList from "./components/SearchList";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../Redux/clientslice/clientSlice";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const Header = () => {
  //search bar states
  const [searchKey] = useState(null);
  
  const [data] = useState([
    {
      name: "car 1",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "pewdiepie 69",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "bike 3",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "car 4",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "car 5",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "fff2 6",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
    {
      name: "toyota 7",
      img:"https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png"
    },
  ]);

  //states to show and hide nav links and search bar
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(-1000);
  const [searchResults, setSearchResults] = useState([])
  const [showResult, setShowResult] = useState(false);

  const dispatch = useDispatch()
  const history = useHistory()
  const {client} = useSelector(state => state.client)
  const {attemptingLoginOnSiteLoad} = useSelector(state => state.status)

  const handleSearch = (e) => {

    if(e.trimStart() === ""){
      setSearchResults([])
      return
    }
    setSearchResults(
      data.filter( item => {
        if(item.name.toLowerCase().includes(e.trimStart().toLowerCase()))
        {
          return item
        }
        return null
      })
    )

  }

  //javascript for show and hide menu when media queries work
  const showMenu = () => {
    setIsShowingMenu(true);
  };
  const hideMenu = () => {
    setIsShowingMenu(false);
  };

  //javascript for show and hide search bar
  const showBar = () => {
    setShowSearchBar(0);
  };
  const hideBar = () => {
    setShowSearchBar(-1000);
  };
  return (
    <nav className="nav">
      <div className="nav__innerContainer">
        <BsSearch
          src={SearchIcon}
          className="nav__search__icon"
          onClick={() => {
            showBar();
          }}
        />

        <Link to="/" className="nav__icon">
          <img src={HeaderIcon} alt="site logo" />
          <h1>Review Website</h1>
        </Link>

        <GiHamburgerMenu
          className="nav__open__icon"
          onClick={() => showMenu()}
        />
      </div>

      <div className="nav__searchdiv" style={{ left: showSearchBar }}>
        <div className="nav__searchBar">
          <GrClose
            className="searchBar__close__icon"
            onClick={() => hideBar()}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResult(true);
            }}
          />
          <img src={SearchIcon} alt="search icon"/>

            {
              searchResults.length > 0 && showResult ?
              <>
              <SearchList
                styling="nav__search__results"
                divStyling = 'nav__search__result__item'
                showResult={showResult}
                data={searchResults}
                setShowResult = {setShowResult}
              />
            </>
            :
            null
            }
          
        </div>
      </div>

      
        <div
          className={`nav__links ${
            isShowingMenu ? `nav__links-show` : `nav__links-hide`
          }`}
        >
          <ul>
            {
              !attemptingLoginOnSiteLoad ?
              (
              !client ? 
                (
                  <>
                    <li>
                      Login as
                      <Link to="/user/login">User</Link>
                      <Link to="/brand/login">Brand</Link>
                    </li>
                    <li>
                      Signup as
                      <Link to="/user/signup">User</Link>
                      <Link to="/brand/signup">Brand</Link>
                    </li>
                  </>
                ) : 
                (
                  <>
                    <li>
                      {
                        client.type.includes("user") ?
                          <Link to={`/user/${client.user.id}`}>Profile</Link>
                        : client.type === "brand" ?
                          <Link to={`/brand/panel/${client.user.id}`}>Brand Panel</Link>
                        : 
                          null
                      }
                    </li>
                    <li>
                    {
                      client.type.includes('brand') && client.brand.role.includes("brand") || 
                      client.user.role.includes("brandAdmin")  
                      ?
                        <Link to={`/brand/panel/${client.brand.id}`}>Brand Panel</Link>
                      :
                        null
                    }
                    </li>
                    <li>
                    {
                      client.type.includes('admin') ||
                      ( client.type === "user" && client.user.role.includes("subAdmin") )
                      ?
                        <Link to={`/admin`}>Admin Panel</Link>
                      :
                        null
                    }
                    </li>
                    <li>
                      <button onClick={ () => {
                        dispatch(clientActions.removeClient())
                        localStorage.removeItem('userId')
                        localStorage.removeItem('brand  Id')
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('clientType')
                        history.push('/')
                        }} >Logout</button>
                    </li>
                  </>
                )
              )
              :
                <div className="">
                  <LoadingIndicator className="" style={{color:"blue", fontSize:"100px"}} /> 
                </div>
          }
          </ul>
          <GrClose className="nav__close__icon" onClick={() => hideMenu()} />
        </div>
    </nav>
  );
};

export default Header;