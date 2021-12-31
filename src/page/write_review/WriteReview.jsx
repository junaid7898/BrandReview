import {axios} from "../../axios/axiosInstance";
import {default as Ax} from 'axios'
import React, { useRef, useState, useEffect } from "react";
import ImagePreview from "../../components/image_preview/ImagePreview"
import {getImageDetails} from "../../helpers/getImageDetails";
import { useHistory, useParams } from "react-router";
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import { useDispatch, useSelector } from "react-redux";
import { statusAction } from "../../Redux/statusSlice";
import ReactStars from "react-rating-stars-component";
import {brandAction} from "../../Redux/brandInfoSlice/brandInfoSlice"
import { clientActions } from "../../Redux/clientslice/clientSlice";
import BlueSpiralBackground from '../login/components/BlueSpiralBackground'
import HorizantalDotBackground from '../login/components/HorizantalDotBackground'
import ZigZagBackgroundComponent from '../login/components/ZigZagBackgroundComponent'
import BlueZigZagComponent from '../login/components/BlueZigZagComponent'
const WriteReview = () => {
  const {brandId} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const ref = useRef()
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)

  const [brand, setBrand] = useState(null)
  const [uploadImage, setUploadImage] = useState([]);
  const [imageDetails, setImageDetails] = useState([])
  const [rawImages, setRawImages] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isPublishing, setIsPublishing] = useState(false)
  const [ratings, setRatings] = useState(0)


  const {client} = useSelector(state => state.client)
  const {brands} = useSelector(state => state.brands)

  

  //ANCHOR click outside and hide search bar
  const searchRef = useRef(null)
  useEffect(() => {
    if (showList) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener('keydown', handleEsc)
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleEsc)
    };
  }, [searchRef, showList]);

  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowList(false);
    }
  }

  const handleEsc = (e) => {
    if(e.keyCode === 27){
        setShowList(false)
    }
  }

  useEffect(() => {
    if(brandId && brands.length > 0){
      const selectedBrand = brands.find( item => item.id === brandId)
      document.getElementById("brandInput").value = selectedBrand.name
      setBrand(selectedBrand)
    }
  }, [brandId, brands])

  const fileSelectHandler = async(e) => {
    const images = e.target.files
    if((images.length + uploadImage.length) > 5){
      alert("Only 5 Images Allowed")
      return 0
    }
    let loadedImages = [];
    let imageInfo = [];
    let saveImages = [];
    for(let index = 0; index < images.length ; index++){
      const g = getImageDetails(images[index])
      if( !g ){
        continue
      }
      else{
        imageInfo = [...imageInfo,getImageDetails(images[index])]
        loadedImages = [...loadedImages, URL.createObjectURL(images[index])]
        saveImages = [...saveImages, images[index]]
      }
    }
    setRawImages([...rawImages, saveImages ])
    setImageDetails([...imageDetails, ...imageInfo])
    setUploadImage([...uploadImage, ...loadedImages])
  };
  
  const removeImage = (i) => {

    setUploadImage( uploadImage.filter((img, index) => index !== i) )

  }

  const validationCheck = () => {
    if(client){
      if(client.user){
        if(client.type.includes('user')){
          if(ratings === 0){
            return 'ratings must be greater than zero'
          }
          else if(brand){
            return 'ok'
          }
          else if(!brand){
            setBrand(null)
            return 'please select a valid brand'
          }
        }
      }

      else if(client.brand){
        return 'brand cannot publish reviews...'
      }
      
      
    }
    else{
      return 'must login to publish a review'
    }
  }


  const onPublish = async(e) => {
    
    e.preventDefault()
    const valid = validationCheck()
    if(valid === 'ok'){
      dispatch(statusAction.setNotification({
        message: 'review publishing....',
        type: "loading"
      }))

    setIsPublishing(true)

    const review = {
      brand: {
        details: brand.id,
        averageRating: brand.averageRating,
        totalReviews: brand.reviews.length
      },
      brandName: brand.name,
      brandImage: brand.logo,
      user: client.user.id,
      userName: client.user.name,
      userImage: client.user.profileImage,
      title: title,
      message: message,
      rating: parseFloat(ratings),
    }
    let data;
    const g = await axios.post('/review/', {review, imageDetails},{
      headers:{
        "authorization" : `bearer ${client.tokens.access.token}`,
        "role" : client.type
      }
    })
    .then(({data:gg}) => {
      dispatch(statusAction.setNotification({
        message: 'review published....',
        type: "success"
      }))
      data = {...gg}
      return true
    })
    .catch(err =>{
      dispatch(statusAction.setNotification({
        message: err.response.data.message,
        type: "error"
      }))
      setIsPublishing(false)
      return false
    })
    
    if(!g){
      return 
    }
    dispatch(clientActions.setClient({
      ...client,
      user: data.user
    }))
    dispatch(brandAction.setBrands([
      ...brands.map(brand => {
          if(brand.id === data.brand.id){
            return data.brand
          }
          else{
            return brand
          }
      }),
    ]))


      if(data.imageArray.length < 1){
        history.push("/") 
      }


        
        Ax.all(data.imageArray.map( (_, index) => {
          dispatch(statusAction.setNotification({
            message: 'publishing selected images......',
            type: "loading"
          }))
          axios.put(data.imageArray[index], rawImages[0][index],{
            headers:{
              "Content-Type": imageDetails[index].fileType
            }
          })
          .then( (_) => {
            dispatch(statusAction.setNotification({ 
              message: 'images published',
              type: "success"
            }))
            setIsPublishing(false)
            
            history.push("/")  
          })
          .catch(err => {
            console.log('image upload======================', err)
            dispatch(statusAction.setNotification({
              message: "Image Upload Failed",
              type: "error"
            }))
            setIsPublishing(false)
          })
        }))
           
  }
  else{
    dispatch(statusAction.setNotification({
      message: valid,
      type: "error"
    }))
  } 

  }

  const handleSearch = (e) => {
    if (e.trimStart() === "") {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      brands.filter((item) => {
        if (
          item.name.toLowerCase().includes(e.trimStart().toLowerCase())
        ) {
          return item;
        }
        return null
      })
    );
  };

  const handleBrandChange = (e) => {
    handleSearch(e.target.value)
    setBrand(null)
    // setShowList(true)
  }

  return (
    <div className="review-container">
      <div className = 'review-container__blue-spiral'>
        <BlueSpiralBackground/>
      </div>
      <div className = 'review-container__zigzag'>
        <ZigZagBackgroundComponent/>
      </div>
      <div className = 'review-container__zigzag2'>
        <BlueZigZagComponent/>
      </div>
      <div className = 'review-container__dot'>
        <HorizantalDotBackground/>
      </div>
      <div className = 'review-container__zigzag3'>
        <ZigZagBackgroundComponent/>
      </div>
      <section className="review">
        <img className="review__img" src="/assets/review_img.png" alt = 'user' />
        <form ref = {ref} className="review__content" onSubmit = {(e) => {
          onPublish(e)
        }} >
          <div className="review__content__tboxes">
          <div className="review__content__tboxes1" ref = {searchRef}>
            <input
                autoComplete="off"
                type="text"
                placeholder="Markayı Seçin"
                className="review__content__tboxes1__input"
                id="brandInput"
                onFocus = {() => {
                  setShowList(true)}}
                onChange = {(e) => handleBrandChange(e)}
                required
              />
              {
                showList ?
                (
                  <div className='review__content__tboxes1__search-list__list'>
                  {
                    searchResults.map((item) => {
                      return(
                          <div className = 'review__content__tboxes1__search-list__list__item' onClick = {() => {
                              setBrand(item)
                              setShowList(!showList)
                              document.getElementById("brandInput").value = item.name
                              // setSelectedBrand(item.name)
                          }}>
                              <img src = {item.logo} alt={`brand ${item.name} logo`}/>
                              <h3>{item.name}</h3>
                          </div>
                      )
                    })
                  }
                  </div>
                )
                :
                (
                  null
                )
              }
          </div>
            <input
              type="text"
              placeholder="Konu"
              className="review__content__textbox"
              onChange = {(e) => {setTitle(e.target.value)}}
              required
            />

            <div className = 'review__star__container'>
              <div className="review__star__container__stars">
                <div className="review__star__container__stars__selector">
                  <ReactStars
                    count = {5}
                    onChange = {setRatings}
                    size = {40}  
                    isHalf = {true}
                    activeColor="#357BCE"
                  />
                </div>
              </div>
            </div>

            <textarea
              placeholder="Yorumunuzu Yazınız"
              className="review__content__textarea"
              rows={10}
              onChange = {e => {setMessage(e.target.value)}}
              required
            />
          </div>
          <div className="review__content__upload">
          {
              uploadImage.length > 0 ? 
            (
              uploadImage.map( (img, index) => 
                <div key={index} className="review__content__previewImg">
                  <ImagePreview image={img} index={index} removeImage = {removeImage} />
                </div>
              )
            )
            :
            (
              null
            )
          }
          </div>
          

          <div className="review__content__buttons">
            <div className="review__content__uploadButton">
              <label htmlFor="uploadMedia">Görsel yada Video Yükle</label>
              <input
                type="file"
                name="file"
                multiple = {true}
                accept="image/*"
                id="uploadMedia"
                onChange={fileSelectHandler}
                onClick = { (e) => {e.target.value = null}}
              />
            </div>
            <button type = 'submit' className="review__content__publishButton" >
              Paylaş
              {
                isPublishing &&   
                <LoadingIndicator/>
              }
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WriteReview;
