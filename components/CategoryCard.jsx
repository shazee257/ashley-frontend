import React from "react";
import Image from "next/image";
import Link from "next/link";
import category from "../styles/CategoryCard.module.scss";

const CategoryCard = ({ product }) => {
  const image = product.variants[0]?.features[0]?.images[0];

  return (
    <div className={category.category_card}>
      <div className={category.img}>
        {product && (
          <Image
            src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
            alt={product?.title.slice(0, 20)}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      {product && (
        <div className={category.info}>
          <h6>{product.title}</h6>
          <Link href={`products/details?slug=${product.slug}`}>
            <a>
              <button>Shop Now</button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
