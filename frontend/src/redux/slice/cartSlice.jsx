import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("saved-order")) || [];
const initialTotalPrice = localStorage.getItem("total") || 0;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: initialState || [],
    totalPrice: initialTotalPrice || 0,
    cartcount: initialState.length || 0,
  },
  reducers: {
    setCarts(state, action) {
      state.carts = action.payload;
    },
    deleteCarts(state, action) {
      state.carts = state.carts.filter((p) => p._id !== action.payload);
    },
    setCartsCount(state, action) {
      state.cartcount = action.payload;
    },
    setTotal(state, action) {
      state.totalPrice = action.payload;
    },
    emptyCarts(state, action) {
      state.carts = [];
      state.totalPrice = 0;
      state.cartcount = 0;
    },
  },
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export { cartActions, cartReducer };
