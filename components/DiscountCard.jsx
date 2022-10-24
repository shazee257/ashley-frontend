import React from "react";
import Image from "next/image";
import cardStyles from "../styles/DiscountCard.module.scss";
import Link from "next/link";

const DiscountCard = ({ products }) => {
  return (
    <div className={cardStyles.discount_card}>
      <Link href={`/products?discountedCategorySlug=${products.slug}`}>
        <div className={cardStyles.img}>
          <Image
            src={`${process.env.NEXT_PUBLIC_uploadURL}/categories/${products.discount_image}`}
            alt={products.title}
            layout="fill"
            objectFit="fill"
          />
        </div>
      </Link>
    </div>
  );
};

export default DiscountCard;
