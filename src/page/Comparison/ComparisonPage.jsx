import React, { useEffect, useState, useRef } from 'react'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import BrandComparisonDetail from '../../components/brand_comparison_detail/BrandComparisonDetail'
import KiaLogo from '../../assests/images/kia_logo.png';
const ComparisonPage = () => {
    const [testBrand, setTestBrand] = useState(
        {
          brandLogo: KiaLogo,
          brandDetail:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
          reviewCount: 19854,
          solvedCount: 8765,
          satisfactionRate: 95,
          overAllStatus: 54,
        },
      );

      const [testBrand1, setTestBrand1] = useState(
        {
          brandLogo: KiaLogo,
          brandDetail:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
          reviewCount: 1854,
          solvedCount: 876,
          satisfactionRate: 89,
          overAllStatus: 78,
        },
      );

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
    }, [testBrand, testBrand1])   
    
    

    


    return (
        <div className = 'comparison__page'>
            <div className="comparison__page__inputs">
                <BrandComparison/>
            </div>
            <div className="comparison__page__block-1">
                <BrandComparisonDetail brandDetails = { testBrand } />
            </div>
            <div className="comparison__page__block-2">
                <BrandComparisonDetail brandDetails = {testBrand1}/>  
            </div>     
        </div>
    )
}   

export default ComparisonPage
