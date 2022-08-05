/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
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
    <div className="mb-10 flex flex-col items-center">
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

      <img
        className="w-full"
        src={`/assets/images/product/${image}`}
        alt="product section"
      />
      <div className="w-full mt-6">
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
        <p className="text-[#0d0d0d] font-bold text-lg">{price}</p>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const [rows, set] = useState([]);

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
        <div className="column-1">
          <ul className="grid mb-11 cursor-pointer list-none grid-cols-2 gap-4 text-2xl font-bold text-[#b7b7b7]">
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
          <div>
            {/* @ts-ignore */}
            {transitions((style: any, item: any, index: number) => (
              <animated.div
                className="product-list md:columns-2"
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
      </div>
    </section>
  );
};

export default ProductSection;
