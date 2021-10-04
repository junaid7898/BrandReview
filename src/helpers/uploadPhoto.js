import axios from "axios"



export const uploadPhoto = async(image, ref) =>{
    console.log(image)
    const nameSplit = image.name.split('.')

    const fileExtension = image.name.split('.')[nameSplit.length - 1]
    nameSplit.pop()
    const fileName = nameSplit.join('.')
    console.log(fileName, fileExtension)
    const {data} = await axios.post('http://localhost:4000/v1/aws/',{
        fileName,
        fileExtension,
        fileSize: image.size,
        fileType:image.type
    })
    if(image.size > 1000){
        ref.value = null
        throw "File is too large"
    }
}