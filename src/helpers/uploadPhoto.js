import axios from "axios"



export const uploadPhoto = async(user, image, ref) =>{
    if(image.size > 264000){
        ref.value = null
        throw "File is too large"
    }
    console.log(image)
    try{
        const nameSplit = image.name.split('.')

    

    const fileExtension = image.name.split('.')[nameSplit.length - 1]
    nameSplit.pop()
    const fileName = nameSplit.join('.')
    console.log(fileName, fileExtension)

    const file = {
        name: fileName,
        extension: fileExtension,
        size: image.size,
        type: image.type
    }

    const {data: uploadConfig} = await axios.post('http://localhost:4000/v1/aws/',{user, file})
    const data = await axios.put(uploadConfig.url, image, {
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