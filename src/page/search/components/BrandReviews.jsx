import React, { useEffect, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import ImageViewer from "../../../components/image_viewer/ImageViewer";


const BrandReviews = ({ comments }) => {

  const [uploadImage, setUploadImage] = useState([]);
  const [onClickImage, setOnClickImage] = useState(false);

  const addImage = (image) => {
    if(uploadImage.length > 5){
      alert("max 5 images")
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage([...uploadImage, reader.result ]);
      }
    };

    reader.readAsDataURL(image);


  };



  useEffect(() => {
    console.log(uploadImage)
  }, [uploadImage])

  return (
    <div className="brand__review">
      <h1>this is brand review</h1>
    </div>
  );
};

export default BrandReviews;
