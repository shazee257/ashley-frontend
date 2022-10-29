import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlist,
  fetchWishlist
} from "../app/features/wishlistSlice";
import { selectLoginData } from "../app/features/loginSlice";

import styles from "../styles/Wishlist.module.scss";
import wishlistimg from "./assets/fur12.jpg";
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const wishlist = useSelector(selectWishlist);
  const loginData = useSelector(selectLoginData);
  const dispatch = useDispatch();
  const { push } = useRouter();


  // wishlist with max and min prices
  function setWishlistPrices(payload) {
    const data = payload.map((product) => {
      const prices = product.variants.map((variant) => variant.sale_price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return { ...product, minPrice, maxPrice }
    })
    setWishlistData(data);
  }

  const removeItemFromWishlistHandler = async (productId) => {
    if (loginData) {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`,
        { productId });
      dispatch(fetchWishlist(loginData.user_id));
      if (data.success) {
        toast.success(data.message);
        setWishlistData(wishlistData.filter((product) => product._id !== productId));
      }
    } else {
      push('/login');
    }
  };

  useEffect(() => {
    (loginData) && dispatch(fetchWishlist(loginData.user_id));
  }, [dispatch]);


  useEffect(() => {
    setWishlistPrices(wishlist.data);
  }, [wishlist.data]);


  return (
    <div className={styles.wishlist_wrapper}>
      <div className={`${styles.wishlist_heading} flex items-center justify-center h-20`}>
        <h1 className="px-3 "><AiFillHeart /></h1>
        <h2>My Wish List</h2>
      </div>
      <div className={styles.wishlist_cards_wrapper}>
        {wishlistData?.map((item) => (
          <div className={styles.wishlist_card}>
            <div className={styles.wishlist_card_crossIcon_div}>
              <MdOutlineClose className={styles.wishlist_card_crossIcon}
                onClick={() => removeItemFromWishlistHandler(item._id)} />
            </div>
            <div className={styles.wishlist_card_info}>
              {/* IMAGE */}
              <div className={styles.wishlist_card_img}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.variants[0].features[0].images[0]}`}
                  alt="wishlist-img"
                  layout="fill"
                />
              </div>

              {/* TITLE */}
              <div className={styles.wishlist_card_title}>
                {item.title}
              </div>

              {/* MIN MAX DETAISL VIEW  BUTTON */}
              <div className={styles.wishlist_card_view_details}>
                <p className={styles.wishlist_prices}>
                  $ {item.minPrice} - $ {item.maxPrice}
                </p>
                <button className={styles.wishlis_viewdetails_btn}>
                  View Detail
                </button>
              </div>

              {/* delete */}
              {/* <div className={styles.deleteBtn_div}>
                <div className={styles.btn}>
                  <button
                    className={styles.dlt}
                    title="Delete"
                    onClick={() => deleteHandler(item.sku)}
                  >
                    <AiOutlineDelete className={styles.dlt_icon} />
                  </button>
                </div>
              </div> */}

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
