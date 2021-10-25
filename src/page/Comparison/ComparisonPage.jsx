import React, { useEffect, useState, useRef } from 'react'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import BrandComparisonDetail from '../../components/brand_comparison_detail/BrandComparisonDetail'
import KiaLogo from '../../assests/images/kia_logo.png';
import { useParams } from 'react-router';
import { axios } from '../../axios/axiosInstance';
const ComparisonPage = () => {


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

    const [satisfactionRate1, setSatisfactionRate1] = useState(null)
    const [satisfactionRate2, setSatisfactionRate2] = useState(null)

    useEffect(() => {
        if(brand1Id && brand2Id){
            console.log('brand1Name');
            const filters1 = { id: brand1Id }
            const filters2 = {id: brand2Id}
            const options = {limit: 100000}
            // axios.post('/review/query', {filters: filters1, options})
            // .then(({data}) => {
            //     console.log('brand1:----->', data);
            //     let totalCount = 0;

            //     data.results.map(item => {
            //         totalCount = totalCount + item.ratingCount
            //         console.log('rating: ', item.ratingCount, 'totalCount: ', totalCount);
            //     })

            //     console.log('brand1reviewCount: ', totalCount/ data.results.length);
            //     setBrand1ReviewCount(Math.round(totalCount / data.results.length))
            // }).then(
            //     axios.post('review/query', {filters: filters2, options})
            //     .then(({data}) => {
            //         let totalCount = 0;
            //         console.log('brand2:----->', data);
            //         data.results.map(item => {
            //             totalCount = totalCount + item.ratingCount
            //         })

            //         console.log('brand222reviewCount: ', totalCount/ data.results.length);
            //         setBrand1ReviewCount(Math.round(totalCount / data.results.length))
            //     })
            // )

        }
        if(brand1Id && brand1Id){
            axios.post("/brand/compare",{
                brand1: brand1Id,
                brand2: brand2Id
            })
            .then(({data})=>{
                let reviewCount1 = 0;
                let thankCount1 = 0;
                let reviewCount2 = 0;
                let thankCount2 = 0;

                let solvedCount1 = 0;
                let solvedCount2 = 0;
                let satisfactionRate = 0;
                data.brand1.reviews.map(item => {
                    if(item.isThanked === true){
                        thankCount1 = thankCount1 + 1
                    }
                    if(item.isResolved === true){
                        solvedCount1 = solvedCount1 + 1
                    }
                    reviewCount1 = reviewCount1 + item.ratingCount
                })
                let rk1 = 0
                if(data.brand1.reviews.length > 0){

                    rk1 = Math.round(reviewCount1 / data.brand1.reviews.length)
                }
                else {
                    rk1 = 0 + 1
                }
                data.brand2.reviews.map(item => {
                    if(item.isThanked === true){
                        thankCount2 = thankCount2 + 1
                    }
                    if(item.isResolved === true){
                        solvedCount2 = solvedCount2 + 1
                    }
                    reviewCount2 = reviewCount2 + item.ratingCount
                })
                let rk2 = 0
                if(data.brand2.reviews.length > 0){

                    rk2 = Math.round(reviewCount1 / data.brand1.reviews.length)
                }
                else {
                    rk2 = 0 + 1
                }
                console.log('rk1:', rk1, 'rk2:', rk2, 'thankCount1:', thankCount1, 'thankCount2:', thankCount2, 'solvedCount1:', solvedCount1, 'solvedCount2', solvedCount2);
                setTestBrand(data.brand1)
                setTestBrand1(data.brand2)
                setReviewCount1(rk1)
                setReviewCount2(rk2)
                setThankedCount1(thankCount1)
                setThankedCount2(thankCount2)
                setSatisfactionRate1((thankCount1/rk1) * 100)
                setSatisfactionRate2((thankCount2/rk2) * 100)
                
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
            <div className="comparison__page__inputs">
                <BrandComparison/>
            </div>
            {
                testBrand && testBrand1 &&
                <>
                    <div className="comparison__page__block-1">
                        <BrandComparisonDetail brandDetails = { testBrand } thankCount = {thankedCount1} reviewCount = {reviewCount1} satisfactionRate = {satisfactionRate1}/>
                    </div>
                    <div className="comparison__page__block-2">
                        <BrandComparisonDetail brandDetails = {testBrand1} thankCount = {thankedCount2} reviewCount = {reviewCount2} satisfactionRate = {satisfactionRate2}/>  
                    </div>
                </>
            }     
        </div>
    )
}   

export default ComparisonPage
