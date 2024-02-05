import React, { useState } from "react";
import OrderForm from "./OrderForm.jsx";
function ConfirmOrder() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <OrderForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default ConfirmOrder;
