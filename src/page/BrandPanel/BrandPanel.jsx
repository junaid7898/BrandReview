import React, {useState, useEffect} from 'react'
import BrandContent from './components/BrandContent'
import BrandDetail from './components/BrandDetail'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'

const BrandPanel = () => {

    const {client} = useSelector(state => state.client)

    const [brandDetails, setBrandDetails] = useState(null)
    const [isCurrentBrand, setIsCurrentBrand] = useState(false)
    const { brandId } = useParams()   

    const [visitorIsBrand, setVisitorIsBrand] = useState(false)

    useEffect(() => {
        if(client && brandId && client.brand.id === brandId){
            setVisitorIsBrand(true)
        }
        else{
            setVisitorIsBrand(false)
        }
    }, [client, brandId])


    useEffect(() => {
        if(brandId && client){
            axios.get(`http://localhost:4000/v1/brand/page/${brandId}`, {   
                headers:{
                    "role" : "brand",
                    "Authorization" : `bearer ${client.tokens.access.token}`
                }
            })   
            .then( res =>{
                setBrandDetails(res.data)
                console.log(res.data);
            })
            .catch( err => {
                alert(err)
            })
        }
    }, [client, brandId])
    return (
        <div>
        {
            brandDetails ? 
            (
                <>
                    <BrandContent item = {brandDetails}/>
                    <BrandDetail item = {brandDetails}/>
                </>   
            )
            :
            (
                <LoadingIndicator/>
            )
        }         
        </div>
    )
}

export default BrandPanel
