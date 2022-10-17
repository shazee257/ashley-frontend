import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import { addToCart } from "../../../app/features/cartSlice";
import { useDispatch } from "react-redux";
import { fetchProducts, selectProducts } from "../../../app/features/productSlice";
import { fetchCategory, selectCategory } from "../../../app/features/categorySlice";
import { addToWishlist } from "../../../app/features/wishlistSlice";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AiFillStar } from "react-icons/ai";
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

import Slider from "react-slick";
// import styles from "../styles/Practiceslider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bed from "../../assets/bed.webp";
import ReactPlayer from "react-player";

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

const ProductDetail = ({ product, reviews }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedFeature, setSelectedFeature] = useState(product.variants[0].features[0]);
  const [selectedImage, setSelectedImage] = useState(product.variants[0].features[0].images[0]);
  const [activeIndex, setActiveIndex] = useState(1);

  // get colors
  const getColors = () => {
    let colors = [];
    product.variants[0].features.map((f) => {
      colors.push({
        id: f.color_id.id,
        title: f.color_id.title,
        image: f.color_id.image,
      });
    });
    return colors;
  }

  const colors = getColors();

  // get sizes
  const getSizes = () => {
    let sizes = [];
    product.variants.map((v) => {
      sizes.push({ id: v._id, size: v.size });
    });
    return sizes;
  }

  const sizes = getSizes();

  const sizeChangeHandler = (i) => {
    const variant = product.variants[i];
    setSelectedVariant(variant);
    setSelectedFeature(variant.features[0]);
    setSelectedImage(variant.features[0].images[0]);
  }

  const colorChangeHandler = (i) => {
    const feature = selectedVariant.features[i];
    setSelectedFeature(feature);
    setSelectedImage(feature.images[0]);
  }

  const imageChangeHandler = (i) => {
    const image = selectedFeature.images[i];
    setSelectedImage(image);
  }

  const quantityIncrementHandler = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  const quantityDecrementHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  console.log("reviews", reviews);
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

  const activeLinkHandler = (i) => setActiveIndex(i);

  return (
    <div className={productCss.product_detail_wrapper}>
      <div className={productCss.bread_crumbs}>
        <Link href="/">
          <span>Home </span>
        </Link>
        /<span>Furniture </span> /<span>Living Room Furniture</span> /
        <span>Sofa & Couches</span> /
        <span className={productCss.last_span}>Maimz Sofa</span>
      </div>

      <div className={productCss.img_and_detail} key={product._id}>
        <div className={productCss.image_detail}>
          {/* Large Image */}
          <div className={productCss.large_img_div}>
            <Image
              src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${selectedImage}`}
              alt="Picture of the author"
              layout="fill"
              className={productCss.img}
            />
          </div>

          {/* Slider Images */}
          <div className={productCss.productslider_wrapper}>
            <Slider {...settings}>
              {selectedFeature.images.map((image, index) => (
                <div className={productCss.imagediv} key={index}
                  onClick={() => imageChangeHandler(index)}
                >
                  <Image
                    className="cursor-pointer  hover:opacity-70"
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/products/${image}`}
                    alt="Picture of the author"
                    width={150} height={100} layout="fixed"
                  // className={productCss.image}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className={productCss.product_detail}>
          <div className={productCss.name_price}>
            <h2> {product.title} </h2>
            <p>Item Code:  {selectedFeature.sku}</p>
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
              <p>
                <span className={productCss.bold}>
                  or $71/mo w/12 mos special financing
                </span>
                <span className={productCss.lern_how}> Learn How </span> <br />
                span Based on retail price of $849.99 (sales & promotion
                excluded)
              </p>
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
          <div style={{ width: "100%" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="flex items-center justify-center ">
                  <Typography sx={{ marginRight: '10px' }}>
                    Color: {" "}
                  </Typography>
                  <Image className="rounded-xl"
                    src={`${process.env.NEXT_PUBLIC_uploadURL}/colors/${selectedFeature.color_id.image}`} width={22} height={22} />
                  <Typography sx={{ display: "flex", alignItems: "center", marginLeft: '3px' }}>
                    {selectedFeature.color_id.title}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ display: "flex", cursor: "pointer" }}>
                {colors && colors.map((color, i) => (
                  <div
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "space-around"
                    }}
                    key={i}
                    onClick={() => colorChangeHandler(i)}
                  >
                    <div className="flex">
                      <Image className="rounded-xl"
                        src={`${process.env.NEXT_PUBLIC_uploadURL}/colors/${color.image}`} width={24} height={24} />
                      <span className="pl-2 pr-5">{color.title}</span>
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
            <h4 onClick={() => activeLinkHandler(1)}
              style={
                activeIndex === 1
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }>Details and Overview</h4>
            <h4 onClick={() => activeLinkHandler(2)}
              style={
                activeIndex === 2
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }>Products Reviews</h4>
            <h4 onClick={() => activeLinkHandler(3)}
              style={
                activeIndex === 3
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }>Closest Stores</h4>
            <h4
              onClick={() => activeLinkHandler(4)}
              style={
                activeIndex === 4
                  ? { color: "grey", borderBottom: "3px solid grey" }
                  : { color: "black" }
              }
              className={productCss.last_line}
            >Product Video</h4>
          </div>
          {activeIndex === 1 && (
            <div className={productCss.overview}>
              <div className={productCss.description}
                dangerouslySetInnerHTML={{ __html: selectedVariant.description }}>
              </div>
              <div className={productCss.dimenstion}
                dangerouslySetInnerHTML={{ __html: selectedVariant.dimensions }}>
              </div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className={productCss.reviews}>
              <div
                className={productCss.overall_ratings}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                }}>
                <div className={productCss.total_rating}>
                  <h1>{product.rating} <span>/5.0</span>
                  </h1>
                  <span
                    style={{
                      fontSize: "30px",
                      margin: "0 10px 0 0",
                      color: "gold",
                    }}
                  >
                    <ReactStars {...options} />
                  </span>
                  <span>5 Ratings</span>
                </div>
                <div>
                  <div
                    className={productCss.rating_by_stars}
                    style={{ display: "flex" }}
                  >
                    <span style={{ margin: "", color: "gold" }}>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </span>
                    <div
                      style={{
                        height: 10,
                        width: 100,
                        backgroundColor: "gold",
                        margin: "10px",
                      }}
                    ></div>
                    <span>5</span>
                  </div>
                  <div
                    className={productCss.rating_by_stars}
                    style={{ display: "flex" }}
                  >
                    <span style={{ margin: "", color: "gold" }}>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </span>
                    <div
                      style={{
                        height: 10,
                        width: 100,
                        backgroundColor: "gold",
                        margin: "10px",
                      }}
                    ></div>
                    <span>5</span>
                  </div>
                  <div
                    className={productCss.rating_by_stars}
                    style={{ display: "flex" }}
                  >
                    <span style={{ margin: "", color: "gold" }}>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </span>
                    <div
                      style={{
                        height: 10,
                        width: 100,
                        backgroundColor: "gold",
                        margin: "10px",
                      }}
                    ></div>
                    <span>5</span>
                  </div>
                  <div
                    className={productCss.rating_by_stars}
                    style={{ display: "flex" }}
                  >
                    <span style={{ margin: "", color: "gold" }}>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />

                      <AiFillStar />
                    </span>
                    <div
                      style={{
                        height: 10,
                        width: 100,
                        backgroundColor: "gold",
                        margin: "10px",
                      }}
                    ></div>
                    <span>5</span>
                  </div>
                  <div
                    className={productCss.rating_by_stars}
                    style={{ display: "flex" }}
                  >
                    <span style={{ margin: "", color: "gold" }}>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </span>
                    <div
                      style={{
                        height: 10,
                        width: 100,
                        backgroundColor: "gold",
                        margin: "10px",
                      }}
                    ></div>
                    <span>5</span>
                  </div>
                </div>
              </div>
              <div className={productCss.review_by_customer}>
                <h5>Reviews</h5>
                <div>
                  <span style={{ margin: "", color: "gold" }}>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </span>
                </div>
                <h6>By Customer Name</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  iusto quos quibusdam totam officiis, ipsa aliquid quas
                  doloribus enim! Quidem.
                </p>
              </div>
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
          <div className={productCss.subtotal}>
            <h3>Subtotal: $ {(quantity * selectedVariant.sale_price).toFixed(2)}</h3>
            {selectedFeature.quantity < 10 && (
              <h3 style={{ color: "red", fontSize: '14px' }}>
                {'Hurry Up! Only'}
                <span
                  style={{
                    borderRadius: "50%",
                    boxShadow: "0 0 5px red",
                    padding: "4px 10px",
                    margin: "0 5px",
                  }}
                >
                  {selectedFeature.quantity}
                </span>{" "}
                items left
              </h3>
            )}

            <div className={productCss.qty_wrapper}>
              <h3>Qty:</h3>
              <div className={productCss.qty}>
                <p onClick={quantityDecrementHandler}>-</p>
                <p>{quantity}</p>
                <p onClick={quantityIncrementHandler}>+</p>
              </div>
              <button
              // onClick={addToCartHandler}
              >Add Items to Cart</button>
              <div
                className={productCss.icon}
                // onClick={addToWishHandler}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: "50%",
                  boxShadow: "0 0 2px grey",
                }}
              >
                <AiOutlineHeart className={productCss.heart} />
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
          </div>) :
          (<div className={productCss.out_of_stock}>
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
                <AiOutlineHeart className={productCss.heart} />
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedFeature.zero_stock_msg,
              }}
              style={{ padding: 10 }}
            >
            </div>
          </div>
          )}
      </div>
      {/* OK */}

      <div className={productCss.realted_product_wrapper}>
        <p className={productCss.realted_product_heading}>YOU MAY ALSO LIKE</p>


        <Slider {...siblingproductssettings}>
          {/* cardWrapper one */}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>

          {/* cardWrapper two */}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>

          {/* cardWrapper three */}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>

          {/* cardWrapper four */}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>

          {/* cardWrapper five*/}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>

          {/* cardWrapper six*/}
          <div className={productCss.realtedProduct_cardWrapper}>
            <div className={productCss.heart}>
              <h4 className={productCss.icon}>
                <AiOutlineHeart />
              </h4>
              <h4 className={productCss.display}>Add to Wishlist</h4>
            </div>
            <div className={productCss.realted_product_imagediv}>
              <Image
                src={bed}
                alt="Picture of the author"
                layout="fill"
                className={productCss.realted_product_image}
              />
            </div>
            <h6>chiming 12 inch Hybird Matters</h6>
            <div className={productCss.star}>
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
              <AiFillStar className={productCss.icon} />
            </div>
            <h5>$289.99</h5>
            <p>or $49/mo w/6 mos special financing</p>
            <h4>Save 5% wid Code:LDSAVINGS</h4>
            <h3>Free Grounp Shipping</h3>
            <h2>More Products Options Available</h2>
          </div>
        </Slider>
      </div>
      {/* <ProductCarousal height={200} slider={selectedFeature.images} url={process.env.NEXT_PUBLIC_uploadURL} /> */}
    </div >
  );
};

export async function getServerSideProps(context) {
  const { productSlug } = context.query;

  const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/products/${productSlug}`);

  const data = await res.json();
  const { product, reviews } = data;

  return {
    props: {
      product,
      reviews,
    },
  };
}

export default ProductDetail;
