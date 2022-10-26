import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlist,
  removeToWishlist,
} from "../app/features/wishlistSlice";

import styles from "../styles/Wishlist.module.scss";
import wishlistimg from "./assets/fur12.jpg";
import { AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const Wishlist = () => {

  const [wishlistData, setWishlistData] = useState([]);
  const wishList = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(removeToWishlist(id));
  };

  function setWishlistPrices(payload) {
    const data = payload.map((product) => {
      const prices = product.variants.map((variant) => variant.sale_price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return { ...product, minPrice, maxPrice }
    })
    setWishlistData(data);
  }

  useEffect(() => {
    setWishlistPrices(wishList.data);
  }, [])

  return (
    <div className={styles.wishlist_wrapper}>
      <div className={styles.wishlist_heading}>
        <h2>My Wish List</h2>
        <h1>
          <AiOutlineHeart />
        </h1>
      </div>
      <div className={styles.wishlist_cards_wrapper}>
        {wishlistData?.map((item) => (
          <div className={styles.wishlist_card}>
            <div className={styles.wishlist_card_crossIcon_div}> <MdOutlineClose className={styles.wishlist_card_crossIcon} /></div>
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
