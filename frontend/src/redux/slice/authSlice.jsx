import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //condition to get item from the localstorage if the item is available
    user: JSON.parse(localStorage.getItem("userInfo")) || [],

    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    registerMessage: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
