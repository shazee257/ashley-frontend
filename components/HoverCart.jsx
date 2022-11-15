import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "../app/features/cartSlice";
import { selectLoginData } from "../app/features/loginSlice";
import axios from "axios";

import cart from "../styles/HoverCart.module.scss";
import { toast } from "react-toastify";
import { CART } from "../constants";
import Link from "next/link";

const HoverCart = () => {
  const cartDetail = useSelector(selectCartProducts);
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
      dispatch(incrementQuantity(cartItemId));
      cartUpdateAPI(loginData.user_id, { cartItemId, operation: "increment", quantity: qty });
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
    <div className={cart.main}>
      {cartDetail?.length === 0 ? (
        <h2 className={cart.empty_card_heading}>Cart is Empty</h2>
      ) : (
        <div className={cart.hover_cart}>
          {cartDetail?.map((item) => (
            <div className={cart.card} key={item.sku}>
              <div className={cart.card_img_info}>
                <div className={cart.pic}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.image}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={cart.info}>
                  <div className={cart.name_color_size}>
                    <h6>{item.title}</h6>
                    <p className={cart.bold_sku_div}>Code : <span className={cart.bold_sku}>{item.sku}</span></p>
                    <p>Color : <span className={cart.bold_color_size}>{item.color}</span></p>
                    <p>Size : <span className={cart.bold_color_size}>{item.size}</span> </p>
                  </div>
                  <div className={cart.qty_price}>
                    <div className={cart.qty}>
                      <p className={cart.qty_name}>Qty :</p>
                      <div className={cart.qty_value}>
                        {/* <input type="text" className={cart.input_qty_value} value={item.quantity} /> */}
                        <p onClick={() => decrementQtyHandler(item._id, item.quantity)}>-</p>
                        <p>{item.quantity}</p>
                        <p onClick={() => incrementQtyHandler(item._id, item.quantity)}>+</p>
                      </div>
                      {/* <p className={cart.update_btn_div}>
                        <button className={cart.update_btn}
                          onClick={() => {
                            console.log("update btn clicked");
                            console.log("item.quantity", item.quantity);
                          }}
                        >
                          Update
                        </button>
                      </p> */}
                    </div>
                    <div className={cart.name_color_size}>
                      <p>Price : <span className={cart.bold_color_size}>${item.price}</span></p>
                      <p>Subtotal : <span className={cart.bold_color_size}>${(item.total).toFixed(2)}</span> </p>
                    </div>
                    {/* <div className={cart.price}>
                    <span> $ {cartDetail.price}</span> <span className={cart.diff_line}>-</span>
                    <span> $ {cartDetail.price * cartDetail.quantity}</span>
                  </div> */}
                    {/* <div className={cart.price}>
                    <h6>Item Price : </h6>
                    <h4> $ {cartDetail.price}</h4>
                  </div>
                  <div className={cart.total}>
                    <h6>Item Total : </h6>
                    <h3> $ {cartDetail.price * cartDetail.quantity}</h3>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className={cart.remove_btn}>
                <button onClick={() => removeCartItemHandler(loginData.user_id, item._id)}>
                  Remove Item
                </button>
                {/* <button className={cart.ChechOut_btn} >
                 Chechout
              </button> */}
              </div>
            </div>
          ))}
          <div className={cart.ChechOut_btn_div}>
            <Link href="/checkoutnew">
              <button className={cart.ChechOut_btn} >
                Chechout
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* <div className={cart.ChechOut_btn_div}>
        <button className={cart.ChechOut_btn} >
          Chechout
        </button>
      </div> */}
    </div>
  );
};

export default HoverCart;
