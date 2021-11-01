import React from "react";
import logo from "../../assests/icons/header_icon1.png";
import { Link } from "react-router-dom";
import {AiFillFacebook, AiFillTwitterSquare, AiFillInstagram} from 'react-icons/ai'
import WebisteLogo from "../../assests/WebsiteLogo"
const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__content">  
        <div className="footer__content__intro">
          <div>
            <WebisteLogo />
            <Link to = '/' className = 'footer__rights__link'><h4>SikayetBox</h4></Link>
          </div>

          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="footer__content__links">
          <Link to = '/termsandcondition' className = 'footer__content__links__title'><h4>Terms and Conditions</h4></Link>
          <div className = 'footer__content__social__links'>

            <div className="footer__content__social__links-facebook">
              <a><AiFillFacebook className="footer__content__social__links-facebook__icon"/></a>
            </div>

            <div className="footer__content__social__links-twitter">
              <a><AiFillTwitterSquare className="footer__content__social__links-twitter__icon"/></a>
            </div>

            <div className="footer__content__social__links-instagram">
              <a><AiFillInstagram className="footer__content__social__links-instagram__icon"/></a>
            </div>
            
          </div>

        </div>
      </div>
      <div className="footer__rights">
        <Link to = '/' className = 'footer__rights__link'><h4>SikayetBox</h4></Link>
        <p>© 2021SikayetBox, All rights reserved </p>
        <p> Impressum Datenschutz Glossar</p>
      </div>
    </section>
  );
};

export default Footer;
