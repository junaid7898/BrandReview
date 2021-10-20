import { createSlice } from "@reduxjs/toolkit";

const initialClientState = {
    brands: []
}

const brandSlice = createSlice({
    name: 'brands',
    initialState: initialClientState,
    reducers:{
        setBrands(state, action){
            state.brands = [...action.payload]
        },
        removeBrands(state){
            state = []
        }
    }
})

export const brandAction = brandSlice.actions;
export default brandSlice.reducer;