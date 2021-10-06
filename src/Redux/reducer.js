import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./brand slice/brandSlice";

import userSlice from "./user slice/userSlice";


const store = configureStore({
    reducer:{
        user: userSlice,
        brand: brandSlice,
    },
})

export default store;