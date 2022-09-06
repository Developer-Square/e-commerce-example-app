/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import Product from '@/lib/homepage/product-section/components/Product';

import products from '../../homepage/product-section/products.json';

const RelatedProducts = () => {
  return (
    <section className="pt-16 pb-6 text-[#111]">
      <div className="container">
        <h3 className="mb-11 text-center text-3xl font-bold">
          Related Products
        </h3>
        <div className="related-products gap-8">
          {products.slice(0, 4).map((product, index) => (
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

export default RelatedProducts;
