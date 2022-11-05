import React, { useState } from "react";
import Image from "next/image";

import cart from "../styles/CartNew.module.scss";
import { ImTruck } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../app/features/cartSlice";

import { TiTickOutline } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";

const CartItems = () => {
  const selectCartDetail = useSelector(selectCartProducts);

  return (
    <div className={cart.cratitems_wrapper}>
      {selectCartDetail.length < 1 ? (
        <h3>Cart is Empty</h3>
      ) : (
        selectCartDetail?.map((cartDetail) => (
          <div className={cart.threediv} key={cartDetail._id}>
            {/* one div  mycartimgdiv_wrapper */}
            <div className={cart.mycartimgdiv_wrapper}>
              <div className={cart.mycartimgdiv}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${cartDetail.image}`}
                  alt="Loading..."
                  layout="fill"
                  className={cart.mycartimgdiv_img}
                />
              </div>

              <p className={cart.mycartimgdiv_wrapper_p}>
                <span>Save for Later </span>
                <span
                  className={cart.mycartimgdiv_wrapperspan}
                  onClick={() => handleRemove(cartDetail.sku)}
                >
                  Remove Item
                </span>
              </p>
            </div>

            {/* second div   cart detail wrapper*/}
            <div className={cart.cart_detail_wrapper}>
              <h6>
                {cartDetail.title}
              </h6>
              <div className={cart.cart_item_color_size}>
                <p className={cart.para}>  Item  : {cartDetail.sku}</p>
                <p className={cart.para}>  Color : {cartDetail.color}</p>
                <p className={cart.para}>  Size : {cartDetail.size}</p>
              </div>

              <div className={cart.price_wrapper}>
                <div className={cart.price_div}>
                  <p>Qty</p>
                  <p>Item Price</p>
                </div>
                <div className={cart.price_div}>
                  <div className={cart.qty}>
                    <p>
                      <span onClick={() => decQty(cartDetail.sku)}>-</span>
                      <span>{cartDetail.quantity}</span>
                      <span onClick={() => incQty(cartDetail.sku)}>+</span>
                    </p>
                  </div>
                  <p className={cart.price_bold}>$ {cartDetail.price}</p>
                </div>
                <div className={cart.price_div + " " + cart.price_div_upper_border}>
                  <p className={cart.item_total}>Item Total</p>
                  <p className={cart.price_bold}>
                    $ {cartDetail.price * cartDetail.quantity}
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
                    <p>
                      Expert Assembly & installation by Handy
                    </p>
                    <p>
                      $102.50 (applies per items) | <span className={cart.how_work_link}> How it Works</span>
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
