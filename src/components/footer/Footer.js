import React from "react";
import logo from "../../assests/icons/header_icon.png";
import './footer.css'

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__content">
          <div className="footer__content__intro">
              <div>
                  <img src={logo} />
                  <h1>Review Website</h1>
              </div>
            
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="footer__content__links">
              <h1>Terms and Conditions</h1>
              <p>linkedIn | facebook | Instagram</p>
          </div>
      </div>
      <div className="footer__rights">
          <h1>Review Website</h1>
          <p>© 2021Reviewwebsite, All rights reserved </p>
          <p> Impressum   Datenschutz   Glossar</p>
      </div>
    </section>
  );
};

export default Footer;
