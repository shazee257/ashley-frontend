import React, { useState } from "react";
import Image from "next/image";

import cart from "../styles/CartNew.module.scss";
import { ImTruck } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import { TiTickOutline } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";

import {
  selectCartProducts,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "../app/features/cartSlice";

import { selectLoginData } from "../app/features/loginSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { CART } from "../constants";

const CartItems = () => {
  const cartProducts = useSelector(selectCartProducts);
  const loginData = useSelector(selectLoginData);
  const dispatch = useDispatch();

  const cartUpdateAPI = async (userId, updateObj) => {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/cart/${userId}`, updateObj);
    if (!(data.success)) {
      console.log("data.message", data.message);
      toast.error(data.message);
    }
  };

  const removeCartItemHandler = async (userId, cartProductId) => {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/cart/${userId}/remove-item`, { cartProductId });
    if (data.success) {
      dispatch(removeItemFromCart(cartProductId));
      toast.success(data.message);
    }
  }

  const incrementQtyHandler = (cartItemId, qty) => {
    if (qty < CART.MAX_QUANTITY) {
      cartUpdateAPI(loginData.user_id, { cartItemId, operation: "increment", quantity: qty });
      dispatch(incrementQuantity(cartItemId));
    } else {
      toast.error("Maximum quantity reached");
    }
  };

  const decrementQtyHandler = (cartItemId, qty) => {
    if (qty > CART.MIN_QUANTITY) {
      dispatch(decrementQuantity(cartItemId));
      cartUpdateAPI(loginData.user_id, { cartItemId, operation: "decrement", quantity: qty });
    } else {
      toast.error("Minimum quantity reached");
    }
  };

  return (
    <div className={cart.cratitems_wrapper}>
      {cartProducts.length === 0 ? <h3>Cart is Empty</h3> : (
        cartProducts?.map((item) => (
          <div className={cart.threediv} key={item._id}>
            {/* one div  mycartimgdiv_wrapper */}
            <div className={cart.mycartimgdiv_wrapper}>
              <div className={cart.mycartimgdiv}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.image}`}
                  alt="Loading..."
                  layout="fill"
                  className={cart.mycartimgdiv_img}
                  priority={true}
                />
              </div>

              <p className={cart.mycartimgdiv_wrapper_p}>
                <span>Save for Later </span>
                <span
                  className={cart.mycartimgdiv_wrapperspan}
                  onClick={() => removeCartItemHandler(loginData.user_id, item._id)}
                >
                  Remove Item
                </span>
              </p>
            </div>

            {/* second div   cart detail wrapper*/}
            <div className={cart.cart_detail_wrapper}>
              <h6>
                {item.title}
              </h6>
              <div className={cart.cart_item_color_size}>
                <p className={cart.para}>  Item  : {item.sku}</p>
                <p className={cart.para}>  Color : {item.color}</p>
                <p className={cart.para}>  Size : {item.size}</p>
              </div>

              <div className={cart.price_wrapper}>
                <div className={cart.price_div}>
                  <p>Qty</p>
                  <p>Item Price</p>
                </div>
                <div className={cart.price_div}>
                  <div className={cart.qty}>
                    <p>
                      <span onClick={() => decrementQtyHandler(item._id, item.quantity)}>-</span>
                      <span>{item.quantity}</span>
                      <span onClick={() => incrementQtyHandler(item._id, item.quantity)}>+</span>
                    </p>
                  </div>
                  <p className={cart.price_bold}>${item.price}</p>
                </div>
                <div className={cart.price_div + " " + cart.price_div_upper_border}>
                  <p className={cart.item_total}>Item Total</p>
                  <p className={cart.price_bold}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* third div small_card */}
            <div className={cart.thirdiv}>
              {/* small_card */}
              <div className={cart.small_card}>
                <ImTruck className={cart.small_card_icon} />
                <h6>
                  <span className={cart.ups}>UPS</span>
                  <br />
                  <span className={cart.Assembly}> Assembly Not Included</span>
                  <br />
                  <span className={cart.Usually}> Usually ships in</span>
                  <br />
                  <span className={cart.ups}> 5 to 7 days</span>
                  <br />
                  <span className={cart.free}> FREE</span>
                  <br />
                </h6>
                <span className={cart.include}>What's Included?</span>
              </div>

              {/* protect */}

              <div className={cart.protect}>
                <h6 className={cart.protect_heading}>
                  Protect Your items for Unexpectetd
                </h6>
                <div className={cart.protect_details}>
                  <p className={cart.protect_icon_div}>
                    <TiTickOutline className={cart.protect_icon} />
                  </p>
                  <p className={cart.protect_para}>
                    5 Years Furniture Protection Plan
                    <br />
                    <span className={cart.protect_link}>Plan Details</span>
                  </p>
                  <br />
                </div>


                {/* <div>
                  <Image
                    src={Capture}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </div> */}
              </div>

              {/* expert_services */}

              <div className={cart.expert_services}>
                <p className={cart.expert_heading}> Add Expert Services</p>
                <div className={cart.expert_details}>
                  <div className={cart.expert_services_input_div}>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      className={cart.expert_services_input}
                    />
                  </div>
                  <div className={cart.expert_services_icon_div} >
                    <FiSettings className={cart.expert_services_icon} />
                  </div>
                  <div className={cart.expert_services_details}>
                    <p className={cart.how_work_link_wrapper}>
                      Expert Assembly & installation by Handy
                    </p>
                    <p className={cart.how_work_link_wrapper}>
                      $102.50 (applies per items) <br /> <span className={cart.how_work_link}> How it Works</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
