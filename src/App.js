import logo from './logo.svg';
import './App.css';
import TermsAndCondition from './components/terms_and_condition/TermsAndCondition';
import WriteReview from './components/write_review/WriteReview';
import Profile from './page/profile/Profile'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Admin from './components/admin/Admin';
import HomePage from './page/Homepage/HomePage';
import BrandPanel from './page/BrandPanel/BrandPanel';
function App() {
  return (
    <div className="App" >
    {/* <Profile/> */}
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path = '/terms' component = {Admin} />
        <Route path = '/review' component = {WriteReview}/>
        <Route path = '/profile' component = {Profile}/>
        <Route path = '/brandpanel' component = {BrandPanel}/>
        <Route path = '/termsandcondition' component = {TermsAndCondition}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
