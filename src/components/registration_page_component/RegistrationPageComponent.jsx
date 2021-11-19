import React from "react";
import icon from '../../assests/images/icon 2.png'
import WebsiteLogo from '../../assests/WebsiteLogo'
import {useSelector} from 'react-redux'
const RegistrationPageComponent = () => {
  const {brands} = useSelector(state => state.brands)
  return (
      <div className="registration__form__icons">
        {/* <img src={MainIcon} className="registration__form__icons__main" alt = "svg random"/> */}
        <WebsiteLogo  width="242" height="235" className="registration__form__icons__main"/>      


        <div className = 'registration__form__icons__topleft__div'>
          <img src={ brands.length > 0 ?  brands[3].logo : icon} className="registration__form__icons__topleft" alt = 'brand icon'/>
        </div>

        <div className = 'registration__form__icons__topright__div'>
          <img src={brands.length > 0 ? brands[2].logo : icon } className="registration__form__icons__topright" alt = "svg random"/>
        </div>

        <div className = 'registration__form__icons__bottomleft__div'>  
          <img
            src={brands.length > 0 ? brands[0].logo : icon}
            className="registration__form__icons__bottomleft"
            alt = "svg random"
          />
        </div>

        <div className = 'registration__form__icons__bottomright__div'>
          <img
            src={brands.length > 0 ? brands[1].logo : icon}
            className="registration__form__icons__bottomright"
            alt = "svg random"
          />
        </div>
      </div>
  );
};

export default RegistrationPageComponent;
