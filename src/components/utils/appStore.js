import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import typeReducer from "./TypeSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        type:typeReducer,
    }
})

export default appStore