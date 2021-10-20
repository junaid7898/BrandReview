import { configureStore } from "@reduxjs/toolkit";
import brandInfoSlice from "./brandInfoSlice/brandInfoSlice";
import clientSlice from "./clientslice/clientSlice";
import statusSlice from "./statusSlice";


const store = configureStore({
    reducer:{
        client: clientSlice,
        brands: brandInfoSlice,
        status: statusSlice
    },
})

export default store;