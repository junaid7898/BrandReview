import {axios} from "../axios/axiosInstance"
import { getImageDetails } from "./getImageDetails"



export const uploadPhoto = async(user, image, ref) =>{
    if(image.size > 2640000){
        ref.value = null
        throw Error("File is too large")
    }
    console.log(image)
    try{
    const {fileExtension, fileName} = getImageDetails(image)

    const file = {
        name: fileName,
        extension: fileExtension,
        size: image.size,
        type: image.type
    }

    const {data: uploadConfig} = await axios.post('/aws/',{user, file})
    await axios.put(uploadConfig.url, image, {
        headers:{
          'Content-Type' : file.type
        }
    })
    return {url: `https://review-website-dev.s3.eu-west-1.amazonaws.com/${uploadConfig.key}`}
    }
    catch(err){
        console.log(err.response)
    }
}