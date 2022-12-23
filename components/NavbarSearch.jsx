import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../app/features/cartSlice";
import { selectLoginData, setLogout } from "../app/features/loginSlice";
import { selectWishlistCount, clearWishlist } from "../app/features/wishlistSlice";
import { clearCart } from "../app/features/cartSlice";

import axios from "axios";
import navsearch from "../styles/NavbarSearch.module.scss";
import logo from "../components/assets/m_logo_360.png";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import HoverCart from "./HoverCart";
import NavbarLinksResponsive from "./NavbarLinksResponsive";
import ZipCodeModal from "./ZipCodeModal";

const NavbarSearch = () => {
  const cartCount = useSelector(selectCartCount);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const loginData = useSelector(selectLoginData);
  const wishlistCount = useSelector(selectWishlistCount);

  const searchClickHandler = (e) => {
    e.preventDefault();
    searchTerm && router.push('/products?searchTerm=' + searchTerm);
  }

  const logoutHandler = () => {
    axios.post(`${process.env.NEXT_PUBLIC_baseURL}/users/logout`, {},
      { withCredentials: true }
    ).then(({ data }) => {
      if (data.success) {
        dispatch(clearWishlist());
        dispatch(setLogout());
        dispatch(clearCart());
        router.push("/");
      }
    }).catch(err => console.log("err: ", err));
  };

  return (
    <div className={navsearch.navbar_search_wrapper}>
      <div className={navsearch.navbar_toggle_menu_wrapper}>
        <NavbarLinksResponsive />
      </div>

      <div className={navsearch.logo}>
        <Link href="/">
          <a>
            <Image
              src={logo}
              alt="logo"
              className={navsearch.img}
              layout="fill"
              objectFit="contain"
              priority="low"
            />
          </a>
        </Link>
      </div>

      <div className={navsearch.zip}>
        <div>
          <div onClick={handleOpen}>
            <p>Your closest Ashley</p>
            <h5>Please Enter Zip Code</h5>
          </div>
          <ZipCodeModal open={open} handleClose={handleClose} />
        </div>
      </div>

      <div className={navsearch.navbar_search_input}>
        <form onSubmit={searchClickHandler}>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="submmit" className={navsearch.icon} >
            <FiSearch />
          </button>
        </form>
      </div>

      <div className={navsearch.navbar_links_wrapper}>
        {loginData ? (
          <div className={navsearch.links + " " + navsearch.links_account}>
            <Link href="/">
              <a className={navsearch.login_hanker_link}>
                {/* <CgProfile style={{ fontSize: 20, color: "grey", margin: "auto" }} /> */}
                <CgProfile className={navsearch.login_icon} />
                {/* {loginData.first_name} */}
                <span className={navsearch.login_name} >{loginData.first_name}</span>
              </a>
            </Link>
            <div className={navsearch.account}>
              <Link href={"/orders"}>
                <p style={{ cursor: "pointer" }}>Orders</p>
              </Link>
              <Link href={"/wishlist"}>
                <p style={{ cursor: "pointer" }}>Wish List</p>
              </Link>
              <p style={{ cursor: "pointer" }} onClick={logoutHandler}>
                Logout
              </p>
            </div>
          </div>
        ) : (
          <p className={navsearch.links}>
            <Link href="/login" className={navsearch.links}>
              <a>
                Login <br /> Account
              </a>
            </Link>
          </p>
        )}
        <p className={navsearch.links}>
          <Link href="/deliverytracking" className={navsearch.links}>
            <a>
              Delivery <br /> Tracking
            </a>
          </Link>
        </p>
        <p className={navsearch.links}>
          <Link href="/termscondition" className={navsearch.links}>
            <a>Help</a>
          </Link>
        </p>
        <div className={navsearch.icon_wrapper}>
          <Link href="/cart">
            <a>
              <span className={navsearch.cart_icon}>
                <AiOutlineShoppingCart className={navsearch.icon} />
                {loginData && cartCount > 0 &&
                  <span className={navsearch.badge}>{cartCount}</span>
                }
              </span>
            </a>
          </Link>
          <Link href="/cart">
            <div className={navsearch.cart_detail}>
              <HoverCart />
            </div>
          </Link>
        </div>
        <div className={navsearch.icon_wrapper} style={{ padding: 0 }}>
          {loginData ?
            <Link href="/wishlist">
              <a>
                <span className={navsearch.cart_icon}>
                  <AiOutlineHeart className={navsearch.icon} />
                  <span className={navsearch.badge}>{wishlistCount}</span>
                </span>
              </a>
            </Link> :
            <Link href="/login">
              <a>
                <span className={navsearch.cart_icon}>
                  <AiOutlineHeart className={navsearch.icon} />
                  {/* <span className={navsearch.badge}>{wishlistCount}</span> */}
                </span>
              </a>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;
