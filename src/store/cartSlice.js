import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of products in the cart
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const { item, count } = action.payload;
      const existingProduct = state.items.find(
        (product) => product.id === item.id
      );
      if (existingProduct) {
        existingProduct.count += count;
      } else {
        state.items.push({ ...item, count });
      }
    },
    remove(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    decrement(state, action) {
      const productId = action.payload;
      const existingProduct = state.items.find(
        (product) => product.id === productId
      );
      if (existingProduct && existingProduct.count > 1) {
        existingProduct.count--;
      }
    },
    increment(state, action) {
      const productId = action.payload;
      const existingProduct = state.items.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.count++;
      }
    },
  },
});

export const { add, decrement, increment, remove } = cart.actions;

export default cart.reducer;
