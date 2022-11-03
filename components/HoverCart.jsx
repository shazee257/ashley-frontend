import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  incQuantity,
  decQuantity,
  removeItemFromCart,
} from "../app/features/cartSlice";
import { selectLoginData } from "../app/features/loginSlice";
import axios from "axios";

import cart from "../styles/HoverCart.module.scss";
import { toast } from "react-toastify";

const HoverCart = () => {
  const selectCartDetail = useSelector(selectCartProducts);
  const loginData = useSelector(selectLoginData);
  const dispatch = useDispatch();


  const removeCartItemHandler = async (userId, cartProductId) => {
    console.log("removeCartItemHandler", userId, cartProductId);
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/cart/${userId}/remove-item`, { cartProductId });
    if (data.success) {
      dispatch(removeItemFromCart(cartProductId));
      toast.success(data.message);
    }
  }


  const decQty = (id) => {
    dispatch(decQuantity(id));
  };
  const incQty = (id) => {
    dispatch(incQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={cart.main}>
      {selectCartDetail?.length === 0 ? (
        <h2 className={cart.empty_card_heading}>Cart is Empty</h2>
      ) : (
        <div  className={cart.hover_cart}>
          {selectCartDetail?.map((item) => (
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
                    <p>Code : <span className={cart.bold_color_size}>{item.sku}</span></p>
                    <p>Color : <span className={cart.bold_color_size}>{item.color}</span></p>
                    <p>Size : <span className={cart.bold_color_size}>{item.size}</span> </p>
                  </div>
                  <div className={cart.qty_price}>
                    <div className={cart.qty}>
                      <p className={cart.qty_name}>Qty :</p>
                      <div className={cart.qty_value}>
                        <input type="text" className={cart.input_qty_value}/>
                        {/* <p onClick={() => decQty(item.sku)}>-</p>
                        <p>{item.quantity}</p>
                        <p onClick={() => incQty(item.sku)}>+</p> */}
                      </div>
                      <p className={cart.update_btn_div}>
                        <button className={cart.update_btn}>
                          Update
                        </button>
                      </p>
                    </div>
                    <div className={cart.name_color_size}>
                      <p>Price : <span className={cart.bold_color_size}>${item.price}</span></p>
                      <p>Subtotal : <span className={cart.bold_color_size}>${item.total}</span> </p>
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
            <button className={cart.ChechOut_btn} >
              Chechout
            </button>
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
