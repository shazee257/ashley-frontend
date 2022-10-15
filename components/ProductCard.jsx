import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-stars";

import { AiOutlineHeart, AiFillStar } from "react-icons/ai";

import product from "../styles/ProductCard.module.scss";

const ProductCard = ({ cardProduct }) => {
  // get min & max price from variants
  const prices = cardProduct?.variants.map((variant) => variant.sale_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // get image from variants array and features array
  const image = cardProduct.variants[0]?.features[0]?.images[0];
  // const imageHover = cardProduct.variants[0]?.features[0]?.images[2];

  const options = {
    edit: false,
    color1: "rgb(20,20,20,0.1)",
    color2: "tomato",
    value: cardProduct.rating,
  };

  return (
    <Link href={`/products/details/${cardProduct.slug}`}>
      <a className={product.products_card}>
        <div className={product.heart}>
          <h4 className={product.icon}>
            <AiOutlineHeart />
          </h4>
          <h4 className={product.display}>Add to Wishlist</h4>
        </div>
        <div className={product.card_image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
            alt="bed" layout="fill" objectFit="cover"
          />
          {/* <div className={product.display}>
            <Image
              src={`${process.env.NEXT_PUBLIC_uploadURL}products/${imageHover}`}
              alt="bed" layout="fill" objectFit="cover"
            />
          </div> */}
        </div>
        <div className={product.card_info}>
          <h4>{cardProduct.title}</h4>
          <div className={product.ratings}>
            <ReactStars {...options} />
          </div>
          <p>$ {minPrice} - $ {maxPrice}</p>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
