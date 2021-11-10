import React, { useEffect, useState, useRef } from 'react'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import BrandComparisonDetail from '../../components/brand_comparison_detail/BrandComparisonDetail'
import KiaLogo from '../../assests/images/kia_logo.png';
import { useLocation, useParams } from 'react-router';
import { axios } from '../../axios/axiosInstance';
import TopBrands from "../../components/top-brands/TopBrands"
const ComparisonPage = () => {
    useEffect(() => {
        window.scrollTo(0,0)
  }, [useLocation().pathname])

    const {brand1Id} = useParams()
    const {brand2Id} = useParams()
    const [testBrand, setTestBrand] = useState(null);
    const [testBrand1, setTestBrand1] = useState(null);
    const [brand1ReviewCount, setBrand1ReviewCount] = useState(null)
    const [brand2ReviewCount, setBrand2ReviewCount] = useState(null)

    const [reviewCount1, setReviewCount1] = useState(null)
    const [reviewCount2, setReviewCount2] = useState(null)

    const [thankedCount1, setThankedCount1] = useState(null)
    const [thankedCount2, setThankedCount2] = useState(null)

    const [solvedCount1, setSolvedCount1] = useState(null)
    const [solvedCount2, setSolvedCount2] = useState(null)

    const [satisfactionRate1, setSatisfactionRate1] = useState(null)
    const [satisfactionRate2, setSatisfactionRate2] = useState(null)

    const [averageRating1, setAverageRating1] = useState(null)
    const [averageRating2, setAverageRating2] = useState(null)

    useEffect(() => {
        if(brand1Id && brand1Id){
            axios.post("/brand/compare",{
                brand1: brand1Id,
                brand2: brand2Id
            })
            .then(({data})=>{

                let thankCount11 = 0;
                let thankCount22 = 0;

                let solvedCount11 = 0;
                let solvedCount22 = 0;

                let averageRating11 = 0;
                let averageRating22 = 0;

                
                data.brand1.reviews.map(item => {

                    if(item.isThanked){
                        thankCount11 = thankCount11 + 1
                    }

                    if(item.isResolved){
                        solvedCount11 = solvedCount11 + 1
                    }
                    averageRating11 = averageRating11 + item.ratingCount
                })

                if(data.brand1.reviews.length === 0){
                    averageRating11 = 1
                }
                else{
                averageRating11 = averageRating11/ data.brand1.reviews.length
                console.log(averageRating11);}


                data.brand2.reviews.map(item => {
                    if(item.isThanked === true){
                        thankCount22 = thankCount22 + 1
                    }
                    if(item.isResolved === true){
                        solvedCount22 = solvedCount22 + 1
                    }
                    averageRating22 = averageRating22 + item.ratingCount
                })

                if(data.brand2.reviews.length === 0){
                    averageRating22 = 1
                }
                else{
                averageRating22 = averageRating22/ data.brand2.reviews.length
                console.log(averageRating22);}
                
                console.log( 'thankCount1:', thankCount11, 'thankCount2:', thankCount22, 'solvedCount1:', solvedCount11, 'solvedCount2', solvedCount22, );
                setTestBrand(data.brand1)
                setTestBrand1(data.brand2)

                setReviewCount1(data.brand1.reviews.length)
                setReviewCount2(data.brand2.reviews.length)


                setThankedCount1(thankCount11)
                setThankedCount2(thankCount22)

                setSolvedCount1( solvedCount11)
                setSolvedCount2( solvedCount22)

                setAverageRating1((averageRating11 ).toFixed(1))
                setAverageRating2((averageRating22).toFixed(1))
                if(solvedCount11 === 0){
                    setSatisfactionRate1(0)
                }
                else{

                    setSatisfactionRate1(((thankCount11/solvedCount11) * 100).toFixed(1))
                }

                if(solvedCount2 === 0){
                    setSatisfactionRate2(0)
                }
                else{
                    setSatisfactionRate2(((thankCount22/solvedCount22) * 100).toFixed(1))
                }
                
            })
        }
    }, [])

    

    const SFR1 = useRef()
    const SFR2 = useRef()
    const SC1 = useRef()
    const SC2 = useRef()
    const OS1 = useRef()
    const OS2 = useRef()
    useEffect(() => {
        if(testBrand && testBrand1){
            if(testBrand.solvedCount > testBrand1.solvedCount){
                SC1.current = true
                SC2.current = false
            }
            else{
                SC1.current = false
                SC2.current = true
            }
            if(testBrand.satisfactionRate > testBrand1.satisfactionRate){
                SFR1.current = true
                SFR2.current = false
            }
            else{
                SFR1.current = false
                SFR2.current = true
            }
            if(testBrand.overAllStatus > testBrand1.overAllStatus){
                OS1.current = true
                OS2.current = false
            }
            else{
                OS1.current = false
                OS2.current = true
            }
            setTestBrand({
                ...testBrand,
                satisfactionRateIsGreater: SFR1.current,
                overAllStatusIsGreater: OS1.current,
                solvedCountIsGreater: SC1.current
            })
            setTestBrand1({
                ...testBrand1,
                satisfactionRateIsGreater: SFR2.current,
                overAllStatusIsGreater: OS2.current,
                solvedCountIsGreater: SC2.current
            })   
        } 
    }, [])   
    
    

    


    return (
        <div className = 'comparison__page'>
            <div className="comparison__page__upper">
                <div className="comparison__page__inputs">
                    <BrandComparison selectedBrand1 = {testBrand && testBrand.name} selectedBrand2 = {testBrand1 &&testBrand1.name}/>
                </div>
                {
                    testBrand && testBrand1 &&
                    <>
                        <div className="comparison__page__block-1">
                            <BrandComparisonDetail  brandDetails = { testBrand } thankCount = {thankedCount1} reviewCount = {reviewCount1} satisfactionRate = {satisfactionRate1} solvedCount = {solvedCount1} averageRating = {averageRating1}/>
                        </div>
                        <div className="comparison__page__block-2">
                            <BrandComparisonDetail  brandDetails = {testBrand1} thankCount = {thankedCount2} reviewCount = {reviewCount2} satisfactionRate = {satisfactionRate2} solvedCount = {solvedCount2} averageRating = {averageRating2}/>  
                        </div>
                    </>
                }     
            </div>
            <div className="comparison__page__lower">
                {
                    // testBrand.category === testBrand1.category ? testBrand.category : 
                    testBrand && testBrand1 &&
                    <div className="comparison__page__topbrands">
                        <h2>{testBrand.category === testBrand1.category ? "Top brands in the same category" : "Top Brands"}</h2>
                        <TopBrands category={null} length={5} rank={false} />    
                    </div>
                }
            </div>
        </div>
    )
}   

export default ComparisonPage
