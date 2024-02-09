import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice(
    {
        name: 'product',
        initialState: null,
        reducers: {
            updateProduct: (state, action) => {
                // storing data when updating product
                return {...state,product: action.payload}
            },
            clearProduct: () => {
                return null
            },
            addToCart: (state, action) => {
                const existingProduct = state.find((product) => product._id === action.payload._id);
        
                if (existingProduct) {
                  // If the product already exists, update the count
                  return state.map((product) =>
                    product._id === action.payload._id ? { ...product, count: product.count + 1 } : product
                  );
                } else {
                  // If the product doesn't exist, add it to the cart with a count of 1
                  return [...state, { ...action.payload, count: 1 }];
                }
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