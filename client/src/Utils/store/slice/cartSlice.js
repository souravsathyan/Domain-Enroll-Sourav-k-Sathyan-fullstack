import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice(
  {
    name: 'cart',
    initialState: [],
    reducers: {
      clearCart: () => {
        return null
      },
      addToCart: (state, action) => {
        const existingProduct = state.find((product) => product._id === action.payload._id);

        if (existingProduct) {
          // If the product already exists, update the count
          return state.map((product) =>
            product._id === action.payload._id ? { ...product, count: product.count + 1, price: (product.count + 1) * product.price } : product

          );
        } else {
          // If the product doesn't exist, add it to the cart with a count of 1
          return [...state, { ...action.payload, count: 1 }];
        }
      },
      reduceCount: (state, action) => {
        const existingProduct = state.find((product) => product._id === action.payload._id);

        if (existingProduct && existingProduct.count > 0) {
          // If the product exists and the count is greater than 0, update the count
          return state.map((product) =>
            product._id === action.payload._id ? { ...product, count: product.count - 1, price: product.price / product.count } : product
          ).filter((product) => product.count > 0);
        } else {
          // If the product doesn't exist or the count is 0, return the state as is
          return state;
        }
      },
      removeCartItem:(state,action)=>{
        return state.filter((product)=>product._id!==action.payload._id)
      }

    }
  }
)

export const {
  clearCart,
  addToCart,
  reduceCount,
  removeCartItem
} = cartSlice.actions

export default cartSlice.reducer