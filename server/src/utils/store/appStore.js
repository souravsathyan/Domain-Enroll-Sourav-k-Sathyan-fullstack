import {configureStore} from "@reduxjs/toolkit"
import productReducer from "./slice/productSlice"

const appStore = configureStore(
    {
        reducer:{
            product:productReducer
        }
    }
)

export default appStore