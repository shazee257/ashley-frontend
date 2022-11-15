import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "../styles/FilterAccordion.module.scss";

const FilterAccordion = ({ products, setFilterProducts, sizes, colors, brands }) => {
  const [filters, setFilters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  const initialFilters = [
    {
      id: 1,
      title: "Price",
      type: "radio",
      value: "",
      filters: [
        { type: "radio", input: "Under $25", value: "Under $25" },
        { type: "radio", input: "$26 to $50", value: "$26 to $50" },
        { type: "radio", input: "$50 to $100", value: "$50 to $100" },
        { type: "radio", input: "$100 to $500", value: "$100 to $500" },
        { type: "radio", input: "Over $500", value: "Over $500" },
      ],
    },
    {
      id: 2,
      title: "Size",
      type: "checkbox",
      filters: sizes.map((size) => {
        return { type: "checkbox", input: size, checked: false };
      }),
    },
    {
      id: 3,
      title: "Color",
      type: "checkbox",
      filters: colors.map((color) => {
        return { type: "checkbox", input: color.title, image: color.image, checked: false };
      }),
    },
    {
      id: 4,
      title: "Brand",
      type: "checkbox",
      filters: brands.map((brand) => {
        return { type: "checkbox", input: brand, checked: false };
      }),
    },
  ];

  useEffect(() => {
    setFilters(initialFilters);
    console.log("initialFilters", initialFilters);
  }, []);

  const toggleShowAccordion = (id) => {
    if (currentIndex === id) {
      setCurrentIndex();
    } else {
      setCurrentIndex(id);
    }
  };

  const handleApplyFilters = (filters) => {
    let isMatch = false;
    let priceMatch = false;
    let sizeMatch = false;
    let colorMatch = false;
    let brandMatch = false;

    const filteredProducts = products.filter((product) => {
      const priceValue = filters[0].value;
      const sizeFilters = filters[1].filters.filter((filter) => filter.checked);
      const colorFilters = filters[2].filters.filter((filter) => filter.checked);
      const brandFilters = filters[3].filters.filter((filter) => filter.checked);

      if (priceValue) {
        if (priceValue === "Under $25") {
          priceMatch = product.variants.some((variant) => variant.sale_price < 25);
        } else if (priceValue === "$26 to $50") {
          priceMatch = product.variants.some((variant) => variant.sale_price > 25 && variant.sale_price < 50);
        } else if (priceValue === "$50 to $100") {
          priceMatch = product.variants.some((variant) => variant.sale_price > 50 && variant.sale_price < 100);
        } else if (priceValue === "$100 to $500") {
          priceMatch = product.variants.some((variant) => variant.sale_price > 100 && variant.sale_price < 500);
        } else if (priceValue === "Over $500") {
          priceMatch = product.variants.some((variant) => variant.sale_price > 500);
        }
      }

      if (sizeFilters.length > 0) {
        sizeMatch = product.variants.some((variant) => {
          return sizeFilters.some((sizeFilter) => sizeFilter.input === variant.size);
        });
      }

      if (colorFilters.length > 0) {
        colorMatch = colorFilters.some((colorFilter) => {
          return product.variants.some((variant) => {
            return variant.features.some((feature) => feature.color_id.title === colorFilter.input);
          });
        });
      }

      if (brandFilters.length > 0) {
        brandMatch = brandFilters.some((brandFilter) => brandFilter.input === product.brand_id.title);
      }

      // check for every match condition
      if (sizeFilters.length > 0 && brandFilters.length > 0 && colorFilters.length > 0 && priceValue) {
        isMatch = sizeMatch && brandMatch && colorMatch && priceMatch;
        console.log("sizeMatch && colorMatch && brandMatch && priceMatch");
        return isMatch;
      } else if (sizeFilters.length > 0 && colorFilters.length > 0 && priceValue) {
        isMatch = sizeMatch && colorMatch && priceMatch;
        console.log("sizeMatch && colorMatch && priceMatch");
        return isMatch;
      } else if (sizeFilters.length > 0 && brandFilters.length > 0 && priceValue) {
        isMatch = sizeMatch && brandMatch && priceMatch;
        console.log("sizeMatch && brandMatch && priceMatch");
        return isMatch;
      } else if (colorFilters.length > 0 && brandFilters.length > 0 && priceValue) {
        isMatch = colorMatch && brandMatch && priceMatch;
        console.log("colorMatch && brandMatch && priceMatch");
        return isMatch;
      } else if (sizeFilters.length > 0 && brandFilters.length > 0 && colorFilters.length > 0) {
        isMatch = sizeMatch && brandMatch && colorMatch;
        console.log("sizeMatch && brandMatch && colorMatch");
        return isMatch;
      } else if (colorFilters.length > 0 && brandFilters.length > 0) {
        isMatch = colorMatch && brandMatch;
        console.log("colorMatch && brandMatch");
        return isMatch;
      } else if (brandFilters.length > 0 && priceValue) {
        isMatch = brandMatch && priceMatch;
        console.log("brandMatch && priceMatch");
        return isMatch;
      } else if (sizeFilters.length > 0 && priceValue) {
        isMatch = sizeMatch && priceMatch;
        console.log("sizeMatch && priceMatch");
        return isMatch;
      } else if (colorFilters.length > 0 && priceValue) {
        isMatch = colorMatch && priceMatch;
        console.log("colorMatch && priceMatch");
        return isMatch;
      } else if (sizeFilters.length > 0 && brandFilters.length > 0) {
        isMatch = sizeMatch && brandMatch;
        console.log("sizeMatch && brandMatch");
        return isMatch;
      } else if (sizeFilters.length > 0) {
        isMatch = sizeMatch;
        console.log("sizeMatch");
        return isMatch;
      } else if (colorFilters.length > 0) {
        isMatch = colorMatch;
        console.log("colorMatch");
        return isMatch;
      } else if (brandFilters.length > 0) {
        isMatch = brandMatch;
        console.log("brandMatch");
        return isMatch;
      } else if (priceValue) {
        isMatch = priceMatch;
        console.log("priceMatch");
        return isMatch;
      } else {
        return product;
      }
    });

    setFilterProducts(filteredProducts);
    console.log("filteredProducts", filteredProducts);
  };

  const handleChange = ({ target: { value, name } }, filterSection, index) => {
    // handling both cases radio button and checkboxes
    let modifiedFilters;
    if (filterSection.type === "radio") {
      modifiedFilters = filters.map((filter) => {
        if (filter.id === filterSection.id) {
          return { ...filter, value };
        }
        return filter;
      });
    } else {
      modifiedFilters = filters.map((filter) => {
        if (filterSection.id === filter.id) {
          return {
            ...filterSection,
            filters: filterSection.filters.map((checkbox, currentIdx) => {
              if (currentIdx === index)
                return { ...checkbox, checked: !checkbox.checked };
              return checkbox;
            }),
          };
        }
        return filter;
      });
    }

    console.log("modified Filters : ", modifiedFilters);
    setFilters(modifiedFilters);
    handleApplyFilters(modifiedFilters);
  };

  return (
    <div className={styles.accordion_wrapper}>
      {filters.map((filter) => (
        <div className={styles.accordion_item} key={filter.id}>
          <div className={styles.accordion_heading} onClick={() => toggleShowAccordion(filter.id)}>
            <h4>{filter.title}</h4>
            <span>
              {currentIndex === filter.id ? <FiChevronUp className={styles.accordion_icon} />
                : <FiChevronDown className={styles.accordion_icon} />}
            </span>
          </div>

          <div className={
            currentIndex !== filter.id
              ? styles.accordion_content
              : styles.accordion_content + " " + styles.show}>

            {filter.filters.map((data, i) => (
              <div className={styles.content_filter_wrapper} key={i}>
                <input
                  type={data.type}
                  name={data.input}
                  id={data.input}
                  value={data.type === "radio" && data.input}
                  checked={
                    data.type === "radio"
                      ? data.input === filter.value
                      : data.checked
                  }
                  onChange={(e) => handleChange(e, filter, i)}
                />
                <label htmlFor={data.input}>{data.input}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterAccordion;
