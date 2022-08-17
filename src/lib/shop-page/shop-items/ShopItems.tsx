import React from 'react';

import Product from '@/lib/homepage/product-section/components/Product';

import products from '../../homepage/product-section/products.json';

const ShopItems = () => {
  return (
    <section className="lg:columns-11">
      <div className="container-sm container">
        <p className="text-sm text-[#111]">Showing 1–12 of 126 results</p>
        <div className="mb-11 flex pt-5">
          <p className="text-sm text-[#111]">Sort by Price:</p>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-sm font-bold">Low to High</div>
            <div className="collapse-content text-sm">
              <ul>
                <li className="cursor-pointer leading-6">Low to High</li>
                <li className="cursor-pointer leading-6">High to Low</li>
                <li className="cursor-pointer leading-6">$0 - $1000</li>
                <li className="cursor-pointer leading-6">$1000 - $10,000</li>
              </ul>
            </div>
          </div>
        </div>
        {products.map((product, index) => (
          <div key={index}>
            <Product
              title={product.title}
              image={product.image}
              price={product.price}
              category={product.category}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopItems;
