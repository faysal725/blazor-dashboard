import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  noOfProducts: 0,
  products: [],
  subtotal: 0,
  deliveryCharge: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProducts: (state, action) => {
        console.log(action.payload)
    },
    removeProducts: (state, action) => {
        console.log(action.payload)
    },
    emptyCart: (state) => {
      state.noOfProducts = 0;
      state.products = [];
      state.subtotal = 0;
      state.deliveryCharge = 0;
    },
  },
});


export default cartSlice.reducer;
export const {addProducts, removeProducts, emptyCart} = cartSlice.actions