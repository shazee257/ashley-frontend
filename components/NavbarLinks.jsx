import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, fetchCategory } from "../app/features/categorySlice";
import axios from "axios";

import Link from "next/link";

import navbar from "../styles/NavbarLinks.module.scss";

const NavbarLinks = () => {
  const categories = useSelector(selectCategory);
  const [discountCategories, setDiscountCategories] = useState([]);
  const dispatch = useDispatch();

  const getDiscountedCategories = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_baseURL}/products/discount/categories`);
    setDiscountCategories(data.categories);
  }

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    getDiscountedCategories();
  }, []);

  const parentCategories = categories?.filter((cat) => {
    return cat.parent_id === "";
  });

  return (
    <div className={navbar.navbar_links_items_wrapper}>
      {parentCategories?.map((parentCategory) => (
        <div className={navbar.links_wrapper} key={parentCategory._id}>
          <p className={navbar.links}>{parentCategory.title}</p>
          <div className={navbar.dropdown}>
            {categories?.filter((category) => category.parent_id === parentCategory._id)
              .map((childCategory) => (
                <Link href={`/products?categorySlug=${childCategory.slug}`} key={childCategory._id}>
                  <p className={navbar.dropdown_link}>{childCategory.title}</p>
                </Link>
              ))}
          </div>
        </div>
      ))}

      {parentCategories &&
        <div className={navbar.links_wrapper}>
          <p className={navbar.links} style={{ color: "red", fontWeight: "600" }}>
            Discount
          </p>
          <div className={navbar.dropdown}>
            {discountCategories?.map((item) => (
              <Link href={`/products?discountedCategorySlug=${item.slug}`} className={navbar.dropdown_link} key={item._id}>
                <p className={navbar.dropdown_link}> {item.title} </p>
              </Link>
            ))}
          </div>
        </div>}
    </div>
  );
};

export default NavbarLinks;
