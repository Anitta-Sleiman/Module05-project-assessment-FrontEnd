import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import ConfirmCart from "./ConfirmCart.jsx";
import { createOrder } from "../redux/apiCall/orderCall.jsx";
function OrderForm(props) {
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const confirmation = () => {
    const finalOrder = [];
    carts.map((item) => {
      finalOrder.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      });
    });
    // console.log( localStorage.getItem('token'))
    dispatch(
      createOrder(
        user[0].data._id,
        JSON.parse(localStorage.getItem("token")),
        finalOrder,
        localStorage.getItem("selectedLocationId")
      )
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {console.log('redux state:user=>  ', user)} */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {console.log("carts 123 ",carts)} */}
        {carts.map((item) => (
          <ConfirmCart key={item.id} item={item} />
        ))}
        <div className="confirm-location-order-main">
          {/* {console.log(user[0])} */}
          <div className="class-container-main-component d-flex">
            <div className="user-info-main-confirm d-flex flex-column">
              <span className="h4"> Username {user[0].data.username}</span>
            </div>
            <div className="user-info-main-confirm d-flex flex-column">
              <span className="h4"> Email: {user[0].data.email}</span>
            </div>
          </div>
        </div>

        <div className="container order-summary-before-checkout flex-column">
          <div className="d-flex justify-content-between">
            <h3>Subtotal: </h3> <p> ${totalPrice}</p>
          </div>

          <div className="d-flex justify-content-between">
            <h3 className="class-for-price-size-total">TOTAL: </h3>{" "}
            <p className="class-for-price-size-total"> ${totalPrice}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => confirmation()}>Confirm Order</button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderForm;
