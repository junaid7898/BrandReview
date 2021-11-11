import "./sass/main.scss"
import TermsAndCondition from './page/terms_and_condition/TermsAndCondition';
import WriteReview from './page/write_review/WriteReview';
import Profile from './page/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Admin from './page/admin/Admin';
import HomePage from './page/Homepage/HomePage';
import BrandPanel from './page/BrandPanel/BrandPanel';
import ComparisonPage from './page/Comparison/ComparisonPage';
import SignUp from './page/Sign_up/SignUp';
import Login from './page/login/Login';
import BrandSignUp from './page/brand_sign_up/BrandSignUp';
import BrandLogin from './page/brand_log_in/BrandLogin';
import { AdminLogin } from './page/admin_login/AdminLogin';
import SearchBrand from './page/search/SearchBrand';
import PhoneVerification from './page/phone_verification_page/PhoneVerification';
import Error404Page from './page/error_404_page/Error404Page';
import EmailVerificationPage from './page/email_verification_page/EmailVerificationPage';

import { useEffect, useRef, useState } from 'react';
import { axios } from "./axios/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clientActions } from "./Redux/clientslice/clientSlice";
import PrivateRoute from "./PrivateRoute";
import { statusAction } from "./Redux/statusSlice";
import { brandAction } from "./Redux/brandInfoSlice/brandInfoSlice";
import Notification from "./components/notification/Notification";
import ForgotPasswordPage from "./page/forgotPasswordPage/ForgotPasswordPage";
import Background from "./components/Background/Background";
// import {  } from "react-router-dom";
function App() {

  const dispatch = useDispatch()
  const {client} = useSelector(state => state.client)
  const { attemptingLoginOnSiteLoad } = useSelector((state) => state.status);
  const isStateSet = useRef(false)
  const [isState, setIsState] = useState(false)
  useEffect(() => {
    axios.get("brand/getAllBrands")
    .then(({data}) => {
      dispatch(brandAction.setBrands(data))
    })
  }, [])

  useEffect(() => {
    console.log(attemptingLoginOnSiteLoad)
    if(attemptingLoginOnSiteLoad === null || attemptingLoginOnSiteLoad === undefined){
      setIsState(true)
    }
    console.error("opuside if")
  }, [attemptingLoginOnSiteLoad])



  useEffect(() => {
    
    const type = localStorage.getItem("clientType")
    if(type === "user"){
      const userId = localStorage.getItem("userId")
      const accessToken = localStorage.getItem("accessToken")
      if(userId && accessToken){
        dispatch(statusAction.setAttemptingLogin(true))
        axios.get(`/auth/user/login/${userId}`,{
          headers:{
            'authorization' : `bearer ${accessToken}`
          }
        }).then(({data: user}) => {
          dispatch(clientActions.setClient(user))
          dispatch(statusAction.setAttemptingLogin(false))
          console.log(user);
        })
        .catch(err =>{
          console.log(err);
          localStorage.removeItem("userId")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("clientType")
        })
      }
    }
    else if(type === "brand"){
      const brandId = localStorage.getItem("brandId")
      const accessToken = localStorage.getItem("accessToken")
      if(brandId && accessToken){
        dispatch(statusAction.setAttemptingLogin(true))
        axios.get(`/auth/brand/login/${brandId}`,{
          headers:{
            'authorization' : `bearer ${accessToken}`
          }
        }).then(({data: brand}) => {
          dispatch(clientActions.setClient(brand))
          dispatch(statusAction.setAttemptingLogin(false))
          console.log(brand);
        })
        .catch(err =>{
          console.log(err);
          localStorage.removeItem("brandId")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("clientType")
        })
      }
    }
    
    
  }, [dispatch])
  const handleRedirect = (message, type = "error") => {
    dispatch(statusAction.setNotification({
      message,
      type
    }))
    return(
      <Redirect to = '/'/>
    )
  }
  
  return (
    <div className="app" >
      {
        isState ?
        !attemptingLoginOnSiteLoad ?
          // <Background />
          null
        :
          null
    : null
      }
    
    <Router>
    <Notification /> 
    <Header/>
      {
        isState ?
          !attemptingLoginOnSiteLoad ?
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route exact path="/user/login" > 
                    {
                      !client 
                      ? 
                        <Login />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>
              <Route exact path="/user/signup" > 
                    {
                      !client 
                      ? 
                        <SignUp />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>
              <Route 
                    exact 
                    path="/user/:userId" 
                    component={Profile}
              />
              <Route exact path="/review" > 
                    {
                      client 
                      ? 
                        client.type.includes("user") ?
                          <WriteReview />
                          :
                            () => handleRedirect("Brands cant give review :))")
                      :
                        () => handleRedirect("You need to be Logged in to give reviews")
                    }
                    
              </Route>
              <Route exact path="/brand/login" > 
                    {
                      !client 
                      ? 
                        <BrandLogin />
                      :
                      () => handleRedirect("Already Logged in")
                    }
                    
              </Route>
              <Route exact path="/brand/signup" > 
                    {
                      !client 
                      ? 
                        <BrandSignUp />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>

              <Route exact path="/brand/panel/:brandId" > 
                    {
                      client 
                      ? 
                        (client.type.includes("brand") || client.type.includes('admin')) &&
                        <BrandPanel />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>
              
              <Route path = '/brand/comparison/:brandSlug1/:brandSlug2' component = {ComparisonPage}/>  
              <Route path = '/brand/:brandSlug' component = {SearchBrand} />

              <Route exact path="/admin" exact > 
                    {
                      client 
                      ? 
                        client.type.includes("admin") &&
                        <Admin />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>
              <Route exact path="/admin/login" exact > 
                    {
                      !client 
                      ? 
                        <Admin />
                      :
                        <Redirect to='/' exact />
                    }
              </Route>
              <Route path = '/phoneverification' component = {PhoneVerification}/>
              <Route path = '/verify-email/:token/:type' component = {EmailVerificationPage}/>  
              <Route path = '/termsandcondition' component = {TermsAndCondition}/>
              <Route path = '/forgot-password/:token/:type' component = {ForgotPasswordPage}/>
              <Route path = '/*' component = {Error404Page}/>
            </Switch>
          :
            null
        :
          null
      }
      <Footer/>
    </Router>
    
    </div>
  );
}

export default App;
