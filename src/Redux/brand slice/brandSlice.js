import { createSlice } from "@reduxjs/toolkit";

const initialBrandState = { 
    brand:null 
}

const brandSlice = createSlice({
    name: 'brand',
    initialState: initialBrandState,
    reducers:{
        setBrand(state, action){
            state.brand = action.payload
        },
        removeBrand(state){
            state.brand = null
        }
    }
})

export const brandActions = brandSlice.actions;
export default brandSlice.reducer;