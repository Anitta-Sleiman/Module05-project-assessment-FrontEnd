import { authActions } from "../slice/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
//login user import { authActions } from './authSlice';

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );
      dispatch(authActions.login(data.message));
      localStorage.setItem("userInfo", JSON.stringify([data]));
      localStorage.setItem("token", JSON.stringify(data.token));
      return data;
    } catch (error) {
      toast.error("wrong credentials");
    }
  };
};

//logout User
export const logoutUser = (user) => {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch(authActions.login(null));
  };
};

//register user

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const data = await axios.post(
        "http://localhost:8000/api/user/signup",
        user
      );
      // console.log(data.code);
      dispatch(authActions.register(data.message));
      if (data.status == 200) {
        toast.warning("Please Check Your Email!");
      } else {
        toast.error("Email or Username already used!");
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error("Email or Username already exists!");
      }
    }
  };
}
