import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientslice/clientSlice";
import statusSlice from "./statusSlice";


const store = configureStore({
    reducer:{
        client: clientSlice,
        status: statusSlice
    },
})

export default store;