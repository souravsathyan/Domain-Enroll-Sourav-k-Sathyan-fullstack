import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice(
    {
        name: 'product',
        initialState: null,
        reducers: {
            updateProduct: (state, action) => {
                
                return {...state,product: action.payload}
            },
            clearProduct: () => {
                return null
            },
            addToCart: (state, action) => {
                return action.payload
            }

        }
    }
)

export const { 
    updateProduct,
    clearProduct,
    addToCart 
} = productSlice.actions

export default productSlice.reducer