import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-stars";
import axios from "axios";
import { toast } from "react-toastify";
import { push } from "next/router";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";

import product from "../styles/ProductCard.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectLoginData } from "../app/features/loginSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  selectWishlistData,
  selectWishlist
} from "../app/features/wishlistSlice";

const ProductCard = ({ cardProduct }) => {
  const loginData = useSelector(selectLoginData);
  const dispatch = useDispatch();
  // get min & max price from variants
  const prices = cardProduct?.variants.map((variant) => variant.sale_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const wishlistIds = useSelector(selectWishlistData);

  const isProductIdInWishlist = (id) => wishlistIds.includes(id);

  const image = cardProduct.variants[0]?.features[0]?.images[0];

  const wishlistHandler = async (productId) => {
    if (loginData) {
      if (isProductIdInWishlist(productId)) {
        const { data } = await axios
          .put(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`,
            { productId });
        if (data.success) {
          dispatch(removeItemFromWishlist(productId));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`,
          { productId });
        if (data.success) {
          dispatch(addItemToWishlist(productId));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } else {
      push('/login');
    }
  };

  const options = {
    edit: false,
    color1: "rgb(20,20,20,0.1)",
    color2: "tomato",
    value: cardProduct.rating,
  };

  return (
    <div className={product.products_card}>
      <div className={product.heart} onClick={() => wishlistHandler(cardProduct._id)}>
        <h4 className={product.icon}>
          {isProductIdInWishlist(cardProduct._id) ? <AiFillHeart /> : <AiOutlineHeart />}
        </h4>
        <h4 className={product.display}>Add to Wishlist</h4>
      </div>
      <Link href={`/products/details?slug=${cardProduct.slug}`}>
        <a className={product.card_details}>
          <div className={product.card_image}>
            <Image
              src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
              alt="bed" layout="fill" objectFit="cover"
            />
          </div>
          <div className={product.card_info}>
            <h4>{cardProduct.title}</h4>
            <div className={product.ratings}>
              <ReactStars size={24} {...options} />
            </div>
            <p>$ {minPrice} - $ {maxPrice}</p>
          </div>
        </a>
      </Link>
    </div>

  );
};

export default ProductCard;
