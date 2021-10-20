export const getImageDetails = (image) =>{
    
    const imageType = image.type.split('/')[0]
    if(!imageType || imageType !== "image"){
        alert("Uploaded file not an image")
        return false
    }

    const MB = 1000000;
    const sizeLimit = 5 * MB
    if(image.size > sizeLimit ){
        alert("Image too large")
        return false
    }

    const nameSplit = image.name.split('.')
    const fileExtension = image.name.split('.')[nameSplit.length - 1]
    nameSplit.pop()
    const fileName = nameSplit.join('.')
    return { fileName, fileExtension, fileType: image.type }

}