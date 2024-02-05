import React from "react";
import "../components/Styles/cartProduct.css";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";

const CartProduct = (props) => {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const { totalPrice, carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { carts } = useSelector(state => state.cart);
  const [updated, setUpdated] = useState(
    () => quantity * props.item.product.price
  );

  // console.log(totalState)

  const handleQuantityChange = (productId, newQuantity, updated) => {
    let savedOrders = JSON.parse(localStorage.getItem("saved-order"));

    // Find the index of the product in the array
    const index = savedOrders.findIndex(
      (order) => order.product._id === productId
    );

    if (index !== -1) {
      savedOrders[index].quantity = newQuantity;
      savedOrders[index].price = updated;
      setUpdated(savedOrders[index].price);

      // Set the updated array back to localStorage

      localStorage.setItem("saved-order", JSON.stringify(savedOrders));
      dispatch(
        cartActions.setCarts(JSON.parse(localStorage.getItem("saved-order")))
      );

      let updatedOrder = JSON.parse(localStorage.getItem("saved-order"));

      //calculate total
      let calculatedTotal = 0;
      updatedOrder.map((item) => {
        calculatedTotal += item.price;
      });

      dispatch(cartActions.setTotal(calculatedTotal));
      localStorage.setItem("total", calculatedTotal);
      dispatch(cartActions.setCartsCount(savedOrders.length));

      // console.log("calculatedTotal: " + calculatedTotal)
      // console.log("totalPRice: " + totalPrice)
    }
  };

  const handleRemovingItem = () => {
    let savedOrders = JSON.parse(localStorage.getItem("saved-order"));

    // Find the index of the product in the array
    const index = savedOrders.findIndex(
      (order) => order.product._id === props.item.product._id
    );

    if (index !== -1) {
      // Remove the product at the found index
      savedOrders.splice(index, 1);

      // console.log("new_order ", savedOrders);

      // Set the updated array back to localStorage
      localStorage.setItem("saved-order", JSON.stringify(savedOrders));
      dispatch(cartActions.setCarts(savedOrders));

      // console.log("cart after dispatch ", carts);

      dispatch(cartActions.setCartsCount(savedOrders.length));

      // Calculate total
      let calculatedTotal = 0;
      savedOrders.forEach((item) => {
        setUpdated(item.price);
        calculatedTotal += item.price;
      });
      dispatch(cartActions.setTotal(calculatedTotal));
      localStorage.setItem("total", calculatedTotal);

      // console.log("total ", JSON.parse(localStorage.getItem('total')));
      // console.log("saved-order ", JSON.parse(localStorage.getItem('saved-order')));
    }
  };

  //adding a product quantity
  const handlePlus = () => {
    setQuantity(quantity + 1);
    handleQuantityChange(
      props.item.product._id,
      quantity + 1,
      (quantity + 1) * props.item.product.price
    );
    setUpdated((quantity + 1) * props.item.product.price);
  };

  //removing a product quantity
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleQuantityChange(
        props.item.product._id,
        quantity - 1,
        (quantity - 1) * props.item.product.price
      );

      setUpdated((quantity - 1) * props.item.product.price);
    } else {
      return;
    }
  };
  return (
    <div className="single-cart-product-shopping-main">
      {/* {console.log("cart ",carts)} */}
      <div className="div-for-image-shop">
        <img alt="product-img" src={props.item.product.image} />
      </div>
      <div className="all-about-descriptions d-flex flex-column">
        <div className="title-delete-icon d-flex">
          <h3>{props.item.product.name}</h3>
          <span>
            <TiDeleteOutline
              className="icon-delete-shop-cart"
              onClick={handleRemovingItem}
            />
          </span>
        </div>
        {/* {console.log(props.item)} */}
        <p className="text-muted">{props.item.product.categoryId.name}</p>
        <div className="price-with-quantitiy d-flex ">
          <div className="mask-add-counter d-flex gap-3">
            <div
              onClick={handleMinus}
              className="rounded-circle btn counters-counter"
            >
              <p>-</p>
            </div>
            <p className="quantity-name-shop">{quantity}</p>
            <div
              onClick={handlePlus}
              className="rounded-circle btn   counters-counter"
            >
              <p>+</p>
            </div>
          </div>
          <span className="span-price-style">${updated}</span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
