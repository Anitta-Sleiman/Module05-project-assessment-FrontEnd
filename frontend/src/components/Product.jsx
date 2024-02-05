// import React from "react";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardText,
//   MDBCardImage,
// } from "mdb-react-ui-kit";
// import { FiShoppingCart } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { toast } from "react-toastify";
// const Product = ({ product }) => {
//   return (
//     <div className="single-product-component-card">
//       <div className="row justify-content-center">
//         <div>
//           <MDBCard className="border-0">
//             <MDBCardImage
//               className="rounded image-product-main-con"
//               src={product.image}
//               alt="..."
//               position="top"
//               height={250}
//               width={250}
//             />
//             <MDBCardBody className="card-bod-shop">
//               <MDBCardText className="title-text-for-cardshop fw-bold mb-0">
//                 {product.name}{" "}
//               </MDBCardText>
//               <span
//                 className=" d-block text-truncate mb-0"
//                 style={{ fontSize: "15px" }}
//               >
//                 {product.description}{" "}
//               </span>
//               <MDBCardText className="title-text-for-cardshop text-muted mb-0">
//                 $ {product.price}
//               </MDBCardText>

//               <button className="usable-button-component-main mt-2 button-for-add-to-card-button">
//                 <FiShoppingCart /> Add To Card
//               </button>
//             </MDBCardBody>
//           </MDBCard>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
const Product = ({ product }) => {
  const { carts } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState();
  const [chosen, setChosen] = useState("fff");
  localStorage.setItem("newPrice", newPrice);
  const user = localStorage.getItem("userInfo");

  //function to handle chosing a specific color when adding an item
  const handleChosenColor = (color) => {
    setChosen((previous) => {
      return color;
    });

    toast.success(`You Chosed ${color} color successfully ! Bravo!`);
  };

  //handle adding a product to the cart
  const handleAdd = (product) => {
    const newOrder = {
      product: product,
      quantity: quantity,
      price: product.price,
      description: product.description,
    };
    console.log("newOrder,", newOrder);
    let temp_cart = JSON.parse(localStorage.getItem("saved-order")) || [];
    // console.log("before temp_cart ", temp_cart);

    // Check if the id exists in the array, increment the quantity
    // If not, push the new order to the array
    let found = false;
    for (let i = 0; i < temp_cart.length; i++) {
      if (temp_cart[i].product._id === product._id) {
        found = true;
        temp_cart[i].quantity = temp_cart[i].quantity + 1;
        // console.log(
        //   temp_cart[i].quantity,
        //   "quantity---\n",
        //   temp_cart[i].price,
        //   "price----"
        // );
        temp_cart[i].price = temp_cart[i].product.price * temp_cart[i].quantity;
        break;
      }
    }

    if (!found) {
      temp_cart.push(newOrder);
    }

    // console.log("after ", temp_cart);

    localStorage.setItem("saved-order", JSON.stringify(temp_cart));
    localStorage.setItem("total", totalPrice);
    dispatch(cartActions.setCarts(temp_cart));

    //calculate total
    let calculatedTotal = 0;
    temp_cart.map((item) => {
      calculatedTotal += item.price;
    });

    dispatch(cartActions.setTotal(calculatedTotal));
    dispatch(cartActions.setCartsCount(temp_cart.length));
    localStorage.setItem("total", calculatedTotal);

    // Update the quantity state after the local storage is updated
    // setQuantity(found ? temp_cart[0].quantity : quantity + 1);
  };

  return (
    <div className="single-product-component-card">
      <div className="row justify-content-center">
        <div>
          <MDBCard className="border-0">
            <MDBCardImage
              className="rounded image-product-main-con"
              src={product.image}
              alt="..."
              position="top"
              height={250}
              width={250}
            />
            <MDBCardBody className="card-bod-shop">
              <MDBCardText className="title-text-for-cardshop fw-bold mb-0">
                {product.name}{" "}
              </MDBCardText>
              <span
                className=" d-block text-truncate mb-0"
                style={{ fontSize: "15px" }}
              >
                {product.description}{" "}
              </span>
              <MDBCardText className="title-text-for-cardshop text-muted mb-0">
                $ {product.price}
              </MDBCardText>

              {user ? (
                <button
                  className="usable-button-component-main mt-2 button-for-add-to-card-button"
                  onClick={() => handleAdd(product)}
                >
                  <FiShoppingCart /> Add To Card
                </button>
              ) : (
                <p>please login in</p>
              )}
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
};

export default Product;
