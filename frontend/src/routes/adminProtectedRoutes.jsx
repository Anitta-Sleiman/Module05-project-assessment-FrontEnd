import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
const AdminProtectedRoute = () => {
  const admin = Cookies.get("admin");
  const token = Cookies.get("userToken");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  //function to verify admin token
  const verify = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/admins/v`,
        {
          token: token,
          isAdmin: true,
        }
      );
      // console.log('response from verify function',response)
      setStatus(true);
    } catch (error) {
      if (error.response.status === 403) setStatus(false);
    }
  };
  useEffect(() => {
    verify();
  }, []);
  if (!token || status === false) {
    navigate("/admin/login");

    toast.warning("You are not authorized!");
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
