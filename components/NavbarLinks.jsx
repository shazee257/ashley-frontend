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

  const mainCategories = categories?.filter((cat) => {
    return cat.parent_id === "";
  });

  return (
    <div className={navbar.navbar_links_items_wrapper}>
      {mainCategories?.map((mainCategory) => (
        <div className={navbar.links_wrapper} key={mainCategory._id}>
          <p className={navbar.links}>{mainCategory.title}</p>
          <div className={navbar.dropdown}>
            {categories?.filter(
              (filteredCats) => filteredCats.parent_id === mainCategory._id
            )
              .map((subCats) => (
                <Link href={`/products?categorySlug=${subCats.slug}`} key={subCats._id}>
                  <p className={navbar.dropdown_link}>{subCats.title}</p>
                </Link>
              ))}
          </div>
        </div>
      ))}

      {mainCategories &&
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
