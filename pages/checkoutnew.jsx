import React, { useState } from "react";
import styles from "../styles/CheckoutNew.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  addPayment,
  selectAddress,
  selectPayment,
} from "../app/features/stepSlice";
import { selectCartProducts } from "../app/features/cartSlice";
import { selectCheckout } from "../app/features/checkoutSlice";

const checkouttwo = () => {
  const dispatch = useDispatch();
  const cartDetail = useSelector(selectCartProducts);
  const checkoutDetail = useSelector(selectCheckout);
  const addressDetails = useSelector(selectAddress);
  const paymentDetails = useSelector(selectPayment);
  // const [hide, sethide] = useState();

  // const toggle = (index) => {
  //   if (hide === index) {
  //     sethide();
  //   } else {
  //     sethide(index);
  //   }
  // };

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    address: "",
    unit: "",
    city: "",
    state: "",
    zipcode: "",
    phonenumber: "",
    email: "",
  });

  // const orderonChange = (event) => {
  //   const value = event.target.value;
  //   setOrder({
  //     ...order,
  //     [event.target.name]: value,
  //   });

  //   console.log(order);
  // };

  const [payment, setPayment] = useState({
    cardname: "",
    cardnumber: "",
    date: "",
    cvv: "",
  });

  const paymentonChange = (event) => {
    const value = event.target.value;
    setPayment({
      ...payment,
      [event.target.name]: value,
    });
    console.log(payment);
  };

  const [showpayment, setShowpayment] = useState(false);
  const [showorder, setShoworder] = useState(false);


  const placeOrderHandler = () => {
    const customer = {
      first_name: order.firstname,
      last_name: order.lastname,
      email: order.email,
      address: order.address,
      unit: order.unit,
      city: order.city,
      state: order.state,
      zip: order.zipcode,
      phone: order.phonenumber,
    };

    // const payment = {
    //   cardname: payment.cardname,
    //   cardnumber: payment.cardnumber,
    //   date: payment.date,
    //   cvv: payment.cvv,
    // };

    // const products = cartDetail.map((p) => {
    //   return {
    //     title: p.title,
    //     size: p.size,
    //     color: p.color,
    //     sku: p.sku,
    //     price: p.price,
    //     quantity: p.quantity,
    //     image: p.image,
    //     total: p.total,
    //     product_id: p.product_id,
    //   };
    // });

    const order = {
      ...customer,
      // products: { ...products },
      // tax_amount: checkoutDetail.tax,
      // total_amount: checkoutDetail.total,
    };

    return console.log("order : ", order);

  }


  return (
    <div className={styles.accordion_container}>
      <div className={styles.accordion_wrapper}>
        {/* one */}
        <div className={styles.accordion_item}>
          <div
            className={styles.accordion_heading}
          //  onClick={() => toggle(1)}
          >
            <h4>Deliver my order to</h4>
          </div>

          <div
            className={
              // hide === 1
              //   ?
              // ? styles.accordion_content + " " + styles.accordion_content_show
              // : styles.accordion_content
              // styles.accordion_content
              // :
              styles.accordion_content + " " + styles.accordion_content_show
            }
          >
            <div className={styles.content_filter_wrapper}>
              <h2>
                If you already have an account <span>Sign in</span>
              </h2>
              <h3>Required*</h3>

              <div className={styles.names}>
                <span>First Name*</span>
                <span>Last Name*</span>
              </div>

              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Enter First name"
                  name="firstname"
                  value={customer.firstname}
                  onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Enter Last name"
                  name="lastname"
                  value={customer.lastname}
                  onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                />
              </div>
              <div className={styles.address_div}>
                <span className={styles.address}>Address*</span>
                <span className={styles.optional}>
                  Apt, Unit, Floor (Optional)
                </span>
              </div>

              <div className={styles.address_inputs_div}>
                <input
                  type="text"
                  placeholder="Enter address"
                  className={styles.address_inputs}
                  name="address"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Enter here"
                  className={styles.optional_input}
                  name="unit"
                  value={customer.unit}
                  onChange={(e) => setCustomer({ ...customer, unit: e.target.value })}
                />
              </div>
              <div className={styles.city_div}>
                <h5>City*</h5>
                <input
                  type="text"
                  placeholder="Enter city"
                  className={styles.city_inputs}
                  name="city"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                />
              </div>

              {/* state and zip */}
              <div className={styles.names}>
                <span>state*</span>
                <span>Zip*</span>
              </div>
              {/* state and zip input */}
              <div className={styles.inputs}>
                <input
                  type="State"
                  placeholder="Enter State"
                  name="state"
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                />
                <input
                  type="Zip Code"
                  placeholder="Enter Zip Code"
                  name="zipcode"
                  value={customer.zipcode}
                  onChange={(e) => setCustomer({ ...customer, zipcode: e.target.value })}
                />
              </div>

              {/* contact  */}
              <div className={styles.city_div}>
                <h5>Contact Phone for Delivery*</h5>
                <input
                  type="text"
                  placeholder="Enter Contact"
                  className={styles.city_inputs}
                  name="phonenumber"
                  value={customer.phonenumber}
                  onChange={(e) => setCustomer({ ...customer, phonenumber: e.target.value })}
                />
              </div>

              {/* email */}
              <div className={styles.city_div}>
                <h5>Email*</h5>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className={styles.city_inputs}
                  name="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>

              <div className={styles.btn_div}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // toggle(2);
                    dispatch(addAddress(customer));
                    setShowpayment(true);
                  }}
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* two */}
        <div className={styles.accordion_item}>
          <div
            className={styles.accordion_heading}
          //  onClick={() => toggle(2)}
          >
            <h4>Payment Info</h4>
          </div>

          <div
            className={
              // hide === 2
              //   ? styles.accordion_content + " " + styles.accordion_content_show
              //   : styles.accordion_content &&
              showpayment
                ? styles.accordion_content + " " + styles.accordion_content_show
                : styles.accordion_content
            }
          >
            <div className={styles.content_filter_wrapper}>
              <p>Payment Method</p>
              {/* card Name */}
              <div className={styles.names}>
                <span>Name on Card*</span>
                <span>Card Number*</span>
              </div>

              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Name on Card"
                  name="cardname"
                  value={payment.cardname}
                  onChange={paymentonChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  name="cardnumber"
                  value={payment.cardnumber}
                  onChange={paymentonChange}
                  required
                />
              </div>

              {/* card Dtae */}
              <div className={styles.names}>
                <span>Date*</span>
                <span>CVV*</span>
              </div>

              <div className={styles.inputs}>
                <input
                  type="date"
                  name="date"
                  value={payment.date}
                  onChange={paymentonChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Last three digits on signature strip"
                  name="cvv"
                  value={payment.cvv}
                  onChange={paymentonChange}
                  required
                />
              </div>

              <div className={styles.btn_div}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // toggle(3);
                    dispatch(addPayment(payment));
                    setShoworder(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* three */}
        <div className={styles.accordion_item}>
          <div
            className={styles.accordion_heading}
          // onClick={() => toggle(3)}
          >
            <h4>Order Review</h4>
          </div>

          <div
            className={
              // hide === 3
              //   ? styles.accordion_content + " " + styles.accordion_content_show
              //   : styles.accordion_content &&
              showorder
                ? styles.accordion_content + " " + styles.accordion_content_show
                : styles.accordion_content
            }
          >
            <div className={styles.content_filter_wrapper}>
              <div className={styles.total}>
                <p>Total</p>
                <p className={styles.total_bold}>${(checkoutDetail.total).toFixed(2)}</p>
              </div>
              <div className={styles.total}>
                <p>Taxes</p>
                <p className={styles.total_bold}>${(checkoutDetail.taxes).toFixed(2)}</p>
              </div>
              <div className={styles.total + " " + styles.Grand_total}>
                <p className={styles.total_bold}>Grand Total</p>
                <p className={styles.total_bold}>${(checkoutDetail.grandTotal).toFixed(2)}</p>
              </div>

              <div className={styles.payment_info}>
                <div className={styles.shipping}>
                  <p>Shipping Details</p>
                  <p>{addressDetails.firstname + " " + addressDetails.lastname}</p>
                  <p>{addressDetails.address}</p>
                  <p>{addressDetails.city}</p>
                  <p>{addressDetails.state}</p>
                  <p>{addressDetails.zipcode}</p>
                </div>
                <div className={styles.payment}>
                  <p className={styles.payment_bold}>Payment details</p>
                  <p>
                    Card type <span> Visa</span>
                  </p>
                  <p>{paymentDetails.cardname}</p>
                  <p>{paymentDetails.cardnumber}</p>
                  <p>{paymentDetails.cvv}</p>
                </div>
              </div>

              <div className={styles.btn_div}>
                <button onClick={placeOrderHandler}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.checkout_summary_wrapper}>
        <div className={styles.checkout_summary}>
          <p className={styles.items}>
            <span className={styles.Subtotal}>Subtotal (15 items)</span>
            <span>$599.85</span>
          </p>

          <p className={styles.shipping}>
            <span>Shipping</span>
            <span>FREE</span>
          </p>

          <p className={styles.taxes}>
            <span className={styles.bold}>Taxes</span>
            <span>$43.49</span>
          </p>

          <p className={styles.order}>
            <span>Order Total</span>
            <span>$643.34</span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default checkouttwo;
