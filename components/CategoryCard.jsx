import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import category from "../styles/CategoryCard.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryCard = ({ featureProducts }) => {
  // const image = product.variants[0]?.features[0]?.images[0];

  const settings = {
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
    if (featureProducts.length > 3) {
      settings.slidesToShow = 4;
    }
    if (featureProducts.length === 3) {
      settings.slidesToShow = 3;
    } else if (featureProducts.length === 2) {
      settings.slidesToShow = 2;
    } else if (featureProducts.length === 1) {
      bannersettings.slidesToShow = 1;
    } settings
  }

  if (window.innerWidth < 1024) {
    if (featureProducts.length > 3) {
      settings.slidesToShow = 3;
    }
    if (featureProducts.length === 3) {
      settings.slidesToShow = 3;
    } else if (featureProducts.length === 2) {
      settings.slidesToShow = 2;
    } else if (featureProducts.length === 1) {
      settings.slidesToShow = 1;
    }
  }

  if (window.innerWidth < 769) {
    if (featureProducts.length > 3) {
      settings.slidesToShow = 2;
    }
    if (featureProducts.length === 3) {
      settings.slidesToShow = 2;
    } else if (featureProducts.length === 2) {
      settings.slidesToShow = 2;
    } else if (featureProducts.length === 1) {
      settings.slidesToShow = 1;
    }
  }

  if (window.innerWidth < 480) {
    if (featureProducts.length) {
      settings.slidesToShow = 1;
    }
  }


  // new_work_width
  // const [size, setSize] = useState({});

  // useEffect(() => {
  //   getFeatureProducts();
  // }, []);

  //   const updateSize = () =>
  //   setSize({
  //     x: window.innerWidth,
  //   });

  // useEffect(() => (window.onresize = updateSize), []);

  return (
    <>
      <h4>Swith it up</h4>
      <h2>Update your happy Place</h2>
      <Slider {...settings}>
        {featureProducts?.map((item) => (
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

export default CategoryCard;
