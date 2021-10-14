import { createSlice } from "@reduxjs/toolkit";

const initialClientState = { 
    loading: false,
    attemptingLoginOnSiteLoad: false,
    isUserLoggedIn: false,
    isBrandLoggedIn: false,
    isUserAdmin: false,
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
    }
})

export const statusAction = statusSlice.actions;
export default statusSlice.reducer;