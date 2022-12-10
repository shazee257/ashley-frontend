import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCheckout } from "../app/features/checkoutSlice";
import { selectCartProducts, selectCartTotal } from "../app/features/cartSlice";

import { fetchProducts } from "../app/features/productSlice";
import { fetchCategory } from "../app/features/categorySlice";

import CartitemsNew from "../components/CartitemsNew";

import cart from "../styles/CartNew.module.scss";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import paypal_logo from "../pages/assets/paypal_logo.png";
import { RiBankCard2Fill } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [togglepromocode, settogglepromocode] = useState(false);

  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const cartTotal = useSelector(selectCartTotal);
  const router = useRouter();

  const tax = cartTotal * 0.17;
  const grandTotal = cartTotal + tax;

  const checkoutHandler = () => {
    if (cartProducts.length > 0) router.push("/checkout");
    else toast.info("Please add items to cart before proceeding to checkout");
  };

  return (
    <div className={cart.cart_wrapper}>
      <div className={cart.cart_content}>
        <div className={cart.cart_header}>
          <MdArrowBackIosNew className={cart.arrow_icon} />
          <Link href="/">
            <p className={cart.back}>Back to Shopping</p>
          </Link>
          <Link href="/">
            <p className={cart.home}> Home /</p>
          </Link>
          <p className={cart.Shopping}> Shopping cart</p>
        </div>
        <div className={cart.cart_heading}>
          <h2>
            My Cart
            <span>
              ({cartProducts.length} items)
            </span>
          </h2>
          <h6>
            Pricing and availability may have changed..
          </h6>
        </div>
        {/* <div className={cart.delivery_instructions}>
          <p>
            <BsFillExclamationTriangleFill className={cart.notallow_icon} />
            OUR APOLOGIES:
            <span> Protection plans are currently unavailable</span>
          </p>
        </div> */}
        {/* <div className={cart.yellow_instructions}>
          <p>
            Free Doorstep Delivery Offer — Please add your delivery zip code
            below to check availability and terms in your area, or contact your
            local Ashley store for more details. Not available in all areas.
            Minimum/maximum purchase restrictions may apply.
          </p>
        </div> */}
        <div className={cart.cart}>
          <div className={cart.cart_items}>
            <div className={cart.cart_item_heading_wrapper}>
              <div className={cart.cart_item_heading}>
                <p className={cart.cart_item_name}>items</p>
                <p className={cart.cart_item_zipcode}>
                  <span className={cart.hide_mobile}>Availability and Delivery Options based on</span>   zip code
                  <span className={cart.zip_code_num}>75500</span>
                </p>
              </div>

            </div>
            <div className={cart.cart_item}>
              <CartitemsNew />
            </div>
          </div>
          <div className={cart.cart_summary_wrapper}>
            <div className={cart.cart_summary}>
              <h3>Order Summary</h3>
              <div className={cart.subtotal}>
                <h4>Subtotal ({cartProducts.length} items)</h4>
                <p>${cartTotal && (cartTotal).toFixed(2)}</p>
              </div>
              <div className={cart.taxes}>
                <h4>Tax</h4>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className={cart.total}>
                <h4>Total</h4>
                <p>${grandTotal.toFixed(2)}</p>
              </div>
              <div className={cart.accordion}>
                <div className={cart.subaccordion}>
                  <p onClick={() => settogglepromocode(!togglepromocode)}>
                    Apply Promo Code
                  </p>
                  <p
                    className={cart.icon}
                    onClick={() => settogglepromocode(!togglepromocode)}
                  >
                    +
                  </p>
                </div>
                {togglepromocode ? (
                  <div className={cart.promocode}>
                    <input type="text" placeholder="Enter Promo Code" />
                    <button>Apply</button>
                  </div>
                ) : null}
              </div>
              {/* <div className={cart.promocode}>
                <input type="text" placeholder="Enter Promo Code" />
                <button>Apply</button>
              </div> */}
              {/* adbvantage_card */}
              <div className={cart.adbvantage_card}>
                <div className={cart.adbvantage_card_icondiv}>
                  <RiBankCard2Fill className={cart.adbvantage_card_icon} />
                  <p className={cart.adbvantage_card_icon_sub_heading}> Furniture Mecca Advantage™ Card</p>
                </div>
                <p className={cart.adbvantage_card_para}>Special Financing Options Available Prequalify Now</p>
              </div>

              {/* Secure Checkout */}
              <div className={cart.checkout_btn}>
                <button onClick={checkoutHandler}>
                  Secure Checkout
                  <MdLockOutline className={cart.checkout_btn_icon} />
                </button>
              </div>
              {/* paypal button */}
              <div className={cart.paypal_btn}>
                <div className={cart.paypal_btn_imgdiv}>
                  <Image
                    src={paypal_logo}
                    alt="Loading..."
                    layout="fill"
                    className={cart.paypal_btn_img}
                  />
                </div>
                <span>Checkout</span>
                {/* <button onClick={checkoutHandler}>
                  <MdLockOutline className={cart.paypal_btn_icon} />
                  Checkout
                </button> */}
              </div>
            </div>
            <div className={cart.payment_terms}>
              <h6>
                Your actual amount invoiced may be different from your order
                summary above.
              </h6>
              <p>
                The taxes stated in this order summary are only an estimate.
                Your final invoice before delivery may include a different tax
                amount. Ashley will authorize your card every 6 days until your
                items are shipped or delivered.
              </p>

              <p>
                By continuing to checkout, you are agreeing to our
                <span onClick={() => {router.push("/termscondition")}}> Terms of Use</span>+   <span onClick={() => {router.push("/termscondition")}}>Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Cart;
