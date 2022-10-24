import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/BannerCard.module.scss";
const BannerCard = ({ banner }) => {
  return (
    <div className={styles.banner_card}>
      {banner && (
        <div>
          <div className={styles.img}>
            <Image
              src={`${process.env.NEXT_PUBLIC_uploadURL}/banners/${banner.image}`}
              alt={banner.title}
              layout="fill"
              objectFit="fill"
            />
          </div>
          <div className={styles.info}>
            <h4>{banner.title}</h4>
            <p>{banner.description}</p>
            <Link href="/">
              <a>
                <button>Shop Now</button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCard;
