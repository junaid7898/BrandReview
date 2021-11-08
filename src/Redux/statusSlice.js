import { createSlice } from "@reduxjs/toolkit";

const initialClientState = { 
    loading: false,
    attemptingLoginOnSiteLoad: null,
    isUserLoggedIn: false,
    isBrandLoggedIn: false,
    isUserAdmin: false,
    notification:{
        message:"",
        type: "",
        color: "",
        show: false
    }
}

const statusSlice = createSlice({
    name: 'status',
    initialState: initialClientState,
    reducers:{
        setAttemptingLogin(state, action){
            state.attemptingLoginOnSiteLoad = action.payload
            console.log(action.payload)
            console.log(state)
        },
        isUserLoggedIn(state, action){
            state.status = {
                ...state.status,
                isUserLoggedIn: action.payload,
                isBrandLoggedIn: action.payload ? false : state.status.isBrandLoggedIn
            }
        },
        isBrandLoggedIn(state, action){
            state.status = {
                ...state.status,
                isBrandLoggedIn: action.payload,
                isUserLoggedIn: !action.payload
            }
        },
        isUserAdmin(state, action){
            state.status = {
                ...state.status,
                isUserAdmin: action.payload
            }
        },
        setNotification(state, action){
            action.payload.show = true
            console.log(action.payload)
            if(action.payload.type === "error"){
                action.payload.color = "#FF5151"
            }
            else if(action.payload.type === "success"){
                action.payload.color = "#34BE82"
            }
            else if(action.payload.type === "loading"){
                action.payload.color = "#EDEDED"
            }
            state.notification = action.payload
        },
        removeNotification(state){
            state.notification.show = false
        }
    }
})

export const statusAction = statusSlice.actions;
export default statusSlice.reducer;