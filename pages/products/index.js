import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, selectCategory } from "../../app/features/categorySlice";
import { fetchProducts, selectProducts } from "../../app/features/productSlice";

import FilterAccordion from "../../components/FilterAccordion";
import ProductCard from "../../components/ProductCard";

import product from "../../styles/ProductsNew.module.scss";

import Image from "next/image";
import iconone from "../assets/iconone.PNG";
import Link from "next/link";
import BreadCrumbs from "../../components/BreadCrumbs";

function Products() {
  const [filterProducts, setFilterProducts] = useState([]);
  const [siblingCategories, setSiblingCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [parentCategory, setParentCategory] = useState({});
  const [topCategoriesExceptOne, setTopCategoriesExceptOne] = useState([]);
  // const [sizes, setSizes] = useState([]);
  // const [colors, setColors] = useState([]);
  // const [brands, setBrands] = useState([]);

  const router = useRouter();
  const { categorySlug, discountedCategorySlug, zipCode, searchTerm } = router.query;

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategory);

  const setCategoryVariables = (categories, slug) => {
    const currentCategory = categories.find((cat) => cat.slug === slug);
    const parentCategory = categories.find((cat) => cat.id === currentCategory.parent_id);
    const siblingCategories = categories.filter((cat) => cat.parent_id === parentCategory._id);
    const topCategoriesExceptOne = siblingCategories.filter((cat) => cat.slug !== slug);

    setCurrentCategory(currentCategory);
    setParentCategory(parentCategory);
    setSiblingCategories(siblingCategories);
    setTopCategoriesExceptOne(topCategoriesExceptOne);
  };

  // find products by store zip code
  const findProductsByZipCode = (zipCode) =>
    products.filter((product) => product.store_id.zip === Number(zipCode));

  useEffect(() => {
    if (categorySlug) {
      setCategoryVariables(categories, categorySlug);
      const filterData = products.filter((fp) => fp.category_id.slug === categorySlug);
      setFilterProducts(filterData);
    }

    if (discountedCategorySlug) {
      setCategoryVariables(categories, discountedCategorySlug);
      const filterData = products.filter((fp) =>
        fp.category_id.slug === discountedCategorySlug && fp.discount > 0);
      setFilterProducts(filterData);
    }

    zipCode && (setFilterProducts(findProductsByZipCode(zipCode)));

    searchTerm &&
      (setFilterProducts(products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()))));

  }, [products, categories, categorySlug, discountedCategorySlug, zipCode, searchTerm]);

  const getSizes = () => {
    const sizes = products.map((product) => {
      return product.variants.map((variant) => {
        return variant.size;
      });
    });
    const uniqueSizes = [...new Set(sizes.flat())];
    return uniqueSizes;
  }

  const getColors = () => {
    let colors = [];
    products.map((product) => {
      return product.variants.map((variant) => {
        return variant.features.map((feature) => {
          colors.push({
            title: feature.color_id.title,
            image: feature.color_id.image
          })
        });
      });
    });

    const uniqueColors = [...new Set(colors.map(item => item.title))]
      .map(title => colors.find(item => item.title === title));
    return uniqueColors;
  };

  const getBrands = () => {
    const brands = products.map((product) => {
      return product.brand_id.title;
    });
    const uniqueBrands = [...new Set(brands)];
    return uniqueBrands;
  };

  return (
    <div className={product.products_wrapper}>
      <BreadCrumbs
        parentCategoryTitle={parentCategory.title}
        categoryTitle={currentCategory.title}
        categorySlug={categorySlug}
        // productTitle={product?.title}
        discountedCategorySlug={discountedCategorySlug}
        searchTerm={searchTerm}
      />

      <div className={product.filter_products_wrapper}>
        <div className={product.filters_wrapper}>
          <div className={product.filter_heading}>
            <h3>{categorySlug?.replace(/-/g, " ")}</h3>
            <h3>{discountedCategorySlug?.replace(/-/g, " ")}</h3>
            <p>
              {filterProducts?.length} of {products?.length} Products Showing
            </p>
          </div>
          <div className={product.filters_cat}>
            <h3>{parentCategory?.title}</h3>
            {siblingCategories?.map((siblingCat) => (
              <Link href={`/products?categorySlug=${siblingCat.slug}`}
                key={siblingCat._id}>
                <p>{siblingCat.title}</p>
              </Link>
            ))}
          </div>
          <div className={product.filter_cats}>
            <FilterAccordion products={products} setFilterProducts={setFilterProducts} sizes={getSizes()} colors={getColors()} brands={getBrands()} />
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
                  key={siblingCategory._id}>
                  <Link
                    href={`/products?categorySlug=${siblingCategory.slug}`}
                    key={siblingCategory._id}
                    className={product.images_fiter}>
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
            {filterProducts?.length > 0 ? (
              filterProducts?.map((product) => (
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
