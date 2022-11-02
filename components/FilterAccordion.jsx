import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "../styles/FilterAccordion.module.scss";

const FilterAccordion = ({ products, setFilterProducts }) => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [filters, setFilters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  const getSizes = () => {
    const sizes = products.map((product) => {
      return product.variants.map((variant) => {
        return variant.size;
      });
    });
    const uniqueSizes = [...new Set(sizes.flat())];
    setSizes(uniqueSizes);
  };

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
    setColors(uniqueColors);
  };

  const initialFilters = [
    {
      id: 1,
      title: "price",
      type: "radio",
      value: "Under $25",
      filters: [
        { type: "radio", input: "Under $25" },
        { type: "radio", input: "$26 to $50" },
        { type: "radio", input: "$50 to $100" },
        { type: "radio", input: "$100 to $500" },
        { type: "radio", input: "Over $500" },
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
      filters: [
        { type: "checkbox", input: "Apple", checked: false },
        { type: "checkbox", input: "Samsung", checked: false },
        { type: "checkbox", input: "Xiaomi", checked: false },
        { type: "checkbox", input: "Oneplus", checked: false },
        { type: "checkbox", input: "Infinix", checked: false },
        { type: "checkbox", input: "Tecno", checked: false },
        { type: "checkbox", input: "Moto", checked: false },
        { type: "checkbox", input: "Qmobile", checked: false },
        { type: "checkbox", input: "LG", checked: false },
        { type: "checkbox", input: "Nokia", checked: false },
      ],
    },
  ];

  useEffect(() => {
    getSizes();
    getColors();
    setFilters(initialFilters);
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
      const { variants } = product;

      // // const { filters: priceFilters } = filters[0];
      // const { filters: sizeFilters } = filters[1];
      // const { filters: colorFilters } = filters[2];
      // const { filters: brandFilters } = filters[3];

      // // const priceFilter = priceFilters.find((filter) => filter.checked);
      // const sizeFilter = sizeFilters.find((filter) => filter.checked);
      // const colorFilter = colorFilters.find((filter) => filter.checked);
      // const brandFilter = brandFilters.find((filter) => filter.checked);


      const priceFilterValue = filters[0].value;

      // const sizeFilterValue = sizeFilter?.input;
      // const colorFilterValue = colorFilter?.input;
      // const brandFilterValue = brandFilter?.input;



      const priceFilterCondition = priceFilterValue
        ? variants.some((variant) => {
          const { sale_price: price } = variant;

          if (priceFilterValue === "Under $25") {
            console.log("price < 25", price);
            return price < 25;
          } else if (priceFilterValue === "$26 to $50") {
            return price >= 26 && price <= 50;
          } else if (priceFilterValue === "$50 to $100") {
            return price >= 50 && price <= 100;
          } else if (priceFilterValue === "$100 to $500") {
            return price >= 100 && price <= 500;
          } else if (priceFilterValue === "Over $500") {
            return price > 500;
          }
        })
        : true;


      // const sizeFilterCondition = sizeFilterValue
      //   ? variants.some((variant) => variant.size === sizeFilterValue)
      //   : true;

      // const colorFilterCondition = colorFilterValue
      //   ? variants.some((variant) => {
      //     return variant.features.some((feature) => {
      //       return feature.color_id.title === colorFilterValue;
      //     });
      //   })
      //   : true;

      // const brandFilterCondition = brandFilterValue
      //   ? variants.some((variant) => {
      //     return variant.features.some((feature) => {
      //       return feature.brand_id.title === brandFilterValue;
      //     });
      //   })
      //   : true;

    })
    // console.log("filteredProducts", filteredProducts);
    // setFilterProducts(filteredProducts);
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
    // handleApplyFilters(modifiedFilters);
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
