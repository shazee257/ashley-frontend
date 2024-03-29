import React from "react";
import Link from "next/link";
import banner from "../styles/ThinBannerCard.module.scss";
const ThinBannerCard = ({ categoryBanner }) => {

  const imgURL = `${process.env.NEXT_PUBLIC_uploadURL}`;
  return (
    <div
      className={banner.thin_banner_card}
      style={{
        backgroundImage: `url(${imgURL}/banners/${categoryBanner?.image})`,
      }}
    >
      <div className={banner.info}>
        <p>{categoryBanner?.description} </p>
        <h4>{categoryBanner?.title}</h4>
      </div>
      <Link href={`/products?categorySlug=${categoryBanner?.category_id.slug}`}>
        {/* <Link href={`/products/${categoryBanner?.category_id.slug}`}> */}
        <a>
          <button>Shop Now</button>
        </a>
      </Link>
    </div>
  );
};

export default ThinBannerCard;
