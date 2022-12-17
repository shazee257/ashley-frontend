import React, { useEffect, useState } from "react";
import ProgressBar from "../../../components/Progressbar";
import ReactStars from "react-stars";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
// import { addToCart } from "../../../app/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../app/features/productSlice";
import { selectCategory } from "../../../app/features/categorySlice";
import { selectLoginData, setLogin } from "../../../app/features/loginSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  selectWishlistData,
} from "../../../app/features/wishlistSlice";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import ProductCarousal from "../../../components/productCarousal.jsx";
// import Accordion from "../../../components/Accordion";
// import product from "../../../styles/ProductDetail.module.scss";
import productCss from "../../../styles/ProductDetailNew.module.scss";

import { Link } from "@mui/material";
import { MdOutlinePhotoCameraBack } from "react-icons/md";

// import shipping_delivery from "../../assets/helpicon/shipping-delivery.png";

import { IoChatbubblesOutline } from "react-icons/io";
// import Slider from "react-slick";
// import bed from "../../../pages/assets/bed.webp";

import { useRouter } from "next/router";

import Slider from "react-slick";
// import styles from "../styles/Practiceslider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { addItemToCart } from "../../../app/features/cartSlice";
import ProductDetailsModal from "../../../components/ProductDetailsModal";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        // background: "black",
        background: "#909090",
        paddingTop: "1.5px",
        color: "orange",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#909090",
        height: "20px",
        paddingTop: "1.5px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function ProductDetail({ product, reviews }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const loginData = useSelector(selectLoginData);
  const products = useSelector(selectProducts);
  const wishlistData = useSelector(selectWishlistData);
  const categories = useSelector(selectCategory);

  const currentCategory = categories.find(
    (cat) => cat._id === product.category_id._id
  );
  const parentCategory = categories.find(
    (cat) => cat._id == currentCategory.parent_id
  );

  const isProductIdInWishlist = (id) => wishlistData.includes(id);

  const wishlistHandler = async (productId) => {
    if (loginData) {
      if (isProductIdInWishlist(productId)) {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`,
          { productId }
        );
        if (data.success) {
          dispatch(removeItemFromWishlist(productId));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_baseURL}/wishlist/${loginData.user_id}`,
          { productId }
        );
        if (data.success) {
          dispatch(addItemToWishlist(productId));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } else {
      push("/login");
    }
  };

  const totalstar = 25;
  const obtainedstarData = [
    { completed: 16 },
    { completed: 7 },
    { completed: 2 },
    { completed: 0 },
    { completed: 0 },
  ];

  const getRating = (obtainedValue) => {
    return (obtainedValue / totalstar) * 100;
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedFeature, setSelectedFeature] = useState(
    product.variants[0].features[0]
  );
  const [selectedImage, setSelectedImage] = useState(
    product.variants[0].features[0].images[0]
  );
  const [activeIndex, setActiveIndex] = useState(1);

  // Fetching similar category productsw with Min and Max price
  const filterSimilarProducts = products?.filter(
    (p) => p.category_id._id === product.category_id._id
  );

  const siblingProductsWithPrices = filterSimilarProducts?.map((p) => {
    const prices = p.variants.map((v) => v.sale_price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return { ...p, minPrice, maxPrice };
  });

  // siblingProducts
  const siblingProductsExceptCurrent = siblingProductsWithPrices?.filter(
    (p) => p._id !== product._id
  );

  // get colors
  const getColors = () => {
    let colors = [];
    selectedVariant.features.map((f) => {
      colors.push({
        id: f.color_id.id,
        title: f.color_id.title,
        image: f.color_id.image,
      });
    });
    return colors;
  };

  const colors = getColors();

  // get sizes
  const getSizes = () => {
    let sizes = [];
    product.variants.map((v) => {
      sizes.push({ id: v._id, size: v.size });
    });
    return sizes;
  };

  const sizes = getSizes();

  const sizeChangeHandler = (i) => {
    const variant = product.variants[i];
    setSelectedVariant(variant);
    setSelectedFeature(variant.features[0]);
    setSelectedImage(variant.features[0].images[0]);
  };

  const colorChangeHandler = (i) => {
    const feature = selectedVariant.features[i];
    setSelectedFeature(feature);
    setSelectedImage(feature.images[0]);
  };

  const imageChangeHandler = (i) => {
    const image = selectedFeature.images[i];
    setSelectedImage(image);
  };

  const quantityIncrementHandler = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const quantityDecrementHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = async () => {
    const cartItem = {
      title: product.title,
      size: selectedVariant.size,
      color: selectedFeature.color_id.title,
      sku: selectedFeature.sku,
      price: selectedVariant.sale_price,
      quantity,
      image: selectedImage,
      total: quantity * selectedVariant.sale_price,
      product_id: product._id,
    };

    if (loginData) {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_baseURL}/cart/${loginData.user_id}`,
        cartItem
      );
      if (data.success) {
        // get new element from data.products
        const newProduct = data.data.products[data.data.products.length - 1];
        dispatch(addItemToCart(newProduct));
        console.log("newProduct", newProduct);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  // useEffect(() => {
  //   setCartDetail({
  //     ...cartDetail,
  //     _id: productDetail._id,
  //     title: productDetail.title,
  //     price: Number(
  //       price.slice(sizeID, sizeID + 1).map((price) => price)[0]
  //     ).toFixed(2),
  //     size: sizes[sizeID],
  //     color: colors.slice(sizeID, sizeID + 1).map((color) => color[colorID])[0]
  //       .title,
  //     sku: sku.slice(sizeID, sizeID + 1).map((sku) => sku[colorID])[0],
  //     image: images[0].map((image) => image[0])[0],
  //     quantity: Number(productQuantity),
  //   });

  // }, [sizeID, colorID, productQuantity]);

  const options = {
    edit: false,
    color1: "rgb(20,20,20,0.1)",
    color2: "tomato",
    value: product.rating,
  };

  const settings = {
    dots: true,
    // infinite: true,
    infinite: false,
    // speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    autoplay: false,
    autoplaySpeed: 3000,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const siblingproductssettings = {
    dots: true,
    // infinite: true,
    infinite: false,
    // speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    autoplay: false,
    autoplaySpeed: 3000,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // related producs responsive start :::::
  const [siblingProductsSlider, setSiblingProductsSlider] = useState({});

  const updateSize = () =>
    setSiblingProductsSlider({
      x: window.innerWidth,
    });

  useEffect(() => (window.onresize = updateSize), []);

  if (siblingProductsSlider.x < 1024) {
    siblingproductssettings.slidesToShow = 3;
  }
  if (siblingProductsSlider.x < 769) {
    siblingproductssettings.slidesToShow = 2;
  }
  if (siblingProductsSlider.x < 480) {
    siblingproductssettings.slidesToShow = 1;
  }

  // related producs responsive end  :::::::::

  const activeLinkHandler = (i) => setActiveIndex(i);

  return (
    <div className={productCss.product_detail_wrapper}>
      <div>
        <ProductDetailsModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
      <BreadCrumbs
        parentCategoryTitle={parentCategory.title}
        categoryTitle={currentCategory.title}
        categorySlug={currentCategory.slug}
        productTitle={product.title}
      />

      <div className={productCss.img_and_detail}>
        <div className={productCss.image_detail}>
          {/* Large Image */}
          <div className={productCss.large_img_div}>
            <Image
              src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${selectedImage}`}
              alt="Picture of the author"
              layout="fill"
              className={productCss.img}
              priority={true}
            />
          </div>

          {/* Slider Images */}
          <div className={productCss.productslider_wrapper}>
            <Slider {...settings}>
              {selectedFeature.images.map((image, index) => (
                <div
                  className={productCss.imagediv}
                  key={index}
                  onClick={() => imageChangeHandler(index)}
                >
                  <Image
                    // className="cursor-pointer  hover:opacity-70"
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
                    alt="Picture of the author"
                    // width={150}
                    // height={100}
                    // layout="fixed"
                    // className={productCss.image}
                    layout="fill"
                    priority={true}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className={productCss.product_detail}>
          <div className={productCss.name_price}>
            <h2> {product.title}</h2>
            <p>Item Code: {selectedFeature.sku}</p>
            <div className={productCss.flex + " " + productCss.reviews}>
              <div className={productCss.flex}>
                <ReactStars {...options} />
              </div>
              <p>{`${reviews.length} Reviews`}</p>
            </div>
            <div className={productCss.flex + " " + productCss.price}>
              <h3>${selectedVariant.sale_price}</h3>
            </div>
            <div className={productCss.reatail_price}>
              <MdOutlinePhotoCameraBack className={productCss.icon} />
              <div className={productCss.reatail_price_para}>
                <span className={productCss.bold}>
                  or $71/mo w/12 mos special financing
                </span>
                <span
                  className={productCss.lern_how}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Learn More
                </span>
                <br />
                span Based on retail price of $849.99 (sales & promotion
                excluded)
              </div>
            </div>
            <p className={productCss.local_store}>
              <span className={productCss.bold}>
                Local Store Prices and Products may very by location .
              </span>
              Prices displayed in USD only.
            </p>
            <div className={productCss.special_offer}>
              <span className={productCss.right_border}>SPECIAL OFFER</span>
              <span className={productCss.left_border}>
                Save 5% with code : LDSAVINGS
              </span>
            </div>
          </div>
          <div className={productCss.color_size_wrapper}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="flex items-center justify-center ">
                  <Typography sx={{ marginRight: "10px" }}>Color: </Typography>
                  <Image
                    className="rounded-xl"
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/colors/${selectedFeature.color_id.image}`}
                    width={22}
                    height={22}
                    priority={true}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "3px",
                    }}
                  >
                    {selectedFeature.color_id.title}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={productCss.color_detail_wrapper}>
                {colors &&
                  colors.map((color, i) => (
                    <div
                      className={productCss.color_detail_div}
                      key={i}
                      onClick={() => colorChangeHandler(i)}
                    >
                      <div className="flex">
                        <div className={productCss.color_detail_img_div}>
                          <Image
                            className="rounded-xl"
                            src={`${process.env.NEXT_PUBLIC_uploadURL}/colors/${color.image}`}
                            layout="fill"
                            priority={true}
                            // width={24}
                            // height={24}
                          />
                        </div>
                        <span className={productCss.color_detail_color_name}>
                          {color.title}
                        </span>
                      </div>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>

            {/* Size Accordion */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Size: {selectedVariant.size}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ display: "flex" }}>
                {sizes.map((size, i) => (
                  <Typography
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontWeight: "500",
                    }}
                    key={i}
                    onClick={() => sizeChangeHandler(i)}
                    style={{
                      // height: 36,
                      // width: 36,
                      margin: "0 5px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "10%",
                      boxShadow: "0 0 5px grey",
                      justifyContent: "center",
                    }}
                  >
                    {size.size}
                  </Typography>
                ))}
                {/* <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography> */}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>

      <div className={productCss.product_features_and_subtotal}>
        {/* 4 Tabs Section */}
        <div className={productCss.features}>
          {/* 4 Product Specs Tabs */}
          <div className={productCss.feature_heading}>
            <h4
              onClick={() => activeLinkHandler(1)}
              style={
                activeIndex === 1
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }
            >
              Details and Overview
            </h4>
            <h4
              onClick={() => activeLinkHandler(2)}
              style={
                activeIndex === 2
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }
            >
              Products Reviews
            </h4>
            <h4
              onClick={() => activeLinkHandler(3)}
              style={
                activeIndex === 3
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }
            >
              Closest Stores
            </h4>
            <h4
              onClick={() => activeLinkHandler(4)}
              style={
                activeIndex === 4
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }
              className={productCss.last_line}
            >
              Product Video
            </h4>
          </div>
          {activeIndex === 1 && (
            <div className={productCss.overview}>
              <div
                className={productCss.description}
                dangerouslySetInnerHTML={{
                  __html: selectedVariant.description,
                }}
              ></div>
              <div
                className={productCss.dimenstion}
                dangerouslySetInnerHTML={{ __html: selectedVariant.dimensions }}
              ></div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className={productCss.reviews}>
              <div className={productCss.overall_ratings}>
                <div className={productCss.total_rating}>
                  <div
                  // style={{
                  //   fontSize: "30px",
                  //   margin: "0 10px 0 0",
                  //   color: "gold",
                  // }}
                  >
                    <ReactStars {...options} />
                  </div>
                  <p className={productCss.rating}>
                    {product.rating.toFixed(1)} / 5.0
                  </p>
                  <p className={productCss.reiw}>
                    {`${reviews.length}  Reviews`}
                  </p>
                </div>
                <div className={productCss.total_star_wrapper}>
                  {/* <div className={productCss.total_star}> */}
                  {obtainedstarData.map((item, idx) => (
                    <div
                      // style={{
                      //   display: "flex",
                      //   alignItems: "center",
                      //   marginBottom: "10px",
                      // }}
                      className={productCss.total_star}
                    >
                      <div>5 star</div>
                      <div>
                        <ProgressBar
                          key={idx}
                          //   bgcolor={item.bgcolor}
                          //   bgcolor="blue"
                          // completed={item.completed}
                          completed={getRating(item.completed)}
                        />
                      </div>
                      <div className={productCss.total_star_number}>5</div>
                    </div>
                  ))}

                  <div className={productCss.review_button}>
                    <button>WRITE A REVIEW</button>
                  </div>
                </div>
              </div>

              {reviews.length > 0 &&
                reviews.map((review) => (
                  <div
                    className={productCss.review_by_customer}
                    key={review._id}
                  >
                    <div>
                      <ReactStars {...options} />
                    </div>
                    <h6 className={productCss.review_title}>{review.title}</h6>
                    <p className={productCss.review_discription}>
                      {review.description}
                    </p>
                    <div className={productCss.review_discription}>
                      <div className={productCss.review_img_wrapper}>
                        {review.images.length > 0 &&
                          review.images.map((image) => (
                            <div className={productCss.review_img}>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_uploadURL}/reviews/${image}`}
                                alt="revie wpicture"
                                layout="fill"
                                className={productCss.img}
                                priority={true}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className={productCss.review_personal_info}>
                      <p className={productCss.para}>
                        {`${review.user_id.first_name} ${review.user_id.last_name}`}
                      </p>
                      <p className={productCss.margin_left}>
                        {moment(review.createdAt).format("YYYY/MM/DD")}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeIndex === 3 && <div>Closest Stores</div>}

          {activeIndex === 4 && (
            <div className={productCss.product_video_wrapper}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=EUhIIbiFrCs"
                className={productCss.product_video}
                playing
                width="100%"
                height="100%"
                controls={false}
              />
            </div>
          )}
        </div>

        {/* Quantity */}
        {selectedFeature.quantity > 0 ? (
          <div className={productCss.subtotal_wrapper}>
            <h3 className={productCss.subtotal_heading}>
              Subtotal: $ {(quantity * selectedVariant.sale_price).toFixed(2)}
            </h3>
            {selectedFeature.quantity < 10 && (
              <h3 style={{ color: "red", fontSize: "14px" }}>
                {"Hurry Up! Only"}
                <span
                  style={{
                    borderRadius: "50%",
                    boxShadow: "0 0 5px red",
                    padding: "4px 10px",
                    margin: "0 5px",
                  }}
                >
                  {selectedFeature.quantity}
                </span>
                items left
              </h3>
            )}

            <div className={productCss.qty_wrapper}>
              <div className={productCss.add_cartItems_wrapper}>
                <h3>Qty:</h3>
                <div className={productCss.qty}>
                  <p onClick={quantityDecrementHandler}>-</p>
                  <p>{quantity}</p>
                  <p onClick={quantityIncrementHandler}>+</p>
                </div>
              </div>
              <div className={productCss.btn_logo_wrapper}>
                <button onClick={addToCartHandler}>Add Items to Cart</button>
                <div
                  className={productCss.icon}
                  onClick={() => wishlistHandler(product._id)}
                >
                  {isProductIdInWishlist(product._id) ? (
                    <AiFillHeart className={productCss.heart} />
                  ) : (
                    <AiOutlineHeart className={productCss.heart} />
                  )}
                </div>
              </div>
            </div>
            <div className={productCss.delivery}>
              <h6>Delivery Options</h6>
              <p>Free Ground Shipping</p>
              <p>Usually ships in 1 to 2 weeks</p>
            </div>
            <div className={productCss.expert_service}>
              <div>
                <h6>Add Expert Service</h6>{" "}
                <h5>Expert Assembly & Installation by Handy</h5>
                <div>
                  <Switch
                    checked={true} //{checked}
                    // onChange={(e) => setChecked(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <p>Add Service - $91.50 (applies per item)</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={productCss.out_of_stock}>
            <h4>
              Subtotal: <span>${quantity * selectedVariant.sale_price}</span>
            </h4>
            <div className={productCss.heading_and_icon}>
              <h4>Temporarily Out of Stock</h4>
              <div
                className={productCss.icon}
                // onClick={addToWishHandler}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: "50%",
                  boxShadow: "0 0 2px grey",
                }}
              >
                {isProductIdInWishlist(product._id) ? (
                  <AiFillHeart
                    className={productCss.heart}
                    onClick={() => wishlistHandler(product._id)}
                  />
                ) : (
                  <AiOutlineHeart
                    className={productCss.heart}
                    onClick={() => wishlistHandler(product._id)}
                  />
                )}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedFeature.zero_stock_msg,
              }}
              style={{ padding: 10 }}
            ></div>
          </div>
        )}
      </div>

      <div className={productCss.realted_product_wrapper}>
        <p className={productCss.realted_product_heading}>YOU MAY ALSO LIKE</p>

        <Slider {...siblingproductssettings}>
          {siblingProductsExceptCurrent?.map((p) => (
            <div className={productCss.realtedProduct_cardWrapper} key={p._id}>
              <div className={productCss.heart}>
                <h4 className={productCss.icon}>
                  {isProductIdInWishlist(p._id) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </h4>
                <h4
                  className={productCss.display}
                  onClick={() => wishlistHandler(p._id)}
                >
                  Add to Wishlist
                </h4>
              </div>
              <Link href={`/products/details?slug=${p.slug}`}>
                <div className={productCss.realted_product_imagediv}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${p.variants[0].features[0].images[0]}`}
                    alt="Picture of the author"
                    layout="fill"
                    className={productCss.realted_product_image}
                    priority={true}
                  />
                </div>
              </Link>
              <h6>{p.title}</h6>
              <div className={productCss.star}>
                <ReactStars
                  value={p.rating}
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
              </div>
              <h5>{`$${p.minPrice} - $${p.maxPrice}`}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_baseURL}/products/${slug}`
  );

  const data = await res.json();
  const { product, reviews } = data;

  return {
    props: {
      product,
      reviews,
    },
  };
};

export default ProductDetail;
