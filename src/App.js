import "./sass/main.scss"
import TermsAndCondition from './page/terms_and_condition/TermsAndCondition';
import WriteReview from './page/write_review/WriteReview';
import Profile from './page/profile/Profile'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Admin from './page/admin/Admin';
import HomePage from './page/Homepage/HomePage';
import BrandPanel from './page/BrandPanel/BrandPanel';
import ComparisonPage from './page/Comparison/ComparisonPage';
import SignUp from './page/Sign_up/SignUp';
import EmailVerification from './page/Email Verification/EmailVerification';
import Login from './page/login/Login';
import BrandSignUp from './page/brand_sign_up/BrandSignUp';
import BrandLogin from './page/brand_log_in/BrandLogin';
import { AdminLogin } from './page/admin_login/AdminLogin';
import SearchBrand from './page/search/SearchBrand';
import PhoneVerification from './page/phone_verification_page/PhoneVerification';
import Error404Page from './page/error_404_page/Error404Page';
import EmailVerificationPage from './page/email_verification_page/EmailVerificationPage';

import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "./Redux/user slice/userSlice";

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    
    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("accessToken")
    if(userId && accessToken){
      axios.get(`http://localhost:4000/v1/auth/login/${userId}`,{
        headers:{
          'authorization' : `bearer ${accessToken}`
        }
      }).then(({data: user}) => {
        dispatch(userActions.setUser(user))
        console.log(user);
      })
    }

  }, [dispatch])

  let user = false;
  return (
    <div className="App" >
    {/* <Profile/> */}
    <BrowserRouter>
    <Header/>
    {/* <BrandComparison/> */}
    {/* <BrandComparisonDetail/> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path = '/admin' component = {Admin} />
        <Route path = '/writereview' component = {WriteReview}/>
        <Route path = '/profile/:userId' component = {Profile}/>
        <Route path = '/brandpanel/:brandId' component = {BrandPanel}/>
        <Route path = '/termsandcondition' component = {TermsAndCondition}/>
        <Route path = '/comparison' component = {ComparisonPage}/>  
        <Route path = '/verify-email/:token' component = {EmailVerification}/>  
        <Route path = '/login' component = {Login}/>
        <Route path = '/brandsignup' component = {BrandSignUp}/>
        <Route path = '/brandlogin' component = {BrandLogin}/>
        <Route path = '/adminlogin' component = {AdminLogin}/>
        <Route path = '/search' component = {SearchBrand}/>
        <Route path = '/phoneverification' component = {PhoneVerification}/>
        <Route path = '/emailverification' component = {EmailVerificationPage}/>
      
      {
        !user ?
        <Route path = '/signup' component = {SignUp}/> 
        : 
        null
      }
      <Route path = '/*' component = {Error404Page}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
