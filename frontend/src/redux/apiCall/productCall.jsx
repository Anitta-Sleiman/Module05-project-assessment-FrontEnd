import axios from "axios";
import { productActions } from "../slice/productSlice";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get all products
export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products");
      dispatch(productActions.setProducts(data.data));
      // console.log("all fetched products:  ", data);
    } catch (error) {
      toast.error("bad connection ");
    }
  };
};

//delete product
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/products/${productId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      dispatch(productActions.deleteProducts(data.productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//edit product
export const editProduct = (productId, updatedProductData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/products/${productId}`,
        updatedProductData
      );
      dispatch(
        productActions.editProducts(data.productId, data.updatedProduct)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (newProduct, thunkAPI) => {
    try {
      // console.log("newProduct:", newProduct);
      const { data } = await axios.post(
        "http://localhost:8000/api/products",
        newProduct
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
