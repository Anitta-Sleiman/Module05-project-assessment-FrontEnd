import { createSlice } from "@reduxjs/toolkit";
const initialOrderCount = parseInt(localStorage.getItem("orderCount"));

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: JSON.parse(localStorage.getItem("orderss")) || [],
    AllOrders: [],
    orderCount: initialOrderCount,
    AllOrdersCount: 0,
    pending: 0,
    accepted: 0,
    canceled: 0,
    delivered: 0,
    getResponse: false,
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    deleteOrders(state, action) {
      state.orders = state.orders.filter((p) => p._id !== action.payload);
    },
    setOrderCount(state, action) {
      state.orderCount = action.payload;
    },
    setAllOrdersCount(state, action) {
      state.AllOrdersCount = action.payload;
    },
    setAllOrders(state, action) {
      state.AllOrders = action.payload;
    },
    setPending(state, action) {
      state.pending = action.payload;
    },
    setAccepted(state, action) {
      state.accepted = action.payload;
    },
    setCanceled(state, action) {
      state.canceled = action.payload;
    },
    setDelivered(state, action) {
      state.delivered = action.payload;
    },
    setResponse(state, action) {
      state.getResponse = action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer;
const orderActions = orderSlice.actions;

export { orderActions, orderReducer };
