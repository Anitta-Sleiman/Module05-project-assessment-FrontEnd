import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCall/authCall";
import { useNavigate } from "react-router";
import { authActions } from "../redux/slice/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenForOtp = urlParams.get("token");
    try {
      if (tokenForOtp) {
        axios
          .post(`http://localhost:8000/api/user/auth/login/${tokenForOtp}`)
          .then((response) => {
            if (response.data.valid) {
              toast.success("Authenticated! Please login");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      return;
    }

    dispatch(loginUser(email, password))
      .then((data) => {
        if (data.status == 200) {
          dispatch(
            authActions.login(JSON.parse(localStorage.getItem("userInfo")))
          );
          toast.success("Logged in Successfully !");
          navigate("/");
        } else {
          console.error("Login failed:", data && data.error);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  return (
    <>
      <label>Email</label>
      <input
        id="formControlLg"
        type="email"
        required
        size="sm"
        className="input-input-input"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        id="formControlLg"
        type="password"
        className="input-input-input"
        size="sm"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button
        type="button"
        onClick={SubmitHandler}
        className="btn btn-primary btn-block"
      >
        Login
      </button>
    </>
  );
};

export default LoginPage;
