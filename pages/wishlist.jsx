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
            <div className={styles.wishlist_card_img_wrapper}>
              <div className={styles.wishlist_card_img}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.variants[0].features[0].images[0]}`}
                  alt="wishlist-img"
                  layout="fill"
                />
              </div>
              <div className={styles.wishlist_prices}>
                <h3>$ {item.maxPrice} </h3>
                <h3>-</h3>
                <h3>$ {item.minPrice} </h3>
              </div>
            </div>
            {/* <div className={styles.wishlist_card_img}>
              <Image
                // src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.image}`}
                src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.variants[0].features[0].images[0]}`}
                alt="wishlist-img"
                layout="fill"
                objectFit="contain"
              />

            </div> */}


            <div className={styles.wishlist_card_info}>
              {console.log(`/${process.env.NEXT_PUBLIC_uploadURL}/products/${item.variants[0].features[0].images[0]}`)}
              <h3> {item.title} </h3>
              {/* <h6>{item.variants[0].size}</h6> */}
              {/* <h6>{item.color} </h6> */}
              <h6>In Stock</h6>
              <div className={styles.btn}>
                <button
                  className={styles.dlt}
                  title="Delete"
                  onClick={() => deleteHandler(item.sku)}
                >
                  <AiOutlineDelete />
                </button>
                {/* <button className={styles.add} title="Add to Cart">
                  <BsCartPlus />
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
