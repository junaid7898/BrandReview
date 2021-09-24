import React, { useState } from "react";
import HeaderIcon from "../../assests/icons/header_icon.png";
import SearchIcon from "../../assests/icons/search_icon.png";
import LockIcon from "../../assests/icons/lock_icon.png";
import HeaderButton from "../../assests/icons/header_button.png";
import "./header.css";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import {BsSearch} from 'react-icons/bs'
import { Link } from "react-router-dom";
import SearchList from "./SearchList";

const Header = () => {
  //search bar states
  const [searchKey, setSearchKey] = useState(null);
  const [showResult, setShowResult] = useState("none");
  const [data, setData] = useState(['car 1', 'car2', 'car3', 'car 4', 'car 5', 'car 6'])

  //states to show and hide nav links and search bar
  const [isShowingMenu, setIsShowingMenu] = useState(-1000);
  const [showSearchBar, setShowSearchBar] = useState(-1000);

  const [isLogged, setIsLogged] = useState(true);

  //javascript for show and hide menu when media queries work
  const showMenu = () => {
    setIsShowingMenu(0);
  };
  const hideMenu = () => {
    setIsShowingMenu(-1000);
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
      <div className = 'nav__innerContainer'>
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

        <GiHamburgerMenu className="nav__open__icon" onClick={() => showMenu()} />

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
              setSearchKey(e.target.value);
              setShowResult('block')
            }}
          />
          <img src={SearchIcon} />
        </div>
        {searchKey === '' ? 
          (null)
          :
          <>
            <SearchList styling="nav__search__results" showResult = {showResult} data = {data}/>
          </>
        }
        
      </div>

      <div className="nav__links" style={{ right: isShowingMenu }}>
        <ul>
          {isLogged ? (
            <>
              <li>
                <Link to="/terms">Login</Link>
              </li>
              <li>
                <Link to="/review">Register</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Profile</Link>
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
