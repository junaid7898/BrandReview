import React, { useRef, useState } from 'react'
import { getImageDetails } from '../../../helpers/getImageDetails'
import { statusAction } from '../../../Redux/statusSlice'
import { axios } from '../../../axios/axiosInstance'
import Select from "react-select";
import { useDispatch } from "react-redux";
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';

const DashboardAddBrand = () => {
    const [brandName, setBrandName] = useState(null)
    const [about, setAbout] = useState(null)
    const [logo, setLogo] = useState(null)
    const [category, setCategory] = useState({value: null , label: null})
    const [logoDetails, setLogoDetails] = useState(null)
    const [rawLogo, setRawLogo] = useState(null)
    const [imageDetails, setImageDetails] = useState(null)


    const [isRegistering, setIsRegistering] = useState(false)

    const dispatch = useDispatch()

    const options = [
        { value: 'fashion', label: 'Fashion' },
        { value: 'automobile', label: 'Auto Mobile' },
        { value: 'online-retail', label: 'Online Retail' },
        { value: 'social-network', label: 'Social Network' },
        { value: 'medicine', label: 'Medicine' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'pet-store', label: 'Pet Store' },
        { value: 'search-engine', label: 'Search Engine' },
      ];


    const aboutLength = useRef(0)





    const handleImage = (e) =>{
        const g = getImageDetails(e.target.files[0])
        if(!g){
          e.target.value = null
          return 
        }
        setImageDetails(g)
        console.log(URL.createObjectURL(e.target.files[0]));
        
        if(g){
          setLogo(URL.createObjectURL(e.target.files[0]))
          setRawLogo(e.target.files[0])
        }
        else{
          setLogo(null)
          setRawLogo(null)
          setLogoDetails(null)
        }
        
      }

      const checkValidation = () => {
          if(brandName === null || brandName === '' || about === null || about === ''){
              return 'please fill all the entries'
          }
          else if(logo === null){
              return 'must provide a logo.....'
          }
          else if( category.value === null){
              return 'must provide a category'
          }
          else{
              return 'ok'
          }
      }

      const handleAddBrand = () => {
            const check = checkValidation()
            if(check === 'ok'){
                // TODO handle axios request to add brand
                setIsRegistering(true)
                dispatch(statusAction.setNotification({
                    message: 'Adding new Brand......',
                    type: "loading"
                }))
                
                const req = {
                    name: brandName,
                    about: about,
                    category: category.value,
                }
                
                axios.post('/auth/brand/register', {
                    brand: req,
                    logoDetails: imageDetails,
                }).then(({data}) => {
                    axios.put(data.url, rawLogo, {
                        headers:{
                          'Content-Type' : imageDetails.fileType
                        }
                    })
                }).then((_) => {
                    dispatch(statusAction.setNotification({
                        message: 'Brand posted.....',
                        type: "success"
                    }))
                    setIsRegistering(false)
                    setBrandName(null)
                    setLogo(null)
                    setImageDetails(null)
                    setRawLogo(null)
                    setCategory({value: null, label: null})
                    setAbout(null)
                }).catch(err => {
                    dispatch(statusAction.setNotification({
                        message: err.response.data.message,
                        type: "error"
                    }))
                    setIsRegistering(false)
                })
                
            }
            else{
                dispatch(statusAction.setNotification({
                    message: check,
                    type: "error"
                  }))
            }
      }
    
    return (
        <div className = 'add__brand__container'>
            <div className = 'add__brand__container__name-input'>
                <label htmlFor = 'brandName'>Brand Name</label>
                <input
                    id = 'brandName'
                    type = 'text'
                    name = 'brand name'
                    placeholder = 'Enter brand name'
                    maxLength = {25}
                    onChange = {e => setBrandName(e.target.value)}
                />
            </div>

            <div className = 'add__brand__container__about-input'>
                <label htmlFor = 'brandAbout'>About {`[${aboutLength.current}/200]`}</label>
                <input
                    id = 'brandAbout'
                    type = 'text'
                    name = 'brand about'
                    placeholder = 'Enter About info....max of 200 characters'
                    maxLength = {200}
                    onChange = {e =>{ 
                        setAbout(e.target.value)
                        aboutLength.current  = e.target.value.length
                    }
                    }
                />
            </div>


            <div className = 'add__brand__container__logo-input'>
                <label htmlFor = 'brandLogo'>Logo</label>
                <input
                    id = 'brandLogo'
                    type = 'file'
                    name = 'brand logo'
                    placeholder = 'select brand logo'
                    accept = "image/*"
                    onChange = {e => handleImage(e)}
                />

                {
                    logo ?
                        <img src = {logo} style = {{maxHeight: 100,  borderRadius: 8,  objectFit: 'contain'}}/>
                    :
                    null
                }
            </div>

            <div className = 'add__brand__container__category-input'>
                <label htmlFor="categoryBrand">Category</label>
                <Select
                    id = 'categoryBrand'
                    value = {category}
                    onChange = {setCategory}
                    options = {options}
                    className = 'add__brand__container__category-input__selector'
                    placeholder = 'select a category for your brand'  
                    isSearchable = {true}
                />
            </div>

            <div className = 'add__brand__container__button' onClick = {handleAddBrand}>
                <h4 style = {{position: 'relative'}}>Add Brand { isRegistering && <LoadingIndicator/> }</h4>

            </div>

        </div>
    )
}

export default DashboardAddBrand