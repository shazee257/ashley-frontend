import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategory,
} from "../../app/features/categorySlice";
import { fetchProducts, selectProducts } from "../../app/features/productSlice";
import { selectSearchProducts } from "../../app/features/searchSlice";

import FilterAccordion from "../../components/FilterAccordion";
import ProductCard from "../../components/ProductCard";

import product from "../../styles/ProductsNew.module.scss";

import bed from "../assets/bed.webp";
import Image from "next/image";
import iconone from "../assets/iconone.PNG";
import iconotwo from "../assets/iconotwo.PNG";
import iconthree from "../assets/iconthree.PNG";
import iconfour from "../assets/iconfour.PNG";
import Link from "next/link";
import axios from "axios";

const Products = () => {
  const router = useRouter();
  const { categorySlug, discountedCategorySlug, zipCode } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategory);
  const searchProducts = useSelector(selectSearchProducts);

  let filteredProducts = [];
  let currentCategory = {};
  let parentCategory = {};
  let siblingCategories = [];
  let topCategoriesExceptOne = [];

  // function to set filtered products
  const setCategoryVariables = (categories, slug) => {
    currentCategory = categories?.find((cat) => cat.slug === slug);
    parentCategory = categories?.find((cat) => cat._id == currentCategory?.parent_id);
    siblingCategories = categories?.filter((cat) => cat.parent_id === parentCategory._id);
    topCategoriesExceptOne = siblingCategories?.filter((cat) => cat.slug !== slug);
  };

  // find products by store zip code
  const findProductsByZipCode = (zipCode) => {
    const productsByZipCode = products?.filter((product) => product.store_id.zip === Number(zipCode));
    return productsByZipCode;
  };

  if (categorySlug) {
    setCategoryVariables(categories, categorySlug);
    filteredProducts = products?.filter((fp) => fp.category_id.slug === categorySlug);
  } else if (discountedCategorySlug) {
    setCategoryVariables(categories, discountedCategorySlug);
    filteredProducts = products?.filter((fp) => fp.category_id.slug === discountedCategorySlug && fp.discount > 0);
  } else if (zipCode) {
    filteredProducts = findProductsByZipCode(zipCode);
  } else {
    filteredProducts = searchProducts;
  }

  return (
    <div className={product.products_wrapper}>
      <div className={product.filter_products_wrapper}>
        <div className={product.filters_wrapper}>
          <div className={product.filter_heading}>
            <h3>{categorySlug?.replace(/-/g, " ")}</h3>
            <h3>{discountedCategorySlug?.replace(/-/g, " ")}</h3>
            <p>
              {filteredProducts?.length} of {products?.length} Products Showing
            </p>
          </div>
          <div className={product.filters_cat}>
            <h3>{parentCategory?.title}</h3>
            {siblingCategories?.map((siblingCat) => (
              <Link
                href={`/products?categorySlug=${siblingCat.slug}`}
                key={siblingCat._id}
              >
                <p>{siblingCat.title}</p>
              </Link>
            ))}
          </div>
          <div className={product.filter_cats}>
            <FilterAccordion />
          </div>
        </div>
        {/* filters ends here  */}

        <div className={product.products_item_wrapper}>
          {/* new work start top sub categories */}
          {/* <div className="flex cursor-pointer my-7 justify-evenly {product.images_fiter}"> */}
          <div className={product.images_fiter}>
            {categorySlug &&
              topCategoriesExceptOne?.slice(0, 5).map((siblingCategory) => (
                <div
                  // className="{product.images_fiter_wrapper}"
                  className={product.images_fiter_wrapper}
                  key={siblingCategory._id}
                >
                  <Link
                    href={`/products?categorySlug=${siblingCategory.slug}`}
                    key={siblingCategory._id}
                    className={product.images_fiter}
                  >
                    {/* <div className="flex flex-col items-center justify-center h-60 w-48" >
                    <div className={`flex items-center justify-center h-40 w-40 bg-green-200 rounded-full ${product.sub_categories_image_div}`}>
                      */}
                    {/* <div className="{product.sub_categories_image}"> */}
                    <div className={product.sub_categories_image_div_wrapper}>
                      <div className={product.sub_categories_image_grey_div}>
                        <div className={product.sub_categories_image_div}>
                          <Image
                            className={product.sub_categories_img}
                            src={iconone}
                            alt="Picture of the author"
                            // layout="fixed"
                            // width={100}
                            // height={100}
                            layout="fill"
                            // width={90}
                            // height={90}
                            priority
                          />
                        </div>

                        {/* </div> */}
                      </div>
                      <p className="mt-3 text-sm {product.sub_categories_name_ExpectOne}">
                        {siblingCategory.title}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          {/* new work end  sub categories */}

          {/* Adnan work discount image */}
          {/* <div className="flex cursor-pointer my-7 justify-evenly {product.images_fiter}">
            {discountedCategorySlug && (
              <div>

              </div>
            )}
          </div> */}

          <div className={product.products_cards_wrapper}>
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product) => (
                <ProductCard key={product._id} cardProduct={product} />
              ))
            ) : (
              <h5
                style={{ margin: "80px auto" }}
                className="text-2xl font-bold"
              >
                No Products Found
              </h5>
            )}
          </div>
          {/* products cards ends here  */}
        </div>
      </div>
    </div>
  );
};

export default Products;
