import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategory } from "../app/features/categorySlice";
import axios from "axios";

import Link from "next/link";

import navbar from "../styles/NavbarLinks.module.scss";

const NavbarLinks = () => {
  const categories = useSelector(selectCategory);
  const [discountCategories, setDiscountCategories] = useState([]);

  const getDiscountedCategories = async () => {
    const { data } = await axios.get("https://ashley-api.herokuapp.com/products/discount/categories");
    setDiscountCategories(data.categories);
  }

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
