import axios from "axios"



export const uploadMultiPhotos = async(review, user, images) =>{
    
    let imageUrls = []


    



    for(let index=0; index < images.length; index++){
        try{
            const nameSplit = images[0].name.split('.')
            const fileExtension = images[0].name.split('.')[nameSplit.length - 1]
            nameSplit.pop()
            const fileName = nameSplit.join('.')
            console.log(fileName, fileExtension)
        





            const file = {
                name: fileName,
                extension: fileExtension,
                size: images[0].size,
                type: images[0].type
            }
        
            const {data: uploadConfig} = await axios.post('http://localhost:4000/v1/aws/review/',{user, file})
            await axios.put(uploadConfig.url, images[0], {
                headers:{
                'Content-Type' : file.type
                }
            })
            const url = `https://review-website-dev.s3.eu-west-1.amazonaws.com/${uploadConfig.key}`
            imageUrls = [...imageUrls, url]
            }
            catch(err){
                console.log(err.response)
            }
        }
    return imageUrls
}