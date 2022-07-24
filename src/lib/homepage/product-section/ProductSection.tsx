/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shuffle from 'lodash.shuffle';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { setInterval } from 'timers';

interface ProductProps {
  image: string;
  title: string;
  price: string;
}

const products = [
  {
    image: 'product-1.jpg',
    title: 'Piqué Biker Jacket',
    price: '$68.24',
    height: 260,
  },
  {
    image: 'product-2.jpg',
    title: 'Piqué Biker Jacket',
    price: '$68.24',
    height: 260,
  },
  {
    image: 'product-3.jpg',
    title: 'Piqué Biker Jacket',
    price: '$68.24',
    height: 260,
  },
];

const Product = ({ image, title, price }: ProductProps): ReactElement => {
  return (
    <div className="mb-10 flex flex-col items-center">
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
  const [rows, set] = useState(products);
  useEffect(() => {
    const t = setInterval(() => set(shuffle), 2000);
    return () => clearInterval(t);
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
          <ul className="grid mb-11 cursor-pointer list-none grid-cols-2 gap-4 text-2xl font-bold text-[#b7b7b7]">
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
          <div>
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
