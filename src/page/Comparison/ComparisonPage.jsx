import React, { useEffect, useState, useRef } from "react";
import BrandComparison from "../../components/brand_comparison/BrandComparison";
import BrandComparisonDetail from "../../components/brand_comparison_detail/BrandComparisonDetail";
import { useLocation, useParams } from "react-router";
import { axios } from "../../axios/axiosInstance";
import TopBrands from "../../components/top-brands/TopBrands";
import VerticalDotBackGround from '../login/components/VerticalDotBackGround'
import HorizantalDotBackground from '../login/components/HorizantalDotBackground'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
const ComparisonPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation().pathname]);

  const { brandSlug1 } = useParams();
  const { brandSlug2 } = useParams();
  const [testBrand, setTestBrand] = useState(null);
  const [testBrand1, setTestBrand1] = useState(null);
  const [brand1ReviewCount, setBrand1ReviewCount] = useState(null);
  const [brand2ReviewCount, setBrand2ReviewCount] = useState(null);

  const [reviewCount1, setReviewCount1] = useState(null);
  const [reviewCount2, setReviewCount2] = useState(null);

  let reviewCount1IsGreater = false;
  let reviewCount2IsGreater = false;

  let thankedCount1IsGreater = false;
  let thankedCount2IsGreater = false;

  let solvedCount1IsGreater = false;
  let solvedCount2IsGreater = false;

  let satisfactionRate1IsGreater = false;
  let satisfactionRate2IsGreater = false;

  let averageRating1IsGreater = false;
  let averageRating2IsGreater = false;

  const [thankedCount1, setThankedCount1] = useState(null);
  const [thankedCount2, setThankedCount2] = useState(null);

  const [solvedCount1, setSolvedCount1] = useState(null);
  const [solvedCount2, setSolvedCount2] = useState(null);

  const [satisfactionRate1, setSatisfactionRate1] = useState(null);
  const [satisfactionRate2, setSatisfactionRate2] = useState(null);

  const [averageRating1, setAverageRating1] = useState(null);
  const [averageRating2, setAverageRating2] = useState(null);

  useEffect(() => {
    if (brandSlug1 && brandSlug2) {
      axios
        .post("/brand/compare", {
          brand1: brandSlug1,
          brand2: brandSlug2,
        })
        .then(({ data }) => {
          let thankCount11 = data.brand1.thankedCount;
          let thankCount22 = data.brand2.thankedCount;

          let solvedCount11 = data.brand1.resolveCount;
          let solvedCount22 = data.brand2.resolveCount;

          let averageRating11 = data.brand1.averageRating;
          let averageRating22 = data.brand2.averageRating;

          let satisfactionRate11 = null;
          let satisfactionRate22 = null;

          console.log(data);

          if (data.brand1.reviews.length === 0) {
            satisfactionRate11 = 0;
          } else {
            if (data.brand1.resolveCount < 1) {
              satisfactionRate11 = 0;
            } else {
              satisfactionRate11 = (
                (data.brand1.resolveCount / data.brand1.reviews.length) *
                100
              ).toFixed(2);
            }
          }
          if (data.brand2.reviews.length === 0) {
            satisfactionRate22 = 0;
          } else {
            if (data.brand2.resolveCount < 1) {
              satisfactionRate22 = 0;
            } else {
              satisfactionRate22 = (
                (data.brand2.resolveCount / data.brand2.reviews.length) *
                100
              ).toFixed(2);
            }
          }

          console.log(
            "thankCount1:",
            thankCount11,
            "thankCount2:",
            thankCount22,
            "solvedCount1:",
            solvedCount11,
            "solvedCount2",
            solvedCount22
          );
          setTestBrand(data.brand1);
          setTestBrand1(data.brand2);

          setReviewCount1(data.brand1.reviews.length);
          setReviewCount2(data.brand2.reviews.length);

          if (data.brand1.reviews.length > data.brand2.reviews.length) {
            reviewCount1IsGreater = true;
          } else {
            reviewCount2IsGreater = true;
          }

          if (thankCount11 > thankCount22) {
            thankedCount1IsGreater = true;
          } else {
            thankedCount2IsGreater = true;
          }

          if (solvedCount11 > solvedCount22) {
            solvedCount1IsGreater = true;
          } else {
            solvedCount2IsGreater = true;
          }
          if (averageRating11 > averageRating22) {
            averageRating1IsGreater = true;
          } else {
            averageRating2IsGreater = true;
          }

          if (satisfactionRate11 > satisfactionRate22) {
            satisfactionRate1IsGreater = true;
          } else {
            satisfactionRate2IsGreater = true;
          }

          setThankedCount1(thankCount11);
          setThankedCount2(thankCount22);

          setSolvedCount1(solvedCount11);
          setSolvedCount2(solvedCount22);

          setAverageRating1(averageRating11.toFixed(1));
          setAverageRating2(averageRating22.toFixed(1));

          setSatisfactionRate1(satisfactionRate11);
          setSatisfactionRate2(satisfactionRate22);

        });
    }
  }, [brandSlug1, brandSlug2]);

  const isSolvedCountGreater = useRef();
  const isThankedCountGreater = useRef();
  const isAverageRatingGreater = useRef();
  const isTotalRatingGreater = useRef();
  const isSatisfactionRateGreater = useRef();
//   useEffect(() => {
//       console.log('testBrand>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.', testBrand, testBrand1);
//     if (testBrand && testBrand1 && solvedCount2 && solvedCount1) {
//       if (solvedCount1 > solvedCount2) {
//         SC1.current = true;
//         SC2.current = false;
//       } else {
//         SC1.current = false;
//         SC2.current = true;
//       }
//       if (testBrand.satisfactionRate > testBrand1.satisfactionRate) {
//         SFR1.current = true;
//         SFR2.current = false;
//       } else {
//         SFR1.current = false;
//         SFR2.current = true;
//       }
//       if (testBrand.overAllStatus > testBrand1.overAllStatus) {
//         OS1.current = true;
//         OS2.current = false;
//       } else {
//         OS1.current = false;
//         OS2.current = true;
//       }
//       setTestBrand({
//         ...testBrand,
//         satisfactionRateIsGreater: SFR1.current,
//         overAllStatusIsGreater: OS1.current,
//         solvedCountIsGreater: SC1.current,
//       });
//       setTestBrand1({
//         ...testBrand1,
//         satisfactionRateIsGreater: SFR2.current,
//         overAllStatusIsGreater: OS2.current,
//         solvedCountIsGreater: SC2.current,
//       });
//     }
//   }, []);

  return (
    <div className="comparison__page" style = {{position: 'relative'}}>
       <div className = 'comparison__background__vertical-dot' style = {{position: 'absolute', top: 70, left: 30}}>
           <VerticalDotBackGround/>
        </div>
        <div className = 'comparison__background__horizantal-dot' style = {{position: 'absolute', right: 0, zIndex: -1}}>
          <HorizantalDotBackground/>
        </div>
        <div className = 'comparison__background__blue-zigzag' style = {{position: 'absolute', left: '25%',zIndex: -1}}>
          <BlueZigZagComponent/>
        </div>
        <div className = 'comparison__background__blue-spiral' style = {{position: 'absolute', top: '40%', zIndex: -1, left: '25%'}}>
          <BlueSpiralBackground/>
        </div>
      <div className="comparison__page__upper" >
        <div className="comparison__page__inputs">
          <BrandComparison
            selectedBrand1={testBrand && testBrand.name}
            selectedBrand2={testBrand1 && testBrand1.name}
          />
        </div>
        {testBrand && testBrand1 && (
          <>
            <div className="comparison__page__block-1" >
              <BrandComparisonDetail
                brandDetails={testBrand}
                thankCount={thankedCount1}
                reviewCount={reviewCount1}
                satisfactionRate={satisfactionRate1}
                solvedCount={solvedCount1}
                averageRating={averageRating1}
                isReviewCountGreater = { reviewCount1 > reviewCount2 ? true : false }
                isSolvedCountGreater = { solvedCount1 > solvedCount2 ? true : false }
                isThankedCountGreater = { thankedCount1 > thankedCount2 ? true : false }
                isAverageRatingGreater = { averageRating1 > averageRating2 ? true : false }
                isSatisfactionRateGreater = { satisfactionRate1 > satisfactionRate2 ? true : false }
              />
              
            </div>
            <div className="comparison__page__block-2">
              <BrandComparisonDetail
                brandDetails={testBrand1}
                thankCount={thankedCount2}
                reviewCount={reviewCount2}
                satisfactionRate={satisfactionRate2}
                solvedCount={solvedCount2}
                averageRating={averageRating2}
                isReviewCountGreater = { reviewCount2 > reviewCount1 ? true : false }
                isSolvedCountGreater = { solvedCount2 > solvedCount1 ? true : false }
                isThankedCountGreater = { thankedCount2 > thankedCount1 ? true : false }
                isAverageRatingGreater = { averageRating2 > averageRating1 ? true : false }
                isSatisfactionRateGreater = { satisfactionRate2 > satisfactionRate1 ? true : false }
              />
            </div>
          </>
        )}

      </div>
      <div className="comparison__page__lower">
        {
          // testBrand.category === testBrand1.category ? testBrand.category :
          testBrand && testBrand1 && (
            <div className="comparison__page__topbrands">
              <h2>
                {testBrand.category === testBrand1.category
                  ? "Top brands in the same category"
                  : "Top Brands"}
              </h2>
              <TopBrands category={testBrand.category === testBrand1.category ? testBrand1.category : null} length={5} rank={false} />
            </div>
          )
        }
      </div>
       
    </div>
  );
};

export default ComparisonPage;
