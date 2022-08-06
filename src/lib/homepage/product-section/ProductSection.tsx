/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import {
  faHeart,
  faSearch,
  faStar,
  faStarHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { MobileView } from 'react-device-detect';
import { animated, useTransition } from 'react-spring';

import products from './products.json';

interface ProductProps {
  image: string;
  title: string;
  price: string;
  category: string;
}

const Product = ({
  image,
  title,
  price,
  category,
}: ProductProps): ReactElement => {
  return (
    <div className="mb-10 flex flex-col items-center product__item relative">
      {category !== 'best-sellers' ? (
        <span
          className={`label ${
            category === 'new-arrivals' ? 'text-[#111]' : 'text-[#fff]'
          } ${
            category === 'new-arrivals' ? 'bg-[#fff]' : 'bg-[#111]'
          } text-xs font-bold uppercase inline-block pt-1 pb-0.5 px-4 absolute left-0 top-5`}
        >
          {category === 'new-arrivals' ? 'New' : 'Sale'}
        </span>
      ) : null}
      <ul className="product__hover opacity-0 invisible absolute -right-52 top-5 transition-all duration-700">
        <li className="mb-2.5 relative bg-white pt-2 px-2.5 pb-1">
          <a href="#">
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </li>
        <li className="bg-white pt-2 px-2.5 pb-1">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </li>
      </ul>
      <img
        className="w-full bg-center"
        src={`/assets/images/product/${image}`}
        alt="product section"
      />
      <div className="w-full mt-6 flex justify-between">
        <div className="relative">
          <h6 className="text-left text-[#111] text-base font-semibold mb-1.5">
            {title}
          </h6>
          <div className="rating">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalf} />
          </div>
          <a
            href="#"
            className="text-base text-[#e53637] font-bold absolute top-0 left-0 transition-all duration-300 invisible opacity-0 add-cart"
          >
            + Add To Cart
          </a>
          <p className="text-[#0d0d0d] font-bold text-lg">{price}</p>
        </div>
        <MobileView>
          <div className="flex flex-col list-none">
            <ul className="flex">
              <li className="mr-5">
                <a href="#">
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </li>
            </ul>
            <a href="#" className="text-base text-[#e53637] font-bold">
              + Add To Cart
            </a>
          </div>
        </MobileView>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const [rows, set] = useState<Record<string, any>>([]);

  useEffect(() => {
    const sortedList = products.filter(
      (product) => product.category === 'best-sellers'
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
        <ul className="grid header-container mb-11 cursor-pointer list-none grid-cols-2 gap-4 text-2xl font-bold text-[#b7b7b7]">
          <li
            className="active product-links"
            onClick={(e): void => handleProductShuffle(e, 'best-sellers')}
          >
            Best Sellers
          </li>
          <li
            className="product-links"
            onClick={(e): void => handleProductShuffle(e, 'new-arrivals')}
          >
            New Arrivals
          </li>
          <li
            className="product-links"
            onClick={(e): void => handleProductShuffle(e, 'hot-sales')}
          >
            Hot Sales
          </li>
        </ul>
        <div className="products">
          {/* @ts-ignore */}
          {transitions((style: any, item: any, index: number) => (
            <animated.div
              className="product-list"
              style={{ zIndex: rows.length - index, ...style }}
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
