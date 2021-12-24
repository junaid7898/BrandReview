import React from "react";
import { Link } from "react-router-dom";
import {AiFillFacebook, AiFillTwitterSquare, AiFillInstagram} from 'react-icons/ai'
import WebisteLogo from "../../assests/WebsiteLogo"
const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__content">  
        <div className="footer__content__intro">
          <div className="footer__content__intro__flex">
            <WebisteLogo />
            <Link to = '/' className = 'footer__rights__link'><h4>SikayetBox</h4></Link>
          </div>

          <p>
          Şikayetbox 2005 yılında kurulmuştur. Şikayetbox siz değerli kullanıcıları doğrudan marka temsilcileri ile buluşturan, güvenilir bir internet ortamı yaratarak iki tarafın da haklarına koruyan bir platformdur.
          </p>
        </div>
        <div className="footer__content__links">   
          <Link to = '/termsandcondition' className = 'footer__content__links__title'><h4>Kural ve Şartlar</h4></Link>
          <div className = 'footer__content__social__links'>

            <div className="footer__content__social__links-facebook">
              <a href = 'https://www.facebook.com/'><AiFillFacebook className="footer__content__social__links-facebook__icon"/></a>
            </div>

            <div className="footer__content__social__links-twitter">
              <a href = 'https://www.google.com/'><AiFillTwitterSquare className="footer__content__social__links-twitter__icon"/></a>
            </div>

            <div className="footer__content__social__links-instagram">   
              <a href = 'https://www.google.com/'><AiFillInstagram className="footer__content__social__links-instagram__icon"/></a>
            </div>
            
          </div>

        </div>
      </div>
      <div className="footer__rights">
        <Link to = '/' className = 'footer__rights__link'><h4>SikayetBox</h4></Link>
        <p>© 2021SikayetBox, Tüm hakları saklıdır </p>
        <p> Dogru markayı bulmanın merkezi</p>
      </div>
    </section>
  );
};

export default Footer;
