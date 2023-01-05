import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import category from "../styles/CategoryCard.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCategoryProducts = ({ products, banners, bannerCategoryProducts }) => {
    // const image = product.variants[0]?.features[0]?.images[0];

    const bannersettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        // arrows: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    if (window.innerWidth > 1024) {
        if (bannerCategoryProducts.length > 3) {
            bannersettings.slidesToShow = 4;
        }
        if (bannerCategoryProducts.length === 3) {
            bannersettings.slidesToShow = 3;
        } else if (bannerCategoryProducts.length === 2) {
            bannersettings.slidesToShow = 2;
        } else if (bannerCategoryProducts.length === 1) {
            bannersettings.slidesToShow = 1;
        }
    }

    if (window.innerWidth < 1024) {
        if (bannerCategoryProducts.length > 3) {
            bannersettings.slidesToShow = 3;
        }
        if (bannerCategoryProducts.length === 3) {
            bannersettings.slidesToShow = 3;
        } else if (bannerCategoryProducts.length === 2) {
            bannersettings.slidesToShow = 2;
        } else if (bannerCategoryProducts.length === 1) {
            bannersettings.slidesToShow = 1;
        }
    }

    if (window.innerWidth < 769) {
        if (bannerCategoryProducts.length > 3) {
            bannersettings.slidesToShow = 2;
        }
        if (bannerCategoryProducts.length === 3) {
            bannersettings.slidesToShow = 2;
        } else if (bannerCategoryProducts.length === 2) {
            bannersettings.slidesToShow = 2;
        } else if (bannerCategoryProducts.length === 1) {
            bannersettings.slidesToShow = 1;
        }
    }

    if (window.innerWidth < 480) {
        if (bannerCategoryProducts.length) {
            bannersettings.slidesToShow = 1;
        }
    }

    // const updateSize = () =>
    // setSize({
    //     y: window.innerWidth,
    // });

    // useEffect(() => (window.onresize = updateSize), []);

    // console.log(size.y);

    return (
        <>
            {bannerCategoryProducts.length && (
                <>
                    <h4>Swith it up!</h4>
                    <h2>Update your happy Place</h2>
                </>
            )}
            <Slider {...bannersettings}>
                {bannerCategoryProducts?.map((item) => (
                    <div className={category.category_card} key={item._id}>
                        <div className={category.img}>
                            {item && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.thumbnail_image}`}
                                    // src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${item.variants[0]?.features[0]?.images[0]}`}
                                    alt={item?.title.slice(0, 20)}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            )}
                        </div>

                        {item && (
                            <div className={category.info}>
                                <h6>{item.title}</h6>
                                <Link href={`products/details?slug=${item.slug}`}>
                                    <a>
                                        <button>Shop Now</button>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default BannerCategoryProducts;
