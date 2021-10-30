import { createSlice } from "@reduxjs/toolkit";

const initialClientState = { 
    client:null 
}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialClientState,
    reducers:{
        setClient(state, action){
            console.log(action.payload)
            const getType = Object.keys(action.payload)[0]
            let type = [];
            if(getType === "user"){
                if(action.payload.user.role.includes("user")){
                    type = [...type, "user"]
                }
                if(action.payload.user.role.includes("admin") || action.payload.user.role.includes("subadmin")){
                    type = [...type, "admin"]
                }
            }
            else if(getType === "brand"){
                type = [...type, "brand"]
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