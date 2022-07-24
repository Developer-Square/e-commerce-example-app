/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const ProductSection = () => {
  const handleProductShuffle = (evt: any) => {
    const productLinks = document.querySelectorAll('.product-links');
    Array.from(productLinks).map((links): null => {
      links.classList.remove('active');
      return null;
    });
    evt.target.classList.add('active');
  };
  return (
    <section>
      <div className="container mx-auto mt-16 px-4">
        <div className="column-1">
          <ul className="grid cursor-pointer list-none grid-cols-2 gap-4 text-2xl font-bold text-[#b7b7b7]">
            <li
              className="active product-links"
              onClick={(e): void => handleProductShuffle(e)}
            >
              Best Sellers
            </li>
            <li
              className="product-links"
              onClick={(e): void => handleProductShuffle(e)}
            >
              New Arrivals
            </li>
            <li
              className="product-links"
              onClick={(e): void => handleProductShuffle(e)}
            >
              Hot Sales
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
