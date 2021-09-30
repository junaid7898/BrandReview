import React, { useState } from "react";
import HeaderIcon from "../../assests/icons/header_icon.png";
import SearchIcon from "../../assests/icons/search_icon.png";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchList from "./components/SearchList";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Redux/user slice/userSlice";

const Header = () => {
  //search bar states
  const [searchKey, setSearchKey] = useState(null);
  
  const [data, setData] = useState([
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
  const [isLogged, setIsLogged] = useState(true);

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)


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

        <a className="nav__icon">
          <img src={HeaderIcon} />
          <h1>Review Website</h1>
        </a>

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
          <img src={SearchIcon} />

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
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/profile/${user.user.id}`}>Profile</Link>
              </li>
              <li>
                {/* TODO api/logout */}
                <button onClick={ () => {dispatch(userActions.removeUser())}} >Logout</button>
              </li>
            </>
          )}
        </ul>
        <GrClose className="nav__close__icon" onClick={() => hideMenu()} />
      </div>
    </nav>
  );
};

export default Header;