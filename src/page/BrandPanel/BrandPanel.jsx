import React, {useState, useEffect} from 'react'
import BrandContent from './components/BrandContent'
import BrandDetail from './components/BrandDetail'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'

const BrandPanel = () => {

    const {client} = useSelector(state => state.client)

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

        if(client && brandId){

            if(brandId === client.brand.id){
                setCurrentBrand(true)
                // console.log('matched')
            }
        }
    }, [client, brandId])
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
