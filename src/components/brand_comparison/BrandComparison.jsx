import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BrandIcon from "../../assests/images/brand_icon.png";
import BrandSearchList from "./components/BrandSearchList";

const BrandComparison = () => {
  const [testBrands] = useState([
    { brandName: "KIA", brandIcon: BrandIcon },
    { brandName: "Totyota", brandIcon: BrandIcon },
    { brandName: "Apple", brandIcon: BrandIcon },
    { brandName: "Android", brandIcon: BrandIcon },
    { brandName: "Lambourgini", brandIcon: BrandIcon },
    { brandName: "Mosorati", brandIcon: BrandIcon },
    { brandName: "Polo", brandIcon: BrandIcon },
    { brandName: "Dawlance", brandIcon: BrandIcon },
    { brandName: "Gucci", brandIcon: BrandIcon },
    { brandName: "Beats", brandIcon: BrandIcon },
    { brandName: "Rolax", brandIcon: BrandIcon },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [brand1, setBrand1] = useState(null);
  const [brand2, setBrand2] = useState(null);

  const [showResult1, setShowResult1] = useState(false);
  const [showResult2, setShowResult2] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdown2, setShowDropdown2] = useState(false)

  const handleSearch = (e) => {
    if (e.trimStart() === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      testBrands.filter((item) => {
        if (
          item.brandName.toLowerCase().includes(e.trimStart().toLowerCase())
        ) {
          return item;
        }
        return null
      })
    );
  };



  const searchRef = useRef(null);
  const searchRef2 = useRef(null)
  useEffect(() => {
    if (showResult1 && showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener('keydown', handleEsc)
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleEsc)
    };
  }, [searchRef, showResult1, showDropdown]);


  useEffect(() => {
    if (showResult2 && showDropdown2) {
      document.addEventListener("mousedown", handleClickOutside2);
      document.addEventListener('keydown', handleEsc2)
    } else {
      document.removeEventListener("mousedown", handleClickOutside2);
      document.removeEventListener('keydown', handleEsc2)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
      document.removeEventListener('keydown', handleEsc2)
    };
  }, [searchRef2, showResult2, showDropdown2]);



    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    function handleClickOutside2(event) {
        if (searchRef2.current && !searchRef2.current.contains(event.target)) {
          setShowDropdown2(false);
        }
      }

    const handleEsc = (e) => {
        if(e.keyCode === 27){
            setShowDropdown(false)
        }
    }

    const handleEsc2 = (e) => {
        if(e.keyCode === 27){
            setShowDropdown2(false)
        }
    }
  

  return (
    <section className="comparison">
      <div ref={searchRef} className="comparison__first-brand">
        <input
          type="text"
          placeholder="select a brand"
          value={brand1}
          onClick = { () => setShowDropdown(!showDropdown)}
          onChange={(e) => {
            setShowResult2(false);
            setBrand1(e.target.value);
            handleSearch(e.target.value);
            setShowResult1(true);
            setShowDropdown(true)
          }}
        />
        {showResult1 && showDropdown ? (
          <>
            <BrandSearchList
              mainDiv="comparison__list"
              itemDiv="comparison__list__item"
              data={searchResults}
              setValue={setBrand1}
              showlist={setShowResult1}
            />
          </>
        ) : null}
      </div>

      <h1>With</h1>

      <div ref = {searchRef2} className="comparison__second-brand">
        <input
          type="text"
          placeholder="select a brand"
          value={brand2} 
          onChange={(e) => {
            setBrand2(e.target.value);
            handleSearch(e.target.value);
            setShowResult2(true);
            setShowResult1(false);
            setShowDropdown2(true)
          }}
        />
        {showResult2 && showDropdown2 ? (
          <>
            <BrandSearchList
              mainDiv="comparison__list"
              itemDiv="comparison__list__item"
              data={searchResults}
              setValue={setBrand2}
              showlist={setShowResult2}
            />
          </>
        ) : null}
      </div>
      <Link to = '/' className="comparison__button">
          <p>Compare</p>
      </Link>
      
    </section>
  );
};

export default BrandComparison;
