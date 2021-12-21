import React, {useEffect, useState}from 'react'
import UpdateProfile from '../../../components/update_profile_button/UpdateProfile'
import { axios } from '../../../axios/axiosInstance';
import BrandReviews from './BrandReviews';
import UpdateBrandProfile from './UpdateBrandProfile';
import { clientActions } from '../../../Redux/clientslice/clientSlice';
import { useDispatch , useSelector} from "react-redux";
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';
import VerifyOTP from '../../../components/verify-otp/VerifyOTP';
import BrandChart from './BrandChart';
import { statusAction } from "../../../Redux/statusSlice";
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker';
import FilterComponent from '../../../components/filter_component/FilterComponent';
import UpdatePassword from './UpdatePassword';


const BrandDetail = ({item, brandId, visitorIsBrand}) => { 
    const [option, setOption] = useState(1)
    const {client} = useSelector(state => state.client)
    let from = new Date()
    from.setDate(from.getDate() - 5)
    let to = new Date()
    const [date, setDate] = useState([from , to])


    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState({value: null, label: null})


    const [isUpdatingBrand, setIsUpdatingBrand] = useState(false)
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState({})
      //ANCHOR category selection
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
    useEffect(() => {
        if(item){
            setAbout(item.about)
            setEmail(item.email ? item.email : 'No email Address provided')
            setCategory({value: item.category, label: item.category})
            setName(item.name)
        }
    }, [item])

    const dispatch = useDispatch()

    const [updateProfile, setUpdateProfile] = useState(false)
    const [verifyPhone, setVerifyPhone] = useState(false)

    const handleShowDashBoard = () => {
        setOption(1)
    }

    const handleShowReviews = () => {
        setOption(2)
    }

    const handleShowSettings = () => {
        setOption(3)
    }



      //ANCHOR email validation
        const validateEmail = () => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }


    const checkValidation = () => {
        let response;
        let validEmail;
        if(email){
            validEmail = validateEmail()
        }   
        if(about === item.about && email === item.email && name === item.name && category.value === item.category){
            response = 'nothing is changed'
            return response
        }
        else if(about === null || email === null || name === null || category.value === null){
            response = 'please fill all the entries'
            return response
        }
        else if(!validEmail){
            response = 'please enter a valid email address'
            return response
        }
        else{
            response = 'ok'
            return response
        }
    }
  
    const handleUpdate = () => {
        const validation = checkValidation();
        if(validation === 'ok'){
            dispatch(statusAction.setNotification({
                message: 'updating info please wait....',
                type: "loading"
              }))
          setIsUpdatingBrand(true)
          const {payload} = dispatch(clientActions.setClient({
              ...client, 
              brand: {
                  ...client.brand,
                  email: email,
                  category: category.value,
                  name: name,
                  about: about,
              },
              
          }))
          axios.patch(`/brand/${brandId}`, payload.brand, {
              headers:{
                  "role" : client.type,
                  "authorization" : `bearer ${client.tokens.access.token}`
              }
          }).then((res) => {
            dispatch(statusAction.setNotification({
                message: 'your information is updated...',
                type: "success"
              }))
            // dispatch(brandAction.setBrands([...brands.find(brand => brand.id === brandId)]))
            setIsUpdatingBrand(false)
            setUpdateProfile(false)
            
          }).catch(err => {
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
              }))
              setIsUpdatingBrand(false)
          })
      } 
      else{
        dispatch(statusAction.setNotification({
            message: validation,
            type: "error"
          }))
      }
   }


   


    return (
        
            <div className = 'dashboard__list'>
                <div className="dashboard__list__brand__link">
                    <ul>
                        <li onClick = {handleShowDashBoard} className = {option === 1 ? 'list__click': ''}>Anasayfa</li>
                        <li onClick = {handleShowReviews} className = {option === 2 ? 'list__click': ''}>Raporlar</li>
                        <li onClick = {handleShowSettings} className = {option === 3 ? 'list__click': ''}>Ayarlar</li>
                    </ul>
                    <div className="dashboard__list__brand__link__filters">
                        {
                            option !== 3 &&
                            <div className="dashboard__list__brand__link__filters__item">
                                <MultiDatePicker date={date} setDate={setDate} />
                            </div>
                        }
                        {
                            option !== 1 && option !== 3 &&
                            <div className="dashboard__list__brand__link__filters__item">
                                <FilterComponent tab="review" setFilters={setFilters} setSortOptions={setSortOptions}  />
                            </div>
                        }
                    </div>
                </div>
                {
                    option === 1 && item &&
                        <div className="dashboard__list__chart">
                            <BrandChart brandId = {brandId} date={date}/>
                        </div>
                }

                {
                    option === 3 && item ?    
                    (
                        <>
                        <div className="dashboard__list__settings">   

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__brand-name">
                                    <h3>Marka İsmi</h3>
                                    <h4>{item.name}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__items">
                                <div className="dashboard__list__settings__items__category-name">
                                    <h3>Kategori</h3>
                                    <h4>{item.category ? item.category : " - "}</h4>
                                </div>
                            </div>

                            <div className="dashboard__list__settings__item">
                                <div className="dashboard__list__settings__item__email">
                                    <h3>Email Adresi</h3>
                                    <h4>{item.email}</h4>
                                </div>
                            </div>

                        </div>


                        <div className="mydetails__update-button">
                            <div className="mydetails__update-button__button1">
                                <UpdateProfile onClick={() => setUpdateProfile(true)}  value = 'Profili Güncelle' />
                            </div>
                        {/* {
                            item.isPhoneVerified ?
                            null
                            :
                            <div className="mydetails__update-button__button2" style = {{position: 'relative'}}>
                                {
                                <UpdateProfile onClick = {() => handleOtpVerification()} value = 'Verify Phone'/>
                                }
                            </div>
                            
                        } */}
                        </div>
                            {
                                visitorIsBrand &&
                                <div className = 'update__brand__password'>
                                    <UpdatePassword brandId = {brandId}/>
                                </div>
                            }

                        {
                            updateProfile ?
                            (
                                <div className="update__brand">
                                    <UpdateBrandProfile  
                                    about = {about}
                                    email = {email}
                                    setEmail = {setEmail}
                                    name = {name}
                                    setName = {setName}
                                    category = {category}
                                    setCategory = {setCategory}
                                    options = {options}
                                    setAbout = {setAbout} handleUpdate = {handleUpdate}
                                    setUpdateProfile = {setUpdateProfile}
                                    />
                                    {
                                        isUpdatingBrand && <LoadingIndicator/>
                                    }
                                </div>
                                
                            )
                            :
                            (
                                null
                            )
                        }
                        {
                            //FIXME while sending otp show loading indicator
                            verifyPhone ?
                                <VerifyOTP onCut = {setVerifyPhone} user = {item}/>
                            :
                            null
                        }
                        </>
                    )
                    :
                    (
                        null
                    )
                }
                {
                    option === 2 ?
                        <div className="brand__reviews__container">
                            <BrandReviews brandId = {brandId} filters={filters} sortOptions={sortOptions} date={date} />
                        </div>
                    :
                    
                        null
                    
                }

                
            </div>
    )
}

export default BrandDetail
