import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signup from "../styles/Signup.module.scss";

const Signup = () => {
  const { push } = useRouter();
  const newUserObj = {
    first_name: "",
    last_name: "",
    email: "",
    role: "customer",
    phone_no: "",
    password: "",
    confirm_password: "",
    age_confirmation: true,
    email_subscription: true,
  };

  const [user, setUser] = useState(newUserObj);

  const submitHandler = (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!user.email || !user.phone_no || !user.password || !user.confirm_password) {
      return toast.info("Please fill empty fields!");
    }

    // check if age is confirmed
    if (!user.age_confirmation) {
      return toast.info("Age confirmation is mandatory, please check the box!");
    }

    // check if password and confirm password match
    if (user.password !== user.confirm_password) {
      return toast.info("Password and confirm password do not match!");
    }

    axios.post(`${process.env.NEXT_PUBLIC_baseURL}/users/register`, user)
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message);
          push("/email-confirmation/confirm-email");
        } else {
          toast.error(data.message);
        }
      }).catch((err) => {
        console.log("err: ", err);
      });
  }


  return (
    <div className={signup.signup_wrapper}>
      <div className={signup.signup_form_wrapper}>
        <div className={signup.heading_para}>
          <h2>Create an Account</h2>
          <p>
            Creating an account is easy. Just fill out the form below and enjoy
            the benefits of being a registered customer.
          </p>
        </div>
        <div className={signup.signup_form}>
          <div className={signup.fname + " " + signup.input_wrapper}>
            <label htmlFor="fname">First Name*</label>
            <input type="text" value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
          </div>

          <div className={signup.lname + " " + signup.input_wrapper}>
            <label htmlFor="lname">Last Name*</label>
            <input type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
          </div>

          <div className={signup.email + " " + signup.input_wrapper}>
            <label htmlFor="email">Email*</label>
            <input type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>

          <div className={signup.phone + " " + signup.input_wrapper}>
            <label htmlFor="phone">Phone*</label>
            <input type="phone"
              value={user.phone_no}
              onChange={(e) => setUser({ ...user, phone_no: e.target.value })} />
          </div>

          <div className={signup.password + " " + signup.input_wrapper}>
            <label htmlFor="password">Password*</label>
            <input type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>

          <div className={signup.password + " " + signup.input_wrapper}>
            <label htmlFor="c_password">Confirm Password*</label>
            <input type="password"
              value={user.confirm_password}
              onChange={(e) => setUser({ ...user, confirm_password: e.target.value })} />
          </div>

          <div className={signup.age_confirm + " " + signup.chex}>
            <input type="checkbox"
              checked={user.age_confirmation}
              onChange={(e) => setUser({ ...user, age_confirmation: e.target.checked })}
            />
            <label htmlFor="age_confirm">
              I affirm I am 13 years of age or older. CA Residents: I affirm I
              am 18 years of age or older.*
            </label>
          </div>

          <div className={signup.offers + " " + signup.chex}>
            <input type="checkbox"
              checked={user.email_subscription}
              onChange={(e) => setUser({ ...user, email_subscription: e.target.checked })}
            />
            <label htmlFor="offers">
              Yes! I would like to receive emails with special offers and sales
            </label>
          </div>
          <div className={signup.button}>
            <button onClick={submitHandler}>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
