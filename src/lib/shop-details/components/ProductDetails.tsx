/* eslint-disable tailwindcss/no-custom-classname */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { colors, size } from '@/lib/shop-page/sidebar/Sidebar';

const RatingSection = () => (
  <div className="rating mr-2">
    <input
      type="radio"
      name="rating-2"
      className="mask mask-star-2 bg-orange-400"
    />
    <input
      type="radio"
      name="rating-2"
      className="mask mask-star-2 bg-orange-400"
    />
    <input
      type="radio"
      name="rating-2"
      className="mask mask-star-2 bg-orange-400"
    />
    <input
      type="radio"
      name="rating-2"
      className="mask mask-star-2 bg-orange-400"
      checked
    />
    <input
      type="radio"
      name="rating-2"
      className="mask mask-star-2 bg-orange-400"
    />
  </div>
);

const ProducDescription = () => (
  <>
    <h4 className="products-text-title text-center">Hooded thermal anorak</h4>
    <div className="mb-5 flex items-center justify-center">
      <RatingSection />
      <div className="text-sm"> - 5 reviews</div>
    </div>
    <h3 className="mb-4 text-center text-3xl font-bold">
      $270.00{' '}
      <span className="ml-2 text-xl text-[#b7b7b7] line-through">70.00</span>
    </h3>
    <p className="mb-9 text-center text-sm">
      Coat with quilted lining and an adjustable hood. Featuring long sleeves
      with adjustable cuff tabs, adjustable asymmetric hem with elastic side
      tabs and a front zip fastening with placket.
    </p>
  </>
);

const ProductSelectionAndPurchase = () => (
  <>
    <div className="size-color">
      <div className="mb-6 flex items-center justify-center">
        <span className="mr-3 text-base">Size:</span>
        {size.slice(0, 4).map((item, index) => (
          <li className="size-item" key={index}>
            {item}
          </li>
        ))}
      </div>
      <div className="mb-6 flex items-center justify-center">
        <span className="mr-3 text-base">Color:</span>
        {colors.slice(0, 4).map((item, index) => (
          <li
            className="color colors-item"
            style={{ background: `${item}` }}
            key={index}
          ></li>
        ))}
      </div>
    </div>
    <div className="mb-6 flex justify-center">
      <select className="select-warning select mr-3 max-w-xs">
        <option disabled selected>
          1
        </option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <a
        href="#"
        className="inline-block bg-[#000] py-3.5 px-8 text-sm font-bold uppercase text-[#fff]"
      >
        Add to cart
      </a>
    </div>
    <div className="mb-10 flex items-center justify-center">
      <FontAwesomeIcon icon={faHeart} />
      <a href="#" className="ml-2 text-sm font-bold uppercase">
        add to wishlist
      </a>
    </div>
    <div className="text-center text-base">
      <p className="mb-6 font-bold">Guaranteed Safe Checkout</p>
      <img
        src="/assets/images/shop-details/details-payment.png"
        alt="details-payment"
      />
      <ul className="flex list-none flex-col items-center justify-center pt-10">
        <li className="flex font-bold">
          <span className="mr-2 text-[#b7b7b7]">SKU:</span>
          3812912
        </li>
        <li className="flex font-bold">
          <span className="mr-2 text-[#b7b7b7]">Categories:</span>
          Clothes
        </li>
        <li className="flex font-bold">
          <span className="mr-2 text-[#b7b7b7]">Tag:</span>
          Clothes, Skin, Body
        </li>
      </ul>
    </div>
  </>
);

const ProductDetails = () => {
  return (
    <div className="container text-[#111]">
      <div className="product-details-text">
        <ProducDescription />
        <ProductSelectionAndPurchase />
      </div>
    </div>
  );
};

export default ProductDetails;
