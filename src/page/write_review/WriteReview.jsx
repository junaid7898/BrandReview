import React, { useState } from "react";
import ReviewImg from "../../assests/images/review_img.png";
import { GrClose } from "react-icons/gr";
const WriteReview = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [onClickImage, setOnClickImage] = useState(false);

  const fileSelectHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="review-container">
      <section className="review">
        <img className="review__img" src={ReviewImg} alt = 'user' />
        <div className="review__content">
          <div className="review__content__tboxes">
            <input
              type="text"
              placeholder="Select the Brand"
              className="review__content__textbox"
            />
            <input
              type="text"
              placeholder="Subject"
              className="review__content__textbox"
            />
            <textarea
              placeholder="Write Your Review"
              className="review__content__textarea"
              rows={10}
            />
          </div>
          {uploadImage === null ? null : (
            <div className="review__content__previewImg">
              <img
                src={uploadImage}
                onClick={() => setOnClickImage(true)}
                className="review__content__previewImg__img"
                alt = 'user'
              />
              {onClickImage ? (
                <div className="review__content__previewImg__zoom">
                  <GrClose size={24} onClick={() => setOnClickImage(false)} className = 'review__content__previewImg__zoom__icon' />
                  <img src={uploadImage} alt = 'user'/>
                </div>
              ) : null}
            </div>
          )}

          <div className="review__content__buttons">
            <div className="review__content__uploadButton">
              <label htmlFor="uploadMedia">Upload Media</label>
              <input
                type="file"
                name="file"
                accept="images/*"
                id="uploadMedia"
                onChange={fileSelectHandler}
              />
            </div>
            <h3 className="review__content__publishButton">Publish</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriteReview;
