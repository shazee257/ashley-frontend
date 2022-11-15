import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "../styles/FilterAccordion.module.scss";

const FilterAccordion = ({ products, setFilterProducts, sizes, colors, brands }) => {
  // return console.log("sizes, colors, brands", sizes, colors, brands);

  // const [getSizes, setGetSizes] = useState(sizes);
  // const [colors, setColors] = useState(colors);
  // const [brands, setBrands] = useState(brands);
  // console.log("getSizes", getSizes);
  const [filters, setFilters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  const initialFilters = [
    // {
    //   id: 1,
    //   title: "price",
    //   type: "checkbox",
    //   filters: [
    //     { type: "checkbox", input: "Under $25", checked: false },
    //     { type: "checkbox", input: "$26 to $50", checked: false },
    //     { type: "checkbox", input: "$50 to $100", checked: false },
    //     { type: "checkbox", input: "$100 to $500", checked: false },
    //     { type: "checkbox", input: "Over $500", checked: false },
    //   ],
    // },
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

    const filteredProducts = products.filter((product) => {
      let isMatch = false;
      let sizeMatch = false;
      let colorMatch = false;
      let brandMatch = false;

      // apply && operator to all filters

      // filter by size
      const sizeFilters = filters[0].filters.filter((filter) => filter.checked);
      console.log("sizeFilters: ", sizeFilters);
      if (sizeFilters.length > 0) {
        sizeMatch = product.variants.some((variant) => {
          return sizeFilters.some((sizeFilter) => sizeFilter.input === variant.size);
        });
        isMatch = sizeMatch;
      }

      // filter by brand
      const brandFilters = filters[2].filters.filter((filter) => filter.checked);
      if (brandFilters.length > 0) {
        brandMatch = brandFilters.some((brandFilter) => brandFilter.input === product.brand_id.title);
        isMatch = brandMatch;
      }

      // filter by color
      const colorFilters = filters[1].filters.filter((filter) => filter.checked);
      if (colorFilters.length > 0) {
        colorMatch = colorFilters.some((colorFilter) => {
          return product.variants.some((variant) => {
            return variant.features.some((feature) => feature.color_id.title === colorFilter.input);
          });
        });
        isMatch = colorMatch;
      }


      // if (sizeMatch && colorMatch && brandMatch) {
      //   isMatch = true;
      // } else if (sizeMatch && colorMatch) {
      //   isMatch = true;
      // } else if (sizeMatch && brandMatch) {
      //   isMatch = true;
      // } else if (colorMatch && brandMatch) {
      //   isMatch = true;
      // } else if (sizeMatch) {
      //   isMatch = true;
      // } else if (colorMatch) {
      //   isMatch = true;
      // } else if (brandMatch) {
      //   isMatch = true;
      // } else {
      //   isMatch = false;
      // }

      // AND operator
      isMatch = sizeMatch && brandMatch && colorMatch;
      return isMatch;
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
