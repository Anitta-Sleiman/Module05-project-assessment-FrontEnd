import React, { useEffect } from "react";
import Product from "../components/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/apiCall/productCall.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column">
      <p className="align-center-title">All Products</p>
      <div className="product-main-div">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
