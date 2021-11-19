import { clientActions } from "../../Redux/clientslice/clientSlice"
import {axios} from '../../axios/axiosInstance'
export const logout = (dispatch, history, clientType, refreshToken) =>{
    console.log(clientType)
    if(clientType.includes("user")){
        localStorage.removeItem('userId')
        window.sessionStorage.removeItem('userId')
        axios.post("/auth/user/logout",{refreshToken})
    }
    else if(clientType.includes("brand")){
        localStorage.removeItem('brand  Id')
        window.sessionStorage.removeItem('brand  Id')
        axios.post("/auth/brand/logout",{refreshToken})
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('clientType')
    window.sessionStorage.removeItem('accessToken')
    window.sessionStorage.removeItem('clientType')
    dispatch(clientActions.removeClient())
    history.push('/')

}