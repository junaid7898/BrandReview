import React, { useRef, useState } from "react";
import ImagePreview from "../../components/image_preview/ImagePreview"
const WriteReview = () => {
  let subject = ''
  let message = ''
  let reviewType = ''
  const ref = useRef()
  const [uploadImage, setUploadImage] = useState([]);

  const fileSelectHandler = (e) => {
    if(uploadImage.length >= 5){
      alert("max of 5 Images is allowed")
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage([...uploadImage, reader.result ]);
      }
    };
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = (i) => {

    setUploadImage( uploadImage.filter((img, index) => index !== i) )

  }

  const onPublish = (e) => {
    e.preventDefault()
    const review = {
      brandId: 'xxxxxxxxxxxx',
      subject,
      message,
      type: reviewType,
      images: [
        'xxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxxx',
        'xxxxxxxxxxxxxxxxxx'
      ]
    }
    alert(JSON.stringify(review, null, 2))
    ref.current.reset()
    setUploadImage([])
    // history.push('/')
  }

  return (
    <div className="review-container">
      <section className="review">
        <img className="review__img" src="/assets/review_img.png" alt = 'user' />
        <form ref = {ref} className="review__content" onSubmit = {(e) => {
          onPublish(e)
        }} >
          <div className="review__content__tboxes">
            <input
              type="text"
              placeholder="Select the Brand"
              className="review__content__textbox"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="review__content__textbox"
              onChange = {(e) => {subject = e.target.value}}
              required
            />
            <select className = 'review__content__dropdown' onChange = {(e) => {reviewType = e.target.value}} required>
              <option value = {null} disabled selected = 'selected'>select review type</option>
              <option value = 'complaint'>Complaint</option>
              <option value = 'review'>Review</option>
              <option value = 'thanked'>Thanked</option>
              
            </select>
            <textarea
              placeholder="Write Your Review"
              className="review__content__textarea"
              rows={10}
              onChange = {e => {message = e.target.value}}
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
                accept="image/*"
                id="uploadMedia"
                onChange={fileSelectHandler}
                onClick = { (e) => {e.target.value = null}}
              />
            </div>
            <button type = 'submit' className="review__content__publishButton" >Publish</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WriteReview;
