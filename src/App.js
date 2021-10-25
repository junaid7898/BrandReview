import "./sass/main.scss"
import TermsAndCondition from './page/terms_and_condition/TermsAndCondition';
import WriteReview from './page/write_review/WriteReview';
import Profile from './page/profile/Profile'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
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

import { useEffect } from 'react';
import axios from "axios";
import { axios as axiosInstance } from "./axios/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clientActions } from "./Redux/clientslice/clientSlice";
import PrivateRoute from "./PrivateRoute";
import { statusAction } from "./Redux/statusSlice";
import { brandAction } from "./Redux/brandInfoSlice/brandInfoSlice";
function App() {
  
  const dispatch = useDispatch()
  const {client} = useSelector(state => state.client)


  useEffect(() => {
    axiosInstance.get("brand/getAllBrands")
    .then(({data}) => {
      dispatch(brandAction.setBrands(data))
    })
  }, [])



  useEffect(() => {
    
    const type = localStorage.getItem("clientType")
    if(type === "user"){
      const userId = localStorage.getItem("userId")
      const accessToken = localStorage.getItem("accessToken")
      if(userId && accessToken){
        dispatch(statusAction.setAttemptingLogin(true))
        axios.get(`http://localhost:4000/v1/auth/user/login/${userId}`,{
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
        axios.get(`http://localhost:4000/v1/auth/brand/login/${brandId}`,{
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
  return (
    <div className="App" >
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <PrivateRoute 
              exact 
              path="/user/login" 
              component={Login} 
              type={true}
              role="user"
        />
        <PrivateRoute 
              exact 
              path="/user/signup" 
              component={SignUp} 
              type={true}
              role="user"
        />
        <PrivateRoute 
              exact 
              path="/user/:userId" 
              component={Profile}
              type={false}
              role="user"
        />
        <PrivateRoute 
              exact 
              path="/review" 
              component={WriteReview} 
              type={true}
              role="user"
        />
        <PrivateRoute 
              exact 
              path="/brand/login" 
              component={BrandLogin} 
              type={true}
              role="brand"
        />
        <PrivateRoute 
              exact 
              path="/brand/signup" 
              component={BrandSignUp} 
              type={true}
              role="brand"
        />
        
        <PrivateRoute 
              exact 
              path="/brand/panel/:brandId" 
              component={BrandPanel} 
              type={true}
              role="brand"
        />
        <Route path = '/brand/comparison/:brand1Id/:brand2Id' component = {ComparisonPage}/>  
        <Route path = '/brand/:brandId' component = {SearchBrand} />
        <PrivateRoute 
              exact 
              path="/admin/login" 
              component={AdminLogin} 
              type={false}
              role="admin"
        />
        <PrivateRoute 
              exact 
              path="/admin" 
              component={Admin} 
              type={false}
              role="admin"
        />
        <Route path = '/phoneverification' component = {PhoneVerification}/>
        <Route path = '/verify-email/:token' component = {EmailVerificationPage}/>  
        <Route path = '/termsandcondition' component = {TermsAndCondition}/>
      <Route path = '/*' component = {Error404Page}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
