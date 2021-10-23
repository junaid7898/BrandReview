import axios from "axios";
import React, { useRef, useState } from "react";
import ImagePreview from "../../components/image_preview/ImagePreview"
import { uploadMultiPhotos } from "../../helpers/uploadMultiplePhotos";
import {getImageDetails} from "../../helpers/getImageDetails";
import { useHistory } from "react-router";
import BrandSearchList from "../../components/brand_comparison/components/BrandSearchList";
import Star from "../../assests/Star";
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import { useDispatch, useSelector } from "react-redux";

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

  const starGradient1 = "#FFDC64" 
  const starGradiet2 = "#FFC850" 
  const starLines = "#FFF082"

  const [sg1, setsg1] = useState("#000")
  const [sg2, setsg2] = useState("#000")
  const [lines, setlines] = useState("#000")

  const {client} = useSelector(state => state.client)
  const {brands} = useSelector(state => state.brands)


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




  const onPublish = async(e) => {
    setIsPublishing(true)
    e.preventDefault()

    console.log(title, message);
    const review = {
      brand: brandId,
      user: client.user.id,
      title: title,
      message: message,
      ratingCount: 1.4,
    }
    const {data} = await axios.post('http://localhost:4000/v1/review/', {review, imageDetails},{
      headers:{
        "authorization" : `bearer ${client.tokens.access.token}`,
        "role" : Object.keys(client)[0]
      }
    })
    
    dispatch(clientActions.setClient({
      ...client,
      user: data.user
    }))

    
    axios.all(data.imageArray.map( (_, index) => {
      console.log(data.imageArray[index], "\n", rawImages[0][index], "\n", imageDetails[index].fileType, "\n")
      axios.put(data.imageArray[index], rawImages[0][index],{
        headers:{
          "Content-Type": imageDetails[index].fileType
        }
      })
      .then( (_) => {
        setIsPublishing(false)
        history.push("/")  
      })
      .catch(err => {
        setIsPublishing(false)
        alert(JSON.stringify(err))
      })
    }))
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
    setBrand(e.target.value)
    handleSearch(e.target.value)
    // setShowList(true)
  }

  const handleMouseEnter = (i) =>{

    

  }

  const handleMouseLeave = (i) =>{

    

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
                value = {brand}
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
                              setBrand(item.name)
                              setBrandId(item.id)
                              setShowList(!showList)
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
              {
                  Array(Math.round(5)).fill().map((_, index)=>(
                      <span onMouseEnter={(index) => handleMouseEnter} onMouseLeave={(index) => handleMouseLeave} >
                      <Star  starGradient1={sg1} starGradiet2={sg2} starLines={lines} />
                      </span>
                  ))
              }
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
            <button type = 'submit' className="review__content__publishButton" disabled = {isPublishing} >
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
