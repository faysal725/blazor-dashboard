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
      state.subtotal = state.products
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
          0
        )
        .toFixed(2);
      state.total = Math.ceil(state.subtotal + state.deliveryCharge);
    },
    addProductByQuantity: (state, action) => {
      console.log(action.payload);

      // let isProductExist = state.products.findIndex(
      //   (product) => action.payload.id == product.id
      // );

      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      // console.log(state.products[isProductExist]["quantity"], action.payload.quantity);

      state.products = [...updatedProducts, action.payload];

      state.noOfProducts = state.products.length;
      state.subtotal = state.products.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
      state.total = Math.ceil(state.subtotal + state.deliveryCharge);
    },
    removeProducts: (state, action) => {
      let isProductExist = state.products.findIndex(
        (product) => action.payload.id == product.id
      );

      // console.log(state.products[isProductExist]["quantity"]);
      if (state.products[isProductExist]["quantity"] <= 1) {
        return;
      }
      state.products[isProductExist]["quantity"] -= 1;

      state.noOfProducts = state.products.length;
      state.subtotal = state.products
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
          0
        )
        .toFixed(2);
      state.total = Math.ceil(state.subtotal + state.deliveryCharge);
    },

    removeSpecificProduct: (state, action) => {
      let productIndex = state.products.findIndex(
        (product) => action.payload.id == product.id
      );

      state.products.splice(productIndex, 1);

      state.noOfProducts = state.products.length;
      state.subtotal = state.products
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
          0
        )
        .toFixed(2);
      state.total = Math.ceil(state.subtotal + state.deliveryCharge);
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
export const {
  addProducts,
  removeProducts,
  emptyCart,
  addProductByQuantity,
  removeSpecificProduct,
} = cartSlice.actions;
