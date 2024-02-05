import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter((p) => p._id !== action.payload);
    },
  },
});

const userReducer = userSlice.reducer;
const usersActions = userSlice.actions;

export { usersActions, userReducer };
