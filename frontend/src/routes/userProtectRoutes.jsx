import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userInfo");

  const navigate = useNavigate();

  if (!token && !user) {
    // If not authenticated, redirect to the login page
    toast.warning("you need to be logged in to access!");
    return navigate("/login");
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default UserProtectedRoute;
