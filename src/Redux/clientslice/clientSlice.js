import { createSlice } from "@reduxjs/toolkit";

const initialClientState = { 
    client:null 
}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialClientState,
    reducers:{
        setClient(state, action){
            const getType = Object.keys(action.payload)[0]
            console.log(getType)
            let type;
            if(getType === "user"){
                type = ["user"]
                if(action.payload.user.role === "admin" || action.payload.user.role === "subadmin"){
                    type = [...type, "admin"]
                }
            }
            else if(getType === "brand"){
                type = ["brand"]
            }
            
            action.payload = {
                ...action.payload,
                type
            }
            
            state.client = action.payload
        },
        removeClient(state){
            state.client = null
        }
    }
})

export const clientActions = clientSlice.actions;
export default clientSlice.reducer;