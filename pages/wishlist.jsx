import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { selectWishlistData, removeItemFromWishlist } from "../app/features/wishlistSlice";
import { selectLoginData } from "../app/features/loginSlice";
import { selectProducts } from "../app/features/productSlice";

import styles from "../styles/Wishlist.module.scss";
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const wishlistIds = useSelector(selectWishlistData);
  const loginData = useSelector(selectLoginData);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    const wishlistProducts = products.filter((product) => wishlistIds.includes(product._id));
    setWishlistPrices(wishlistProducts);
  }, [wishlistIds]);


  // wishlist with max and min prices
  function setWishlistPrices(payload) {
    const data = payload.map((product) => {
      const prices = product.variants.map((variant) => variant.sale_price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return { ...product, minPrice, maxPrice }
    })
    setWishlistProducts(data);
  }

  const deleteHandler = async (productId) => {
    if (loginData) {
      const { data } = await axios
        .put(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`, { productId });
      if (data.success) {
        dispatch(removeItemFromWishlist(productId));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className={styles.wishlist_wrapper}>
      {/* <div className={`${styles.wishlist_heading} flex items-center justify-center h-20 h-sm-0`}> */}
      <div className={styles.wishlist_heading}>
        {/* <h1 className="px-3 "><AiFillHeart /></h1> */}
        <h1><AiFillHeart /></h1>
        <h2>My Wish List</h2>
      </div>
      <div className={styles.wishlist_cards_wrapper}>
        {wishlistProducts?.map((item) => (
          <div className={styles.wishlist_card} key={item._id} >
            <div className={styles.wishlist_card_crossIcon_div}>
              <MdOutlineClose className={styles.wishlist_card_crossIcon}
                onClick={() => deleteHandler(item._id)} />
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
                <button className={styles.wishlis_viewdetails_btn}
                  onClick={() => push(`/products/details?slug=${item.slug}`)}>
                  View Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
