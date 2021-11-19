import React, { useRef, useState } from "react";
import Star from '../../../assests/Star'
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";
import { axios } from "../../../axios/axiosInstance";
import UploadImage from "../../../assests/UploadImage";
import { uploadPhoto } from "../../../helpers/uploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { brandAction } from "../../../Redux/brandInfoSlice/brandInfoSlice";
const BrandContent = ({item, setItem}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true)

  const [isImageUploading, setIsImageUploading] = useState(false)

  const fileRef = useRef()

  const {client} = useSelector(state => state.client)
  const {brands} = useSelector(state => state.brands)


  const dispatch = useDispatch()

  const handleImageSelect = async (e) => {
    try{
      setIsImageUploading(true)
      const { url: imageUrl } = await uploadPhoto(item , e.target.files[0] , fileRef.current)
      const newBrand = {
        ...item,
        logo: imageUrl
      }
      axios.patch(`brand/${item.id}`,newBrand,{
        headers:{
          "authorization" : `bearer ${client.tokens.access.token}`
        }
      })
      .then( (_) =>{
        dispatch(brandAction.setBrands([...brands.map(brand =>{
          if(brand.id === item.id){
              brand = newBrand
          }
          return brand
        })]))
        setItem(newBrand)
        setIsImageUploading(false)
      } )
      
    }
    catch(err){
      setIsImageUploading(false)
      alert(err)
    }
  }


  return (
    <section >
      <div className = 'brand' >
          <div className="brand__logo">
          {
            isImageUploading ?
              <LoadingIndicator/>
              :
              <img onLoad={() => setImageIsLoading(false)} src = {item.logo} alt={`brand ${item.name} logo`}/>
          }
              {
                imageIsLoading &&
                <LoadingIndicator />
              }
              
              <label htmlFor = 'imageUpload'><UploadImage className = 'brand__logo__edit-icon'/></label>
              <input
                id = 'imageUpload'
                ref = {fileRef}
                type = 'file'
                name = 'upload image'
                onChange = {e => handleImageSelect(e)}
                style = {{display: 'none'}}
              />

          </div>
          <div className="brand__info">
              <div className = 'brand__info__container'>
                <h1 className="brand__info__container__name"> {item.name} </h1>
                {
                  item.premiered ? 
                    <div className = 'brand__info__container__tag'>
                      Premiered
                    </div>
                    :
                    null
                }
              </div>
              <p className="brand__info__para">{item.about}</p>
          </div>    
          <div className="brand__progress">
              <div className="brand__progress__reviews">
                  <p className='brand__progress__reviews__count'>
                    {item.reviews.length}
                  </p>
                  <p className="brand__progress__reviews__text">Reviews</p>
              </div>
              <div className = 'brand__progress__ratings'>
              <span>
                {
                  Array(Math.round(item.averageRating < 1 ? 1 : item.averageRating )).fill().map((_)=>(
                      <Star starGradient1 = "#FFDC64" starGradient2 = "#FFC850" starLines = "#FFF082" width={39} height={39}/>
                  ))
                }
                </span>
                <p className="brand__progress__reviews__reviewCount">{(item.averageRating).toFixed(1)} Ratings</p>
              </div>
          </div>
      </div> 
    </section>
  );
};

export default BrandContent;
