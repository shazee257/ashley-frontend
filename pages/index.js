import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import Slider from "react-slick";

// from redux slices
import { fetchProducts, selectProducts } from "../app/features/productSlice";
import { fetchCategory, selectCategory } from "../app/features/categorySlice";
import { fetchBanners, selectBanners } from "../app/features/bannerSlice";
//from assets and styles
import styles from "../styles/Home.module.scss";
import loader from "../components/assets/loader.gif";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//from components
import Carousal from "../components/Carousal";
import CategoriesCard from "../components/CategoriesCard";
import DiscountCard from "../components/DiscountCard";
import BannerCard from "../components/BannerCard";
import CategoryCard from "../components/CategoryCard";
import ThinBannerCard from "../components/ThinBannerCard";
import ShopByCategories from "../components/ShopByCategories";
import ChatBot from "../components/ChatBot";

function Home({ categoriesData }) {
  // const [slider, setSlider] = useState([]);
  const [botShow, setBotShow] = useState(false);
  const [discountCategories, setDiscountCategories] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const dispatch = useDispatch();

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

  // new_work_width
  const [size, setSize] = useState({});

  const updateSize = () =>
    setSize({
      x: window.innerWidth,
    });

  useEffect(() => (window.onresize = updateSize), []);

  // console.log(size.x);
  if (size.x < 1024) {
    settings.slidesToShow = 3;
  }
  if (size.x < 769) {
    settings.slidesToShow = 2;
  }

  // const categories = useSelector(selectCategory);
  const products = useSelector(selectProducts);
  const banners = useSelector(selectBanners);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchBanners());
  }, [dispatch]);

  // const parentCategories = categories?.filter((cat) => cat.parent_id === "");
  const sliders = banners.filter((banner) => banner.type === "slider");
  const featureBanner = banners.filter((banner) => banner.type === "custom");
  const categoryBanner = banners.find((banner) => banner.type === "category");
  const bannerCategoryProducts = products?.filter(
    (fp) => fp.category_id._id === categoryBanner?.category_id._id
  );

  const getDiscountedCategories = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_baseURL}/products/discount/categories`
    );
    setDiscountCategories(response.data.categories);
  };

  const getFeatureProducts = async () => {
    const featuredProducts = products?.filter((fp) => fp.is_featured === true);
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/products/featured`);
    setFeatureProducts(featuredProducts);
  };

  // const getBanners = async () => {
  //   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/banners`);
  //   setBanner(data.banners);
  // }

  useEffect(() => {
    getDiscountedCategories();
    getFeatureProducts();
    // getBanners();
  }, []);

  return (
    <div className="index_wrapper">
      <Head>
        <title>Ashley Home</title>
        <meta name="description" content="Ashley Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {!parentCategories ? (
        <h1
          style={{
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}>{" "}
          <Image src={loader} alt="Loading..." height={100} width={100} />
        </h1>
      ) : ( */}
      <div className={styles.home_wrapper}>
        <Carousal
          // height={460}
          height={600}
          slider={sliders}
          url={`${process.env.NEXT_PUBLIC_uploadURL}/banners/`}
        />

        <ShopByCategories categoriesData={categoriesData} />
        <div className={styles.discount_cards_wrapper}>
          <div className={styles.discount_cards_heading}>
            <h2>Discount in full bloom</h2>
          </div>

          <div className={styles.discount_cards}>
            {discountCategories?.slice(0, 6).map((disproduct) => (
              <DiscountCard products={disproduct} key={disproduct._id} />
            ))}
          </div>
        </div>

        <div className={styles.banner_card_wrapper}>
          {featureBanner?.slice(0, 1).map((item) => (
            <BannerCard key={item._id} banner={item} />
          ))}
        </div>

        {/* Featured Products */}
        <div className={styles.free_shipping}>
          <h4>Swith it up</h4>
          <h2>Update your happy Place</h2>
          <Slider {...settings}>
            {featureProducts?.map((item) => (
              <CategoryCard product={item} key={item._id} />
            ))}
          </Slider>
        </div>

        {/* Category Banner */}
        <div className={styles.thin_banner_wrapper}>
          <ThinBannerCard categoryBanner={categoryBanner} />
        </div>

        <div className={styles.free_shipping}>
          {bannerCategoryProducts && (
            <>
              <h4>Swith it up!</h4>
              <h2>Update your happy Place</h2>
            </>
          )}
          <Slider {...settings}>
            {bannerCategoryProducts?.map((item) => (
              <CategoryCard product={item} key={item._id} />
            ))}
          </Slider>
        </div>

        <div className={styles.chatbot_wrapper}>
          <div className={styles.chatbot}>{botShow && <ChatBot />}</div>
          <div
            className={styles.chatbot_icon}
            onClick={() => setBotShow(!botShow)}
          >
            {botShow ? <AiOutlineDown /> : <BsChatDots />}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_baseURL}/categories/fetch/categories`
  );
  const categoriesData = data.categories;

  return {
    props: {
      categoriesData,
    },
  };
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/categories/fetch/categories`);
//     const catData = await categoriesRes.json();
//     const categoriesData = catData.categories;
//     store.dispatch(fetchCategory(categoriesData));
//     return {
//       props: { categoriesData },
//     };
//   })

export default Home;
