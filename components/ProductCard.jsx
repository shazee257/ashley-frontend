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

  const image = cardProduct.thumbnail_image;

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

  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className={product.products_card}>
      <div className={product.heart} onClick={() => wishlistHandler(cardProduct._id)}>
        <h4 className={product.icon}>
          {isProductIdInWishlist(cardProduct._id) ? <AiFillHeart /> : <AiOutlineHeart />}
        </h4>
        <h4 className={product.display}>Add to Wishlist</h4>
      </div>
      {/* <Link href={`/products/details?slug=${cardProduct.slug}`}> */}
      <div className={product.card_details}>
        <Link href={`/products/details?slug=${cardProduct.slug}`}>
          <a className={product.hanker_wrapper}>
            <div className={product.card_image}>
              <Image
                src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
                alt="bed" layout="fill" objectFit="cover" priority={true}
              />
            </div>
            <div className={product.card_info}>
              <h4>{cardProduct.title}</h4>
              <div className={product.ratings}>
                <ReactStars size={24} {...options} />
              </div>
              <p className={product.max_min_prize}>${minPrice} - ${maxPrice}</p>
              {/* <p className={product.year_schedule}>or $84/mo w/ 12 mos special financing</p> */}
              <p className={product.year_schedule}>or ${Math.ceil(minPrice / 12)} or  ${Math.ceil(maxPrice / 12)} w/ 12 mos special financing</p>
            </div>
          </a>
        </Link>
        <div className={product.learn_how}>
          <p className={product.policy} onClick={() => setShowModal(true)}>Learn How</p>
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                {/* <div className="relative w-auto my-6 mx-auto max-w-sm"> */}
                <div className="relative w-auto my-6 mx-auto max-w-sm">                   {/*content*/}
                  <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 text-center  border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-lg font-semibold text-center">
                        Promotional Period: 6 Months
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="h-72 relative px-3 flex-auto overflow-y-scroll">
                      <div className="my-2 text-slate-500 leading-relaxed text-sm">
                        <p className="font-bold my-2 text-black">
                          Don’t have an Ashley Advantage™ credit card? See if you prequalify or apply now.
                        </p>
                        <p className="my-3 text-black">
                          The Suggested Equal Monthly Payment shown may be greater than the required minimum monthly payment that will be on your billing statement when you use the 6 month promotional financing offer. This estimated payment : equals the promotional purchase amount divided by 6(excluding taxes and shipping charges) rounded to the next highest whole dollar,*Would pay off the promotional purchase amount within 6 months, but only if there are no other balances on your account at any time during the 6 month promotional period and you make your payments on time. Your total payments will equal the amount of the promotional purchase amount. If the promotional purchase amount is not paid in full within 6 months, interest will be charged to your account from the purchase date and your total payments will be greater than the amount of the promotional purchase amount.
                        </p>
                        <p className="my-3 text-black">
                          Important: The information about the Suggested Equal Monthly Payment shown assumes the following promotional financing offer is applied to the purchase:
                        </p>
                        <p className="my-3 text-black">
                          No Interest if paid in full within 6 months†††
                        </p>
                        <p className="my-3 text-black">
                          On qualifying purchases with your Ashley Advantage credit card. Interest will be charged to your account from the purchase date if the promotional purchase is not paid in full within 16months. Minimum monthly payments required. $150 minimum purchase required.
                        </p>
                        <p className="my-3 text-black">
                          †††Offer applies only to single-receipt qualifying purchases. No interest will be charged on the promo purchase if you pay the promo purchase amount in full within 6 Months. If you do not, interest will be charged on the promo purchase from the purchase date. The required minimum monthly payments may or may not pay off purchase by end of promotional period. Regular account terms apply to non-promotional purchases and, after promotion ends, to the remaining promotional balance. For new accounts: Purchase APR is 29.99%; Minimum Interest Charge is $2. Existing cardholders should see their credit card agreement for their applicable terms. Subject to credit approval. We reserve the right to discontinue or alter the terms of this offer any time.
                        </p>
                      </div>
                    </div>
                    {/*footer use as a background color*/}
                    <div className="flex items-center justify-end py-2 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

        </div>
      </div>
      {/* </Link> */}
    </div>

  );
};

export default ProductCard;
