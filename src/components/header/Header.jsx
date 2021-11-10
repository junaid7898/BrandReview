import React, { useState , useEffect, useRef} from "react";
import HeaderIcon from "../../assests/icons/header_icon1.png";
import SearchIcon from "../../assests/SearchIcon";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchList from "./components/SearchList";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import {BiLockAlt, BiLockOpenAlt} from 'react-icons/bi'
import { AiFillCar } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import {BiUser} from 'react-icons/bi'
import { axios } from "../../axios/axiosInstance";
import { logout } from "./logout";
import WebsiteLogo from "../../assests/WebsiteLogo"
import {AiOutlineBell} from 'react-icons/ai'
import NotificationBell from "./components/NotificationBell";

const Header = () => {
  //search bar states
  const [searchKey] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const searchValueRef = useRef()
  const {brands: data} = useSelector(state => state.brands)
  const [isEmailVerified, setIsEmailVerified] = useState(true)
  const { client } = useSelector((state) => state.client);
  const {pathname} = useLocation()


  useEffect(() => {
    document.getElementById('nav_search').value = ""
  }, [pathname])

  useEffect(() => {
    if(client){
      if(client.type.includes('user')){
          setIsEmailVerified(client.user.isEmailVerified)
          console.log('verification==========> : ', client.user.isEmailVerified);
        
      }
      else if(client.type.includes('brand')){
          setIsEmailVerified(client.brand.isEmailVerified)
          console.log('b verification==========> : ', client.brand.isEmailVerified);
      }
    }
  }, [client])



  //states to show and hide nav links and search bar
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(-1000);
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { attemptingLoginOnSiteLoad } = useSelector((state) => state.status);


    //ANCHOR search ref to close on click
    const searchRef = useRef(null);

    //ANCHOR useEffect
    useEffect(() => {
      if (showResult) {
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
    }, [searchRef, showResult]);

    //ANCHOR useEffect for hiding login and register
    const loginRef = useRef(null)
    useEffect(() => {
      if (showLogin) {
        document.addEventListener("mousedown", handleClickOutside1);
        document.addEventListener('keydown', handleEsc1)
      } else {
        document.removeEventListener("mousedown", handleClickOutside1);
        document.removeEventListener('keydown', handleEsc1)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside1);
        document.removeEventListener('keydown', handleEsc1)
      };
    }, [loginRef, showLogin]);

    const registerRef = useRef(null)
    useEffect(() => {
      if (showRegister) {
        document.addEventListener("mousedown", handleClickOutside2);
        document.addEventListener('keydown', handleEsc2)
      } else {
        document.removeEventListener("mousedown", handleClickOutside2);
        document.removeEventListener('keydown', handleEsc2)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside2);
        document.removeEventListener('keydown', handleEsc2)
      };
    }, [registerRef, showRegister]);
    

    //ANCHOR handling use effect listeners
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResult(false);
      }
    }
    function handleClickOutside1(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    }

    function handleClickOutside2(event) {
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setShowRegister(false);
      }
    }

    const handleEsc = (e) => {
      if(e.keyCode === 27){
          setShowResult(false)
      }
    }
    const handleEsc1 = (e) => {
      if(e.keyCode === 27){
          setShowLogin(false)
      }
    }

    const handleEsc2 = (e) => {
      if(e.keyCode === 27){
          setShowRegister(false)
      }
    }


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

  const handleUserVerification = async () => {
    await axios.post('/auth/user/send-verification-email', {user: client.user, type:"user"})
    console.log('email sent.....');
  }

  const handleBrandVerification = async () => {
    await axios.post('/auth/brand/send-verification-email', {brand: client.brand, type:"brand"})
    console.log('email sent for brand....')
  }
  return (
    <nav className="nav" >
      
      <div className="nav-container">
      <div className="nav__innerContainer">
        <SearchIcon
          className="nav__search__icon"
          onClick={() => {
            showBar();
          }}
        />

        <Link to="/" className="nav__icon">
          <WebsiteLogo className="nav__icon__svg" />
          <h1>SikayetBox</h1>
        </Link>

        <div className="nav__icon__container">
        {
          !attemptingLoginOnSiteLoad 
          ?
            <GiHamburgerMenu
              className="nav__open__icon"
              onClick={() => showMenu()}
            />
          :
            <div className="nav__icon__container__mobile">
              <LoadingIndicator />
            </div>
        }
        </div>
      </div>

      <div ref = {searchRef} className="nav__searchdiv" style={{ left: showSearchBar }} >
        <div className="nav__searchBar">
          <GrClose
            className="searchBar__close__icon"
            onClick={() => hideBar()}
            
          />
          <input
            id="nav_search"
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={searchKey}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResult(true);
            }}
            onClick={() => setShowResult(!showResult)}
            ref = {searchValueRef}
          />
          <SearchIcon className="nav__searchBar__searchIcon" />

          {searchResults.length > 0 && showResult ? (
            <>
              <SearchList
                styling="nav__search__results"
                divStyling="nav__search__result__item"
                showResult={showResult}
                data={searchResults}
                setShowResult={setShowResult}
                event = {searchValueRef}
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
        {
          !attemptingLoginOnSiteLoad 
          ?
          <>
            <div className="nav__lock">
            {
              client 
              ?
                <BiLockOpenAlt className="nav__lock__lockIcon" />
              :
                <BiLockAlt className="nav__lock__unlockIcon" />
            }
            </div>
            <ul>
              {/* <li>
                <Link to = '/' >
                  <h4 className = 'nav__links__link__h4'>Home</h4>
                </Link>
              </li> */}
              
              {
                !client ? 
                (
                  <>
                          {/* ANCHOR Links for headers */}
                          {/* SECTION Login */}
                    <li>
                      <div
                        className="nav__links__link" onClick={() => {
                          setShowRegister(false)
                          setShowLogin(!showLogin);
                        }}>
                                    {/* SECTION nav links on click login */}
                            <h4 className = 'nav__links__link__h4'>Login</h4>
                            <FiChevronDown size={20} className="nav__links__icon" />
                                <div ref = {loginRef} className={`nav__links__link__user-login ${!showLogin && `nav__links__link__user-login-hide` }`}>

                                  <Link to="/user/login"  className="nav__links__link__user-login__link1">
                                    <div className="nav__links__link__user-login__link1__item">
                                      <BiUser size = {15}/>
                                      <h4>User</h4>
                                    </div> 
                                  </Link>

                                  <Link to="/brand/login" className="nav__links__link__user-login__link2">
                                    <div className="nav__links__link__user-login__link2__item">
                                          <AiFillCar size = {15}/>
                                          <h4 >Brand</h4>
                                    </div>
                                  </Link>
                                </div>
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
                            
                                <div ref = {registerRef} className={`nav__links__link__user-login ${!showRegister && `nav__links__link__user-login-hide` }`}>

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
                             
                        </div>
                    </li>
                    
                  {/* SECTION Register ends Here */}
                  </>
                ) : (
                  <>
                    
                      {
                        client.type.includes("user") 
                        ? 
                        (
                          client.user.role.includes("user") &&
                          <li>
                            <Link to={`/user/${client.user.id}`} ><h4 className = 'nav__links__link__h4'>Profile</h4></Link>
                          </li>
                        ) 
                        :
                        client.type.includes("brand") ? 
                        (
                            <li>
                              <Link to={`/brand/${client.brand.slug}`}>
                                <h4  className = 'nav__links__link__h4'>Brand Page</h4>
                              </Link>
                            </li>
                        )
                          :
                          null
                      }
                    
                    
                      {
                        (
                          client.type.includes("brand") &&
                          client.brand.role.includes("brand"))? 
                          (
                            <li>
                              <Link to={`/brand/panel/${client.brand.id}`}>   
                                <h4 className = 'nav__links__link__h4'>Brand Panel</h4>    
                              </Link>
                            </li>
                          )
                          :
                          null
                      }
                      {/* {
                        
                          client.type.includes('brand') ?
                          (
                            <li>
                            <Link to = {`/brand/${client.brand.id}`}><h4 className = 'nav__links__link__h4'>brand</h4></Link>
                            </li>
                          )
                          :
                          (
                            null
                          )
                      } */}
                    
                    
                      {
                        client.type.includes("admin") ||
                        (
                          client.type === "user" &&
                          client.user.role.includes("subAdmin")
                        )

                        ?

                        (
                          <li>
                            <Link to={`/admin`} ><h4 className = 'nav__links__link__h4'>Admin Panel</h4></Link>
                          </li>
                        )
                        :
                        null
                      }
                      {
                        client &&
                          <li>
                              <NotificationBell/>  
                          </li>
                          
                      }
                    
                    <>
                      <button
                      className = 'nav__links__button'
                        onClick={() => logout(dispatch, history, client.type, client.tokens.refresh.token)}
                      >
                        Logout
                      </button>
                    </>
                  </>
                )
              }
            </ul>
            <GrClose className="nav__close__icon" onClick={() => hideMenu()}  size = {24}/>
          </>
        :
          <LoadingIndicator className="nav__links__loader" /> 
        }
      </div>
      </div>
      
      {
        client ?
          client.type.includes("user")
          ?
            !client.user.isEmailVerified ?
              <div className="nav__emailVerification">
                <button onClick = {handleUserVerification}>verifiy email</button>
              </div>
              : null
          : client.type.includes("brand") ?
            !client.brand.isEmailVerified ?
              <div className="nav__emailVerification">
                <button onClick = {handleBrandVerification}>verifiy email</button>
              </div>
            : null
          : null
        : null
      }
      
    </nav>
  );
};

export default Header;
