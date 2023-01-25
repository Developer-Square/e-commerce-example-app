/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import Product from '@/lib/homepage/product-section/components/Product';

import products from '../../homepage/product-section/products.json';

interface ISortPriceDropDown {
  filterString: string;
  setFilterString: Function;
}

const SortPriceDropDown = ({
  filterString,
  setFilterString,
}: ISortPriceDropDown) => (
  <div tabIndex={0} className="collapse collapse-arrow text-[#111]">
    <div
      className={`collapse-title text-sm font-bold ${
        filterString === '$1000 - $10,000' ? 'arrow-right' : ''
      }`}
    >
      {filterString}
    </div>
    <div className="collapse-content text-sm">
      <ul>
        <li
          className="cursor-pointer leading-6"
          onClick={() => setFilterString('Low to High')}
        >
          Low to High
        </li>
        <li
          className="cursor-pointer leading-6"
          onClick={() => setFilterString('High to Low')}
        >
          High to Low
        </li>
        <li
          className="cursor-pointer leading-6"
          onClick={() => setFilterString('$0 - $1000')}
        >
          $0 - $1000
        </li>
        <li
          className="cursor-pointer leading-6"
          onClick={() => setFilterString('$1000 - $10,000')}
        >
          $1000 - $10,000
        </li>
      </ul>
    </div>
  </div>
);

const ShopItems = () => {
  const [filterString, setFilterString] = useState('Low to High');
  return (
    <section className="products-section lg:py-24">
      <div className="container-sm container lg:flex lg:flex-col">
        <div className="results-container flex flex-col">
          <p className="text-sm text-[#111]">Showing 1–12 of 126 results</p>
          <div className="sorting-container mb-11 flex pt-5">
            <p className="text-sm text-[#111]">Sort by Price:</p>
            <SortPriceDropDown
              filterString={filterString}
              setFilterString={setFilterString}
            />
          </div>
        </div>
        <div id="shop-products" className="products">
          {products.map((product, index) => (
            <div key={index} className="w-full">
              <Product
                title={product.title}
                image={product.image}
                price={product.price}
                category={product.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopItems;
