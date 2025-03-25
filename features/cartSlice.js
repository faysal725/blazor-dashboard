import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  noOfProducts: 0,
  products: [],
  subtotal: 0,
  deliveryCharge: 20,
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProducts: (state, action) => {
      console.log(action.payload);

      let isProductExist = state.products.findIndex(
        (product) => action.payload.id == product.id
      );
      if (isProductExist < 0) {
        state.products.push(action.payload);
      } else {
        console.log(state.products[isProductExist]["quantity"]);
        state.products[isProductExist]["quantity"] += 1;
      }
      state.noOfProducts = state.products.length;
      state.subtotal = state.products.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
      state.total = Math.ceil(state.subtotal + state.deliveryCharge);
    },
    removeProducts: (state, action) => {
      console.log(action.payload);
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
export const { addProducts, removeProducts, emptyCart } = cartSlice.actions;
