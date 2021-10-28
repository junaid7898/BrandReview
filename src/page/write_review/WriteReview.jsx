import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import ImagePreview from "../../components/image_preview/ImagePreview"
import {getImageDetails} from "../../helpers/getImageDetails";
import { useHistory } from "react-router";
import Star from "../../assests/Star";
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import { useDispatch, useSelector } from "react-redux";
import { statusAction } from "../../Redux/statusSlice";
import ReactStars from "react-rating-stars-component";

import { clientActions } from "../../Redux/clientslice/clientSlice";
const WriteReview = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const ref = useRef()
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)

  const [brand, setBrand] = useState(null)
  const [brandId, setBrandId] = useState(null)
  const [uploadImage, setUploadImage] = useState([]);
  const [imageDetails, setImageDetails] = useState([])
  const [rawImages, setRawImages] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isPublishing, setIsPublishing] = useState(false)
  const [ratings, setRatings] = useState(0)


  const {client} = useSelector(state => state.client)
  const {brands} = useSelector(state => state.brands)
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  

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

    console.log(title, message);
    const review = {
      brand: brandId,
      user: client.user.id,
      title: title,
      message: message,
      ratingCount: ratings,
    }

    let data;
    const g = await axios.post('http://localhost:4000/v1/review/', {review, imageDetails},{
      headers:{
        "authorization" : `bearer ${client.tokens.access.token}`,
        "role" : Object.keys(client)[0]
      }
    })
    .then(({data:gg}) => {
      dispatch(statusAction.setNotification({
        message: 'review published....',
        type: "success"
      }))
      console.log(gg)
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


      if(data.imageArray.length < 1){
        history.push("/") 
      }


        
        axios.all(data.imageArray.map( (_, index) => {
          dispatch(statusAction.setNotification({
            message: 'publishing selected images......',
            type: "loading"
          }))
          console.log(data.imageArray[index], "\n", rawImages[0][index], "\n", imageDetails[index].fileType, "\n")
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
            dispatch(statusAction.setNotification({
              message: err.response.data.message,
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
      <section className="review">
        <img className="review__img" src="/assets/review_img.png" alt = 'user' />
        <form ref = {ref} className="review__content" onSubmit = {(e) => {
          onPublish(e)
        }} >
          <div className="review__content__tboxes">
          <div className="review__content__tboxes1">
            <input
                type="text"
                placeholder="Select the Brand"
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
                              setBrandId(item.id)
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
              placeholder="Subject"
              className="review__content__textbox"
              onChange = {(e) => {setTitle(e.target.value)}}
              required
            />

            <div className = 'review__star__container'>
              <div className="review__star__container__stars">
                <label>Ratings: {ratings}</label>
                <div className="review__star__container__stars__selector">
                  <ReactStars
                    count = {5}
                    onChange = {setRatings}
                    size = {40}  
                    isHalf = {true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>

            <textarea
              placeholder="Write Your Review"
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
              <label htmlFor="uploadMedia">Upload Media</label>
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
            <button type = 'submit' className="review__content__publishButton" disabled = {isEmailVerified} >
              publish
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
