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
        if(brandId){
            if(visitorIsBrand){
                axios.get(`http://localhost:4000/v1/brand/page/${brandId}`, {   
                    headers:{
                        "role" : "none",
                        "Authorization" : `bearer ${client.tokens.access.token}`
                    }
                })   
                .then( res =>{
                    setBrandDetails(res.data)
                    console.log('brand setted ');
                })
                .catch( err => {
                    alert(err)
                })
            }
            else{
                console.log('not working');
            }
        }

        // if(client && brandId){

        //     if(brandId === brand.brand.id){
        //         setCurrentBrand(true)
        //         // console.log('matched')
        //     }
        // }
    }, [client, brandId])
    return (
        <div>
        <h1>hello         </h1>
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
        {/* {console.log(brandDetails)}
        {brandDetails === null ? 
        (
            <LoadingIndicator/>
        )
        :
        (
            <div>  
                <h1>hello               </h1>
            <BrandContent item = {brandDetails}/>
            
                 
               { visitorIsBrand ?           
                (
                    <BrandDetail item = {brandDetails}/>      
                )
                :
                (
                    null
                )} */}

            {/* </div>
            
        )
        } */}
            
            
        </div>
    )
}

export default BrandPanel
