import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  removeFromCart,
  incQuantity,
  decQuantity,
} from "../app/features/cartSlice";
// import cartimage from "../pages/assets/fur18.jpg";

import cart from "../styles/HoverCart.module.scss";

const HoverCart = () => {
  const selectCartDetail = useSelector(selectCartProducts);
  const dispatch = useDispatch();

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
      {selectCartDetail.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        selectCartDetail?.map((cartDetail) => (
          <div className={cart.card} key={cartDetail.sku}>
            <div className={cart.card_img_info}>
              <div className={cart.pic}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${cartDetail.image}`}
                  alt={cartDetail.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={cart.info}>
                <div className={cart.name_color_size}>
                  <h6>{cartDetail.title}</h6>
                  <p>Color: {cartDetail.color}</p>
                  <p>Size: {cartDetail.size}</p>
                </div>
                <div className={cart.qty_price}>
                  <div className={cart.qty}>
                    <p>Qty:</p>
                    <div>
                      <p onClick={() => decQty(cartDetail.sku)}>-</p>
                      <p>{cartDetail.quantity}</p>
                      <p onClick={() => incQty(cartDetail.sku)}>+</p>
                    </div>
                  </div>
                  <div className={cart.price}>
                    <p>Item Price:</p>
                    <h4>$ {cartDetail.price}</h4>
                  </div>
                  <div className={cart.total}>
                    <p>Item Total:</p>
                    <h3>$ {cartDetail.price * cartDetail.quantity}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={cart.remove_btn}>
              <button onClick={() => handleRemove(cartDetail.sku)}>
                Remove Item
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HoverCart;
