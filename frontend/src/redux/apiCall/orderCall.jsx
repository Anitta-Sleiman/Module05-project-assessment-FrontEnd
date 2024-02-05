import axios from "axios";
import { orderActions } from "../slice/orderSlice";
import { toast } from "react-toastify";
import { cartActions } from "../slice/cartSlice";
import Cookies from "js-cookie";

//get orders by logged user
export const getAllOrdersByUser = (userId, token) => {
  return async (dispatch) => {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/orders/myorders/${userId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(orderActions.setOrders(data.data));
      if (data.status === 200) {
        dispatch(orderActions.setResponse(true));
      }
      // console.log(data)
      // dispatch(orderActions.setOrderCount(data.length));
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};
//get all orders
export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(data.data)) {
        dispatch(orderActions.setAllOrders(data.data));
        dispatch(orderActions.setAllOrdersCount(data.data.length));
      } else {
        console.error("API did not return an array");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};

//add order for logged user
export const createOrder = (userId, token, products, selectedLocation) => {
  return async (dispatch) => {
    try {
      // console.log('request: =>', userId, products, typeof(selectedLocation))
      const response = await axios.post(
        `http://localhost:8000/api/orders/`,
        {
          userId,
          products: products,
          selectedLocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        let order_array = [];
        order_array.push(response.data);
        dispatch(orderActions.setOrders(order_array));
        localStorage.removeItem("saved-order");
        localStorage.removeItem("total");
        dispatch(cartActions.emptyCarts());
      }
      return response;
    } catch (error) {
      console.log(error);
      toast.error("something went wrong !");
    }
  };
};

//Delete order
export const deleteOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/orders/${orderId}`
      );
      const currentOrders = getState().order.orders;
      const updatedOrders = currentOrders.filter(
        (order) => order._id !== orderId
      );
      dispatch(orderActions.setAllOrders(updatedOrders));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//get canceled
export const getCanceled = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.get(
        "http://localhost:8000/api/orders/get/canceled",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('data here',data.data)
      dispatch(orderActions.setCanceled(data.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};

//get acepted
export const getAccepted = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.get(
        "http://localhost:8000/api/orders/get/accepted",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('data here',data.data)
      dispatch(orderActions.setAccepted(data.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};

//get pending
export const getPending = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.get(
        "http://localhost:8000/api/orders/get/pending",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('data here',data.data)
      dispatch(orderActions.setPending(data.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};

//get delivered
export const getDelivered = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const data = await axios.get(
        "http://localhost:8000/api/orders/get/delivered",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('data here',data.data)
      dispatch(orderActions.setDelivered(data.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Bad connection or server error");
    }
  };
};
