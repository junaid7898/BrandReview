import React, { useEffect, useState } from 'react'
import BrandComparison from '../../components/brand_comparison/BrandComparison'
import BrandComparisonDetail from '../../components/brand_comparison_detail/BrandComparisonDetail'
import './comparisonPage.scss'
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

    let SFR1 = ''
    let SFR2 = ''
    let SC1 = ''
    let SC2 = ''
    let OS1 = ''
    let OS2 = ''
    useEffect(() => {
        if(testBrand && testBrand1){
            if(testBrand.solvedCount > testBrand1.solvedCount){
                SC1 = true
                SC2 = false
            }
            else{
                SC1 = false
                SC2 = true
            }
            if(testBrand.satisfactionRate > testBrand1.satisfactionRate){
                SFR1 = true
                SFR2 = false
            }
            else{
                SFR1 = false
                SFR2 = true
            }
            if(testBrand.overAllStatus > testBrand1.overAllStatus){
                OS1 = true
                OS2 = false
            }
            else{
                OS1 = false
                OS2 = true
            }
            setTestBrand({
                ...testBrand,
                satisfactionRateIsGreater: SFR1,
                overAllStatusIsGreater: OS1,
                solvedCountIsGreater: SC1
            })
            setTestBrand1({
                ...testBrand1,
                satisfactionRateIsGreater: SFR2,
                overAllStatusIsGreater: OS2,
                solvedCountIsGreater: SC2
            })   
        } 
    }, [])   
    
    

    


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
