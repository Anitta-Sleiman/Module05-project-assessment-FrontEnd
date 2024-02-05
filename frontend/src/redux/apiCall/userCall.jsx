import axios from "axios";
import { toast } from "react-toastify";
import { usersActions } from "../slice/userSlice";
import Cookies from "js-cookie";

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/");
      dispatch(usersActions.setUsers(response.data));
    } catch (error) {
      console.log(error);
      toast.error("bad connection ");
    }
  };
};

//delete User
export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.delete(
        `http://localhost:8000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(usersActions.deleteUser(data.userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Try again later");
    }
  };
};
