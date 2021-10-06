import React, {useState, useEffect} from 'react'
import BrandContent from './components/BrandContent'
import BrandDetail from './components/BrandDetail'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'

const BrandPanel = () => {

    const {brand} = useSelector(state => state.brand)

    const [brandDetails, setBrandDetails] = useState(null)

    const { brandId } = useParams()

    const [currentBrand, setCurrentBrand] = useState(false)

    useEffect(() => {

        if(brandId){
            axios.get(`http://localhost:4000/v1/brand/${brandId}`)
            .then( res =>{
                setBrandDetails(res.data)
            })
            .catch( err => {
                alert(err)
            })
        }

        if(brand && brandId){

            if(brandId === brand.brand.id){
                setCurrentBrand(true)
                // console.log('matched')
            }
        }
    }, [])
    return (
        <div>
        {brandDetails === null ? 
        (
            null
        )
        :
        (
            <div>
            <BrandContent item = {brandDetails}/>
            
            
               { currentBrand ?
                (
                    <BrandDetail/>
                )
                :
                (
                    null
                )}
            </div>
            
        )
        }
            
            
        </div>
    )
}

export default BrandPanel
