import './App.css';
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
import BrandComparison from './components/brand_comparison/BrandComparison';
import BrandComparisonDetail from './components/brand_comparison_detail/BrandComparisonDetail';
import ComparisonPage from './page/Comparison/ComparisonPage';
import SignUp from './page/Sign_up/SignUp';
import EmailVerification from './page/Email Verification/EmailVerification';
import Login from './page/login/Login';
import BrandSignUp from './page/brand_sign_up/BrandSignUp';
function App() {
  
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
        <Route path = '/brandpanel' component = {BrandPanel}/>
        <Route path = '/termsandcondition' component = {TermsAndCondition}/>
        <Route path = '/comparison' component = {ComparisonPage}/>  
        <Route path = '/verify-email/:token' component = {EmailVerification}/>  
        <Route path = '/login' component = {Login}/>
        <Route path = '/brandsignup' component = {BrandSignUp}/>
      
      {
        !user ?
        <Route path = '/signup' component = {SignUp}/> 
        : 
        null
      }
      <Route path = '/*' >
        <h1>Error 404</h1>
      </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
