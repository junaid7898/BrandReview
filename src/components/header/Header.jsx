import React, { useState } from "react";
import HeaderIcon from "../../assests/icons/header_icon1.png";
import SearchIcon from "../../assests/icons/search_icon.png";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import SearchList from "./components/SearchList";
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../Redux/clientslice/clientSlice";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

import { AiFillCaretDown, AiFillCar } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import {BiUser} from 'react-icons/bi'

import { logout } from "./logout";
import Links from "./components/Links";


const Header = () => {
  //search bar states
  const [searchKey] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [data] = useState([
    {
      name: "car 1",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "pewdiepie 69",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "bike 3",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "car 4",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "car 5",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "fff2 6",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
    {
      name: "toyota 7",
      img: "https://www.carlogos.org/car-logos/toyota-logo-1989-1400x1200.png",
    },
  ]);

  //states to show and hide nav links and search bar
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(-1000);
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { client } = useSelector((state) => state.client);
  const { attemptingLoginOnSiteLoad } = useSelector((state) => state.status);

  const handleSearch = (e) => {
    if (e.trimStart() === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      data.filter((item) => {
        if (item.name.toLowerCase().includes(e.trimStart().toLowerCase())) {
          return item;
        }
        return null;
      })
    );
  };

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
          <img src={SearchIcon} alt="search icon" />

          {searchResults.length > 0 && showResult ? (
            <>
              <SearchList
                styling="nav__search__results"
                divStyling="nav__search__result__item"
                showResult={showResult}
                data={searchResults}
                setShowResult={setShowResult}
              />
            </>
          ) : null}
        </div>
      </div>

      <div
        className={`nav__links ${
          isShowingMenu ? `nav__links-show` : `nav__links-hide`
        }`}
      >
        <ul>
          <li><Link to = '/' ><h4 className = 'nav__links__link__h4'>Home</h4></Link></li>
          
          {!attemptingLoginOnSiteLoad ? (
            !client ? (
              <>
              {/* ANCHOR Links for headers */}
              {/* SECTION Login */}
              <li>


                  <div
                    className="nav__links__link"
                    onClick={() => {
                      setShowRegister(false)
                      setShowLogin(!showLogin);
                    }}
                  >
                      <h4 className = 'nav__links__link__h4'>Login</h4>
                      <FiChevronDown size={20} className="nav__links__icon" />
                      {
                        showLogin ? 
                        (
                            <div className="nav__links__link__user-login">
                              <Link
                                to="/user/login"
                                className="nav__links__link__user-login__link1"
                              >
                                <div className="nav__links__link__user-login__link1__item">
                                  <BiUser size = {15}/>
                                  <h4>User</h4>
                                </div>
                                
                              </Link>
                              <Link
                                to="/brand/login"
                                className="nav__links__link__user-login__link2"
                              >
                              <div className="nav__links__link__user-login__link2__item">
                                    <AiFillCar size = {15}/>
                                    <h4 >Brand</h4>
                              </div>
                               
                              </Link>
                            </div>
                        )
                        :
                        null
                      }
                  </div>

                      {/* SECTION LOGIN ends here */}
                </li>


                      {/* SECTION Register links start */}
                <li>

                    <div
                      className="nav__links__link"
                      onClick={() => {
                        setShowLogin(false);
                        setShowRegister(!showRegister);
                      }}
                    >
                      
                      <h4 className = 'nav__links__link__h4'>Signup</h4>
                      <FiChevronDown size={20} className="nav__links__icon" />
                        {
                          showRegister ? 
                          (
                            <div className="nav__links__link__user-login">
                                <Link
                                  to="/user/signup"
                                  className="nav__links__link__user-login__link1"
                                >
                                  <div className="nav__links__link__user-login__link1__item">
                                    <BiUser size = {15}/>
                                    <h4>User</h4>
                                </div>
                                </Link>
                                <Link
                                  to="/brand/signup"
                                  className="nav__links__link__user-login__link2"
                                >
                                  <div className="nav__links__link__user-login__link2__item">
                                    <AiFillCar size = {15}/>
                                    <h4 >Brand</h4>
                                  </div>
                                </Link>
                            </div>
                          )
                          :
                          null
                        }
                    </div>
                </li>
                
              {/* SECTION Register ends Here */}
              </>
            ) : (
              <>
                <li>
                  {
                    client.type.includes("user") ? 
                    (
                      <Link to={`/user/${client.user.id}`} ><h4 className = 'nav__links__link__h4'>Profile</h4></Link>
                    ) 
                    :
                     client.type === "brand" ? 
                     (
                        <Link to={`/brand/panel/${client.user.id}`}>
                          <h4  className = 'nav__links__link__h4'>Brand</h4>
                        </Link>
                     )
                      :
                      null
                  }
                </li>
                <li>
                  {
                    (
                      client.type.includes("brand") &&
                      client.brand.role.includes("brand")) ||
                      client.user.role.includes("brandAdmin") ? 
                      (
                        <Link to={`/brand/panel/${client.brand.id}`}>   
                          <h4 className = 'nav__links__link__h4'>Panely</h4>    
                        </Link>
                      )
                      :
                      null
                  }
                </li>
                <li>
                  {
                    client.type.includes("admin") ||
                    (
                      client.type === "user" &&
                      client.user.role.includes("subAdmin")
                    )

                    ?

                    (
                      <Link to={`/admin`} ><h4 className = 'nav__links__link__h4'>Admin Panel</h4></Link>
                    )
                    :
                    null
                  }
                </li>
                {/* <li className = 'nav__links__button__after'> */}
                  <button
                   className = 'nav__links__button'
                    onClick={() => logout(dispatch, history, client.type, client.tokens.refresh.token)}
                  >
                    Logout
                  </button>
                {/* </li> */}
              </>
            )
          ) : (
            <div className="loading__indicator__div">
              <div className="loading__indicator__div__mask">
              </div>
              <LoadingIndicator
                className="login__indicator"
              />
            </div>
          )}
        </ul>
        <GrClose className="nav__close__icon" onClick={() => hideMenu()} />
      </div>      
        {/* <div
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
                    <Links client = {client} />
                    <li>
                      <button onClick={ () => {logout(dispatch, history, client.type, client.tokens.refresh.token )}} >Logout</button>
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
        </div> */}
    </nav>
  );
};

export default Header;
