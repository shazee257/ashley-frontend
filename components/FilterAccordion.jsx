import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "../styles/FilterAccordion.module.scss";

const FilterAccordion = ({ products, setFilterProducts }) => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  const [filters, setFilters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  function getSizes() {
    const sizes = products.map((product) => {
      return product.variants.map((variant) => {
        return variant.size;
      });
    });
    const uniqueSizes = [...new Set(sizes.flat())];
    setSizes(uniqueSizes);
  }

  function getColors() {
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
    setColors(uniqueColors);
  };

  function getBrands() {
    const brands = products.map((product) => {
      return product.brand_id.title;
    });
    const uniqueBrands = [...new Set(brands)];
    setBrands(uniqueBrands);
  };

  const initialFilters = [
    {
      id: 1,
      title: "price",
      type: "checkbox",
      filters: [
        { type: "checkbox", input: "Under $25", checked: false },
        { type: "checkbox", input: "$26 to $50", checked: false },
        { type: "checkbox", input: "$50 to $100", checked: false },
        { type: "checkbox", input: "$100 to $500", checked: false },
        { type: "checkbox", input: "Over $500", checked: false },
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
    getSizes();
    getColors();
    getBrands();
  }, []);

  useEffect(() => {
    setFilters(initialFilters);
    console.log("initialFilters", initialFilters);
  }, [sizes, colors, brands]);



  const toggleShowAccordion = (id) => {
    if (currentIndex === id) {
      setCurrentIndex();
    } else {
      setCurrentIndex(id);
    }
  };

  const handleApplyFilters = (filters) => {
    // filter products based on filters
    let filter_products = [];
    const filteredProducts = products.filter((product) => {






      // return filter.title === "price"
      // ? filter.filters.some((priceFilter) => {
      //   return priceFilter.checked
      //     ? variant.price >= parseInt(priceFilter.input.split(" ")[1])
      //     : false;
      // })
      //:
      // return (filter.title === "Size" ? filter.filters.some((sizeFilter) => sizeFilter.checked ? variant.size === sizeFilter.input : false) : false)
      //   &&
      //   (filter.title === "Color" ? filter.filters.some((colorFilter) => colorFilter.checked ? variant.features.some((feature) => feature.color_id.title === colorFilter.input) : false) : false)
      //   &&
      //   (filter.title === "Brand" ? filter.filters.some((brandFilter) => brandFilter.checked ? product.brand_id.title === brandFilter.input : false) : false);

      // filter.title === "Size" ? filter.filters.some((sizeFilter) => sizeFilter.checked ? variant.size === sizeFilter.input : false) : false
      //   &&
      //   filter.title === "Color" ? filter.filters.some((colorFilter) => colorFilter.checked ? variant.features.some((feature) => feature.color_id.title === colorFilter.input) : false) : false
      //     &&
      //     filter.title === "Brand" ? filter.filters.some((brandFilter) => brandFilter.checked ? product.brand_id.title === brandFilter.input : false) : false);

      // // filter products based on Size, Color, Brand && Operators
      // return filter.title === "Size" ? filter.filters.some((sizeFilter) => sizeFilter.checked ? variant.size === sizeFilter.input : false) : false
      //   &&
      //   filter.title === "Color" ? filter.filters.some((colorFilter) => colorFilter.checked ? variant.features.some((feature) => feature.color_id.title === colorFilter.input) : false) : false
      //     &&
      //     filter.title === "Brand" ? filter.filters.some((brandFilter) => brandFilter.checked ? product.brand_id.title === brandFilter.input : false) : false

      // filter products based on Sizes and push to filter_products
      // if (filter.title === "Size") {
      //   filter.filters.some((sizeFilter) => {
      //     if (sizeFilter.checked) {
      //       if (variant.size === sizeFilter.input) {
      //         filter_products.push(product);
      //       }
      //     }
      //   });
      // }



      //   : filter.title === "Brand"
      //     ? filter.filters.some((brandFilter) => {
      //       return brandFilter.checked
      //         ? variant.features.some((feature) => {
      //           return feature.brand_id.title === brandFilter.input;
      //         })
      //         : false;
      //     })
      // : false;
      // });
      // });
    });

    setFilterProducts(filter_products);
    console.log("Filter Products", filter_products);






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
      {filters?.map((filter) => (
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
