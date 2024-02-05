import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slice/productSlice";
import { authReducer } from "./slice/authSlice";
import { orderReducer } from "./slice/orderSlice";
import { userReducer } from "./slice/userSlice";
import { cartReducer } from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
