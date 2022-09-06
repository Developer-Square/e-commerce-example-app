/* eslint-disable tailwindcss/no-custom-classname */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

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

const ProductDescription = () => (
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

const ProductInfo = ({ title }: { title: string }) => (
  <div className="mb-8">
    <h4 className="mb-3">{title}</h4>
    <p className="text-sm font-normal">
      A Pocket PC is a handheld computer, which features many of the same
      capabilities as a modern PC. These handy little devices allow individuals
      to retrieve and store e-mail messages, create a contact file, coordinate
      appointments, surf the internet, exchange text messages and more. Every
      product that is labeled as a Pocket PC must be accompanied with specific
      software to operate the unit and must feature a touchscreen and touchpad.
    </p>
    <p className="text-sm font-normal">
      As is the case with any new technology product, the cost of a Pocket PC
      was substantial during it’s early release. For approximately $700.00,
      consumers could purchase one of top-of-the-line Pocket PCs in 2003. These
      days, customers are finding that prices have become much more reasonable
      now that the newness is wearing off. For approximately $350.00, a new
      Pocket PC can now be purchased.
    </p>
  </div>
);

const ProductDetails = () => {
  const [activeItem, setActiveItem] = useState('description');
  const removeActiveItems = () => {
    const navbarItems = document.querySelectorAll('.navbarItem');
    Array.from(navbarItems).map((item) =>
      item.classList.remove('active-description')
    );
  };

  const handleActiveItem = (id: string) => {
    removeActiveItems();
    setActiveItem(id);
    const activeItemLi = document.querySelector(`#${id}`);
    if (activeItemLi) {
      activeItemLi.classList.add('active-description');
    }
  };
  return (
    <div className="container text-[#111]">
      <div className="product-details-text">
        <ProductDescription />
        <ProductSelectionAndPurchase />
      </div>
      <div className="mt-14">
        <ul className="grid-cols-1 text-xl font-bold text-[#b7b7b7] sm:grid-cols-2 md:grid-cols-3">
          <li
            className="navbarItem active-description mb-3.5 cursor-pointer text-center"
            id="description"
            onClick={() => handleActiveItem('description')}
          >
            <a href="#">Description</a>
          </li>
          <li
            className="navbarItem mb-3.5 cursor-pointer text-center"
            id="previews"
            onClick={() => handleActiveItem('previews')}
          >
            <a href="#">Customer Previews(5)</a>
          </li>
          <li
            className="navbarItem mb-3.5 cursor-pointer text-center"
            id="info"
            onClick={() => handleActiveItem('info')}
          >
            <a href="#">Additional Information</a>
          </li>
        </ul>
        <div className="pt-9 text-lg font-bold text-[#111]">
          <div>
            {activeItem === 'description' || activeItem === 'info' ? (
              <>
                <p className="mb-6">
                  Nam tempus turpis at metus scelerisque placerat nulla
                  deumantos solicitud felis. Pellentesque diam dolor, elementum
                  etos lobortis des mollis ut risus. Sedcus faucibus an
                  sullamcorper mattis drostique des commodo pharetras loremos.
                </p>
                <ProductInfo title="Product Information" />
                <ProductInfo title="Material used" />
              </>
            ) : null}

            {activeItem === 'previews' ? (
              <>
                <ProductInfo title="Product Information" />
                <ProductInfo title="Material used" />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
