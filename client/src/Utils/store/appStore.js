import {configureStore} from "@reduxjs/toolkit"
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice"

const appStore = configureStore(
    {
        reducer:{
            product:productReducer,
            cart:cartReducer
        }
    }
)

export default appStore