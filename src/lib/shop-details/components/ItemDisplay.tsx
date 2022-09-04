/* eslint-disable tailwindcss/no-custom-classname */
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import VideoPlayer from './VideoPlayer';

interface IItemsNavbarProps {
  image: string;
  setActiveItem: Function;
}

const itemImages = ['thumb-1', 'thumb-2', 'thumb-3', 'thumb-4'];

const ItemsNavBar = ({ image, setActiveItem }: IItemsNavbarProps) => {
  return (
    <li
      className="relative mb-2.5 mr-2.5 cursor-pointer"
      onClick={() => setActiveItem(image)}
    >
      <img
        src={`/assets/images/shop-details/${image}.png`}
        alt="shop details"
        className="w-full"
      />
      {image === 'thumb-4' ? (
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="play !h-8 text-[#fff]"
        />
      ) : null}
    </li>
  );
};

const ItemsContent = ({ activeItem }: { activeItem: string }) => {
  return (
    <>
      {activeItem === 'thumb-1' ? (
        <img
          src="/assets/images/shop-details/product-big-2.png"
          alt="item display"
        />
      ) : null}

      {activeItem === 'thumb-2' ? (
        <img
          src="/assets/images/shop-details/product-big-3.png"
          alt="item display"
        />
      ) : null}

      {activeItem === 'thumb-3' ? (
        <img
          src="/assets/images/shop-details/product-big.png"
          alt="item display"
        />
      ) : null}

      {activeItem === 'thumb-4' ? <VideoPlayer /> : null}
    </>
  );
};

const ItemDisplay = () => {
  const [activeItem, setActiveItem] = useState('thumb-1');
  return (
    <div>
      <div>
        <ul className="mb-10 grid grid-cols-3">
          {itemImages.map((item, index) => (
            <ItemsNavBar
              key={index}
              image={item}
              setActiveItem={setActiveItem}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <ItemsContent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default ItemDisplay;
