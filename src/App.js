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
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./Redux/user slice/userSlice";
import PrivateRoute from "./PrivateRoute";
function App() {
  
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
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
        <Route path = '/brand/:id' component = {SearchBrand}/>
        <PrivateRoute 
              exact 
              path="/brandpanel/:brandId" 
              component={BrandPanel} 
              type={true}
              role="brand"
        />
        <Route path = '/brand/comparison' component = {ComparisonPage}/>  
        <PrivateRoute 
              exact 
              path="/admin/login" 
              component={AdminLogin} 
              type={false}
              role="admin"
        />
        <PrivateRoute 
              exact 
              path="admin" 
              component={Admin} 
              type={false}
              role="admin"
        />
        <Route path = '/phoneverification' component = {PhoneVerification}/>
        <Route path = '/emailverification' component = {EmailVerificationPage}/>
        <Route path = '/verify-email/:token' component = {EmailVerification}/>  
        <Route path = '/termsandcondition' component = {TermsAndCondition}/>
      <Route path = '/*' component = {Error404Page}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
