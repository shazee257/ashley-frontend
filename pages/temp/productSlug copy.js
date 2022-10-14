import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import { addToCart } from "../../../app/features/cartSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../app/features/productSlice";
import { fetchCategory } from "../../../app/features/categorySlice";
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

const ProductDetail = ({ productDetail }) => {

  const [product, setProduct] = useState(productDetail);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(productDetail.variants[0].size);
  const [selectedColor, setSelectedColor] = useState(productDetail.variants[0].features[0].color_id.title);

  console.log(selectedSize, "selectedSize");
  console.log(selectedColor, "selectedColor");


  // const cartData = {
  //   _id: "",
  //   title: "",
  //   size: "",
  //   color: "",
  //   price: "",
  //   quantity: "",
  //   image: "",
  //   sku: "",
  // };

  // const [sizeID, setSizeID] = useState(0);
  // const [activeIndex, setActiveIndex] = useState(1);
  // const [colorID, setColorID] = useState(0);
  // const [cartDetail, setCartDetail] = useState(cartData);
  // const [productQuantity, setProductQuantity] = useState(1);
  // const [customeractiveIndex, setCustomerActiveIndex] = useState(1);

  // const dispatch = useDispatch();

  // const [checked, setChecked] = useState(false);

  // // const handleChange = (event) => {
  // //   setChecked(event.target.checked);
  // // };

  // const sizeChangeHandler = (i) => {
  //   setSizeID(i);
  // };
  // const colorChangeHandler = (i) => {
  //   setColorID(i);
  // };

  // const decQuantity = () => {
  //   productQuantity > 1
  //     ? setProductQuantity(productQuantity - 1)
  //     : productQuantity;
  // };
  // const incQuantity = () => {
  //   setProductQuantity(productQuantity + 1);
  // };

  // const sizes = productDetail.variants.map((variant) => {
  //   return variant.size;
  // });
  // const price = productDetail.variants.map((variant) => {
  //   return variant.sale_price;
  // });
  // const desc = productDetail.variants.map((variant) => {
  //   return variant.description;
  // });
  // const dimension = productDetail.variants.map((variant) => {
  //   return variant.dimensions;
  // });
  // const colors = productDetail.variants.map((variant) => {
  //   return variant.features.map((feature) => {
  //     return feature.color_id;
  //   });
  // });
  // const colorImg = productDetail.variants.map((variant) => {
  //   return variant.features.map((feature) => {
  //     return feature.color_id.image;
  //   });
  // });
  // const sku = productDetail.variants.map((variant) => {
  //   return variant.features.map((feature) => {
  //     return feature.sku;
  //   });
  // });
  // const stock = productDetail.variants.map((variant) => {
  //   return variant.features.map((feature) => {
  //     return feature.quantity;
  //   });
  // });
  // const zeroStock = productDetail.variants.map((variant) => {
  //   return variant.features.map((feature) => {
  //     return feature.zero_stock_msg;
  //   });
  // });

  // const zeroStockMsg = zeroStock
  //   .slice(sizeID, sizeID + 1)
  //   .map((stock) => stock[colorID])[0];

  // const stockInHand = stock
  //   .slice(sizeID, sizeID + 1)
  //   .map((stock) => stock[colorID])[0];

  // // const stockInHand = 0;

  // const images = productDetail.variants
  //   .slice(sizeID, sizeID + 1)
  //   .map((variant) => {
  //     return variant.features.slice(colorID, colorID + 1).map((feature) => {
  //       return feature.images.map((images) => {
  //         return images;
  //       });
  //     });
  //   });
  // const slider = images[0];

  // useEffect(() => {
  //   dispatch(fetchCategory());
  //   dispatch(fetchProducts());
  // }, [dispatch]);

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

  // const addToCartHandler = () => {
  //   dispatch(addToCart(cartDetail));
  //   setProductQuantity(1);
  // };
  // const addToWishHandler = () => {
  //   dispatch(addToWishlist(cartDetail));
  // };

  // const activeLinkHandler = (id) => {
  //   setActiveIndex(id);
  // };

  // const activeCustomerHandler = (id) => {
  //   setCustomerActiveIndex(id);
  // };

  const options = {
    edit: false,
    color1: "rgb(20,20,20,0.1)",
    color2: "tomato",
    value: productDetail.rating,
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

  // const siblingproductssettings = {
  //   dots: true,
  //   // infinite: true,
  //   infinite: false,
  //   // speed: 1000,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   // autoplay: true,
  //   autoplay: false,
  //   autoplaySpeed: 3000,

  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  // return (
  //   <div className={productCss.product_detail_wrapper}>
  //     <div className={productCss.bread_crumbs}>
  //       <Link href="/">
  //         <span>Home </span>
  //       </Link>
  //       /<span>Furniture </span> /<span>Living Room Furniture</span> /
  //       <span>Sofa & Couches</span> /
  //       <span className={productCss.last_span}>Maimz Sofa</span>
  //     </div>

  //     <div className={productCss.img_and_detail} key={productDetail._id}>
  //       {/* <div className={product.aa}> */}
  //       <div className={productCss.image_detail}>
  //         <div className={productCss.large_img_div}>
  //           <Image
  //             src={bed}
  //             alt="Picture of the author"
  //             layout="fill"
  //             className={productCss.img}
  //           />
  //         </div>

  //         <div className={productCss.productslider_wrapper}>
  //           <Slider {...settings}>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //             <div className={productCss.imagediv}>
  //               <Image
  //                 src={bed}
  //                 alt="Picture of the author"
  //                 layout="fill"
  //                 className={productCss.image}
  //               />
  //             </div>
  //           </Slider>
  //         </div>
  //       </div>

  //       <div className={productCss.product_detail}>
  //         <div className={productCss.name_price}>
  //           <h2> {productDetail.title} </h2>
  //           <p>
  //             Item Code:
  //             {sku.slice(sizeID, sizeID + 1).map((sku) => sku[colorID])[0]}
  //           </p>
  //           <div className={productCss.flex + " " + productCss.reviews}>
  //             <span className={productCss.flex}>
  //               {/* <AiFillStar className={product.icon} />
  //               <AiFillStar className={product.icon} />
  //               <AiFillStar className={product.icon} />
  //               <AiFillStar className={product.icon} />
  //               <AiFillStar className={product.icon} /> */}

  //               <ReactStars {...options} />
  //             </span>
  //             <p>121 Reviews</p>
  //           </div>
  //           <div className={productCss.flex + " " + productCss.price}>
  //             <h3>${price.slice(sizeID, sizeID + 1)}</h3>
  //           </div>
  //           {/* changes work  start*/}
  //           <div className={productCss.reatail_price}>
  //             <MdOutlinePhotoCameraBack className={productCss.icon} />
  //             <p>
  //               <span className={productCss.bold}>
  //                 or $71/mo w/12 mos special financing
  //               </span>
  //               <span className={productCss.lern_how}> Learn How </span> <br />
  //               span Based on retail price of $849.99 (sales & promotion
  //               excluded)
  //             </p>
  //           </div>
  //           <p className={productCss.local_store}>
  //             <span className={productCss.bold}>
  //               Local Store Prices and Products may very by location .
  //             </span>
  //             Prices displayed in USD only.
  //           </p>

  //           <div className={productCss.special_offer}>
  //             <span className={productCss.right_border}>SPECIAL OFFER</span>
  //             <span className={productCss.left_border}>
  //               Save 5% with code : LDSAVINGS
  //             </span>
  //           </div>
  //           {/* changes work end */}
  //         </div>
  //         <div style={{ width: "100%" }}>
  //           <Accordion>
  //             <AccordionSummary
  //               expandIcon={<ExpandMoreIcon />}
  //               aria-controls="panel1a-content"
  //               id="panel1a-header"
  //             >
  //               <Typography sx={{ display: "flex", alignItems: "center" }}>
  //                 Color:{" "}
  //                 {
  //                   colors
  //                     .slice(sizeID, sizeID + 1)
  //                     .map((color) => color[colorID])[0].title
  //                 }
  //                 {/* <span
  //                   style={{
  //                     backgroundImage: `url(${process.env.NEXT_PUBLIC_uploadURL}/colors/${colors
  //                       .slice(sizeID, sizeID + 1)
  //                       .map((color) => color[colorID])[0].image
  //                       })`,
  //                     height: 24,
  //                     width: 24,
  //                     fontWeight: 600,
  //                     borderRadius: "50%",
  //                     display: "flex",
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                     boxShadow: "0 0 2px grey",
  //                     margin: "0 10px",
  //                     backgroundPosition: "center",
  //                     backgroundRepeat: "no-repeat",
  //                     backgroundSize: "cover",
  //                   }}
  //                 ></span> */}
  //               </Typography>
  //             </AccordionSummary>
  //             <AccordionDetails sx={{ display: "flex", cursor: "pointer" }}>
  //               {colors[sizeID].map((color, i) => (
  //                 <Typography
  //                   sx={{
  //                     display: "flex",
  //                     cursor: "pointer",
  //                     marginRight: "8px",
  //                     fontWeight: "500",
  //                   }}
  //                   key={i}
  //                   style={{
  //                     display: "flex",
  //                     justifyContent: "space-around",
  //                   }}
  //                   onClick={() => colorChangeHandler(i)}
  //                 >
  //                   <span>{color.title}</span>
  //                 </Typography>
  //               ))}
  //             </AccordionDetails>
  //           </Accordion>

  //           {/* Size Accordion */}
  //           <Accordion>
  //             <AccordionSummary
  //               expandIcon={<ExpandMoreIcon />}
  //               aria-controls="panel2a-content"
  //               id="panel2a-header"
  //             >
  //               <Typography>Size: {sizes[sizeID]}</Typography>
  //             </AccordionSummary>
  //             <AccordionDetails sx={{ display: "flex", cursor: "pointer" }}>
  //               {sizes.map((size, i) => (
  //                 <Typography
  //                   sx={{
  //                     display: "flex",
  //                     cursor: "pointer",
  //                     marginRight: "8px",
  //                     fontWeight: "500",
  //                   }}
  //                   key={i}
  //                   onClick={() => sizeChangeHandler(i)}
  //                   style={{
  //                     // height: 36,
  //                     // width: 36,
  //                     margin: "0 5px",
  //                     padding: "10px",
  //                     display: "flex",
  //                     alignItems: "center",
  //                     borderRadius: "10%",
  //                     boxShadow: "0 0 5px grey",
  //                     justifyContent: "center",
  //                   }}
  //                 >
  //                   {size}
  //                 </Typography>
  //               ))}
  //               {/* <Typography>
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
  //                 eget.
  //               </Typography> */}
  //             </AccordionDetails>
  //           </Accordion>
  //         </div>
  //       </div>
  //     </div>

  //     <div className={productCss.product_features_and_subtotal}>
  //       <div className={productCss.features}>
  //         <div className={productCss.feature_heading}>
  //           <h4
  //             onClick={() => activeLinkHandler(1)}
  //             style={
  //               activeIndex === 1
  //                 ? { color: "grey", borderBottom: "3px solid grey" }
  //                 : { color: "black" }
  //             }
  //           >
  //             Details and Overview
  //           </h4>
  //           <h4
  //             onClick={() => activeLinkHandler(2)}
  //             style={
  //               activeIndex === 2
  //                 ? { color: "grey", borderBottom: "3px solid grey" }
  //                 : { color: "black" }
  //             }
  //           >
  //             Products Reviews
  //           </h4>
  //           <h4
  //             onClick={() => activeLinkHandler(3)}
  //             style={
  //               activeIndex === 3
  //                 ? { color: "grey", borderBottom: "3px solid grey" }
  //                 : { color: "black" }
  //             }
  //           >
  //             Closest Stores
  //           </h4>
  //           <h4
  //             onClick={() => activeLinkHandler(4)}
  //             style={
  //               activeIndex === 4
  //                 ? { color: "grey", borderBottom: "3px solid grey" }
  //                 : { color: "black" }
  //             }
  //             className={productCss.last_line}
  //           >
  //             Product Video
  //           </h4>
  //         </div>
  //         {activeIndex === 1 && (
  //           <div className={productCss.overview}>
  //             <div
  //               className={productCss.description}
  //               dangerouslySetInnerHTML={{
  //                 __html: desc.slice(sizeID, sizeID + 1),
  //               }}
  //             ></div>
  //             <div
  //               className={productCss.dimenstion}
  //               dangerouslySetInnerHTML={{
  //                 __html: dimension.slice(sizeID, sizeID + 1),
  //               }}
  //             ></div>
  //           </div>
  //         )}

  //         {activeIndex === 2 && (
  //           <div className={productCss.reviews}>
  //             <div
  //               className={productCss.overall_ratings}
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 borderBottom: "1px solid black",
  //               }}
  //             >
  //               <div className={productCss.total_rating}>
  //                 <h1>
  //                   {productDetail.rating} <span>/5.0</span>
  //                 </h1>
  //                 <span
  //                   style={{
  //                     fontSize: "30px",
  //                     margin: "0 10px 0 0",
  //                     color: "gold",
  //                   }}
  //                 >
  //                   <ReactStars {...options} />
  //                 </span>
  //                 <span>5 Ratings</span>
  //               </div>
  //               <div>
  //                 <div
  //                   className={productCss.rating_by_stars}
  //                   style={{ display: "flex" }}
  //                 >
  //                   <span style={{ margin: "", color: "gold" }}>
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                   </span>
  //                   <div
  //                     style={{
  //                       height: 10,
  //                       width: 100,
  //                       backgroundColor: "gold",
  //                       margin: "10px",
  //                     }}
  //                   ></div>
  //                   <span>5</span>
  //                 </div>
  //                 <div
  //                   className={productCss.rating_by_stars}
  //                   style={{ display: "flex" }}
  //                 >
  //                   <span style={{ margin: "", color: "gold" }}>
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                   </span>
  //                   <div
  //                     style={{
  //                       height: 10,
  //                       width: 100,
  //                       backgroundColor: "gold",
  //                       margin: "10px",
  //                     }}
  //                   ></div>
  //                   <span>5</span>
  //                 </div>
  //                 <div
  //                   className={productCss.rating_by_stars}
  //                   style={{ display: "flex" }}
  //                 >
  //                   <span style={{ margin: "", color: "gold" }}>
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                   </span>
  //                   <div
  //                     style={{
  //                       height: 10,
  //                       width: 100,
  //                       backgroundColor: "gold",
  //                       margin: "10px",
  //                     }}
  //                   ></div>
  //                   <span>5</span>
  //                 </div>
  //                 <div
  //                   className={productCss.rating_by_stars}
  //                   style={{ display: "flex" }}
  //                 >
  //                   <span style={{ margin: "", color: "gold" }}>
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />

  //                     <AiFillStar />
  //                   </span>
  //                   <div
  //                     style={{
  //                       height: 10,
  //                       width: 100,
  //                       backgroundColor: "gold",
  //                       margin: "10px",
  //                     }}
  //                   ></div>
  //                   <span>5</span>
  //                 </div>
  //                 <div
  //                   className={productCss.rating_by_stars}
  //                   style={{ display: "flex" }}
  //                 >
  //                   <span style={{ margin: "", color: "gold" }}>
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                     <AiFillStar />
  //                   </span>
  //                   <div
  //                     style={{
  //                       height: 10,
  //                       width: 100,
  //                       backgroundColor: "gold",
  //                       margin: "10px",
  //                     }}
  //                   ></div>
  //                   <span>5</span>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className={productCss.review_by_customer}>
  //               <h5>Reviews</h5>
  //               <div>
  //                 <span style={{ margin: "", color: "gold" }}>
  //                   <AiFillStar />
  //                   <AiFillStar />
  //                   <AiFillStar />
  //                   <AiFillStar />
  //                   <AiFillStar />
  //                 </span>
  //               </div>
  //               <h6>By Customer Name</h6>
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
  //                 iusto quos quibusdam totam officiis, ipsa aliquid quas
  //                 doloribus enim! Quidem.
  //               </p>
  //             </div>
  //           </div>
  //         )}

  //         {activeIndex === 3 && <div>Closest Stores</div>}

  //         {activeIndex === 4 && (
  //           <div className={productCss.product_video_wrapper}>
  //             <ReactPlayer
  //               url="https://www.youtube.com/watch?v=EUhIIbiFrCs"
  //               className={productCss.product_video}
  //               playing
  //               width="100%"
  //               height="100%"
  //               controls={false}
  //             />
  //           </div>
  //         )}
  //       </div>

  //       {stockInHand > 0 ? (
  //         <div className={productCss.subtotal}>
  //           <h3>Subtotal: $ {productQuantity * cartDetail.price}</h3>
  //           {stockInHand <= 9 && (
  //             <h3 style={{ color: "red" }}>
  //               Hurry Up Only{" "}
  //               <span
  //                 style={{
  //                   borderRadius: "50%",
  //                   boxShadow: "0 0 5px red",
  //                   padding: "2px 10px",
  //                 }}
  //               >
  //                 {stockInHand}
  //               </span>{" "}
  //               Items Left
  //             </h3>
  //           )}

  //           {/* <div className={productCss.qty_wrapper}>
  //             <h3>Qty:</h3>
  //             <div className={productCss.qty}>
  //               <p onClick={decQuantity}>-</p>
  //               <p>{productQuantity}</p>
  //               <p onClick={incQuantity}>+</p>
  //             </div>
  //             <button onClick={addToCartHandler}>Add Items to Cart</button>
  //             <div
  //               className={productCss.icon}
  //               onClick={addToWishHandler}
  //               style={{
  //                 height: 50,
  //                 width: 50,
  //                 borderRadius: "50%",
  //                 boxShadow: "0 0 2px grey",
  //               }}
  //             >
  //               <AiOutlineHeart className={productCss.heart} />
  //             </div>
  //           </div> */}
  //           {/* <div className={productCss.delivery}>
  //             <h6>Delivery Options</h6>
  //             <p>Free Ground Shipping</p>
  //             <p>Usually ships in 1 to 2 weeks</p>
  //           </div>
  //           <div className={productCss.expert_service}>
  //             <div>
  //               <h6>Add Expert Service</h6>{" "}
  //               <h5>Expert Assembly & Installation by Handy</h5>
  //               <div>
  //                 <Switch
  //                   checked={checked}
  //                   onChange={(e) => setChecked(e.target.checked)}
  //                   inputProps={{ "aria-label": "controlled" }}
  //                 />
  //                 <p>Add Service - $91.50 (applies per item)</p>
  //               </div>
  //             </div>
  //           </div> */}
  //         </div>) :
  //         (<div className={productCss.out_of_stock}>
  //             <h4>
  //               Subtotal: <span>${productQuantity * cartDetail.price}</span>
  //             </h4>
  //             <div className={productCss.heading_and_icon}>
  //               <h4>Temporarily Out of Stock</h4>
  //               <div
  //                 className={productCss.icon}
  //                 onClick={addToWishHandler}
  //                 style={{
  //                   height: 40,
  //                   width: 40,
  //                   borderRadius: "50%",
  //                   boxShadow: "0 0 2px grey",
  //                 }}
  //               >
  //                 <AiOutlineHeart className={productCss.heart} />
  //               </div>
  //             </div>
  //             <div
  //               dangerouslySetInnerHTML={{
  //                 __html: zeroStockMsg,
  //               }}
  //               style={{ padding: 10 }}
  //             >
  //             </div>
  //           </div>
  //         )}
  //     </div>

  //     {/* <div className={productCss.realted_product_wrapper}>
  //       <p className={productCss.realted_product_heading}>YOU MAY ALSO LIKE</p>
  //       <Slider {...siblingproductssettings}> */}
  //         {/* cardWrapper one */}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}

  //         {/* cardWrapper two */}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}

  //         {/* cardWrapper three */}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}

  //         {/* cardWrapper four */}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}

  //         {/* cardWrapper five*/}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}

  //         {/* cardWrapper six*/}
  //         {/* <div className={productCss.realtedProduct_cardWrapper}>
  //           <div className={productCss.heart}>
  //             <h4 className={productCss.icon}>
  //               <AiOutlineHeart />
  //             </h4>
  //             <h4 className={productCss.display}>Add to Wishlist</h4>
  //           </div>
  //           <div className={productCss.realted_product_imagediv}>
  //             <Image
  //               src={bed}
  //               alt="Picture of the author"
  //               layout="fill"
  //               className={productCss.realted_product_image}
  //             />
  //           </div>
  //           <h6>chiming 12 inch Hybird Matters</h6>
  //           <div className={productCss.star}>
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //             <AiFillStar className={productCss.icon} />
  //           </div>
  //           <h5>$289.99</h5>
  //           <p>or $49/mo w/6 mos special financing</p>
  //           <h4>Save 5% wid Code:LDSAVINGS</h4>
  //           <h3>Free Grounp Shipping</h3>
  //           <h2>More Products Options Available</h2>
  //         </div> */}
  //       {/* </Slider> */}
  //     {/* </div> */}
  //   </div>
  // );
};

export async function getServerSideProps(context) {
  const { productSlug } = context.query;

  const res = await fetch(`https://ashley-api.herokuapp.com/products/${productSlug}`);

  const data = await res.json();
  const productDetail = data.product;
  return {
    props: { productDetail }, // will be passed to the page component as props
  };
}

export default ProductDetail;
