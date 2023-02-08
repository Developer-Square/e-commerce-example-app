/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */

import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";

import Product from "./components/Product";
import products from "./products.json";

const ProductSection = () => {
  const [rows, set] = useState<Record<string, any>>([]);

  useEffect(() => {
    const sortedList = products.filter(
      (product) => product.category === "best-sellers"
    );
    set(sortedList);
  }, []);

  // Product list animation
  let height = 0;
  const transitions = useTransition(
    rows.map((data: { height: number }) => ({
      ...data,
      y: (height += data.height) - data.height,
    })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      // @ts-ignore
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      // @ts-ignore
      update: ({ y, height }) => ({ y, height }),
    }
  );
  const handleProductShuffle = (evt: any, category: string) => {
    const sortedList = products.filter(
      (product) => product.category === category
    );
    set(sortedList);
    const productLinks = document.querySelectorAll(".product-links");
    Array.from(productLinks).map((links): null => {
      links.classList.remove("active");
      return null;
    });
    evt.target.classList.add("active");
  };
  return (
    <section>
      <div className="container mx-auto mt-16 px-4">
        <ul className="grid header-container mb-11 cursor-pointer list-none grid-cols-2 gap-4 text-2xl font-bold text-[#b7b7b7]">
          <li
            className="active product-links sm:text-center"
            onClick={(e): void => handleProductShuffle(e, "best-sellers")}
          >
            Best Sellers
          </li>
          <li
            className="product-links sm:text-center"
            onClick={(e): void => handleProductShuffle(e, "new-arrivals")}
          >
            New Arrivals
          </li>
          <li
            className="product-links sm:text-center"
            onClick={(e): void => handleProductShuffle(e, "hot-sales")}
          >
            Hot Sales
          </li>
        </ul>
        <div className="products">
          {/* @ts-ignore */}
          {transitions((style: any, item: any, product: any, index: number) => (
            <animated.div
              className="product-list"
              style={{
                zIndex: parseInt(rows.length + 1, 10) - index + 1,
                ...style,
              }}
            >
              <Product
                title={item.title}
                image={item.image}
                price={item.price}
                category={item.category}
              />
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
