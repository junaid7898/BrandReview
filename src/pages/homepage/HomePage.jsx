import React from "react";
import Contact from "./components/Contact/Contact";
import './homepage.scss'

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage__contact-container">
        <Contact />
      </div>
    </div>
  );
}

export default HomePage;
