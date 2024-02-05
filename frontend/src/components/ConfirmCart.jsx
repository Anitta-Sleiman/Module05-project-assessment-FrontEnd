import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
function ConfirmCart(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const { totalPrice, carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { carts } = useSelector(state => state.cart);
  const [updated, setUpdated] = useState(
    () => quantity * props.item.product.price
  );

  return (
    <div className="single-cart-product-shopping-main">
      {/* {console.log("cart ",carts)} */}
      <div className="div-for-image-shop">
        <img alt="product-img" src={props.item.product.image} />
      </div>
      <div className="all-about-descriptions d-flex flex-column">
        <div className="title-delete-icon d-flex">
          <h3>{props.item.product.name}</h3>
        </div>
        {/* {console.log(props.item)} */}
        <p className="text-muted">{props.item.product.categoryId.name}</p>

        <div className="price-with-quantitiy d-flex ">
          <span className="span-price-style">X {quantity}</span>

          <span className="span-price-style">${updated}</span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCart;
