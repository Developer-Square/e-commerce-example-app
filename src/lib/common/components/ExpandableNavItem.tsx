/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-cycle */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React, { useState } from 'react';
import { easings } from 'react-spring';

import {
  animated,
  config,
  FontAwesomeIcon,
  useSpring,
} from '@/lib/common/index';

type Props = {
  pages: Record<string, any>[];
};

type NavbarProps = {
  items: Record<string, any>[];
};

const NavbarItems = ({ items }: NavbarProps) => {
  return (
    <>
      {items.map((item, index) => (
        <a
          href="#"
          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
          key={index}
        >
          <FontAwesomeIcon icon={item.icon} />
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{item.title}</p>
            <p className="mt-1 text-sm text-gray-500">{item.content}</p>
          </div>
        </a>
      ))}
    </>
  );
};

const ExpandableNavItem = ({ pages }: Props) => {
  const [showProps, setShowProps] = useState<Record<string, number>>({
    toOpacity: 0,
    fromOpacity: 0,
  });
  const navbarProps = useSpring({
    to: {
      opacity: showProps.toOpacity,
    },
    from: {
      opacity: showProps.fromOpacity,
    },
    reset: true,
    reverse: false,
    config: {
      ...config.molasses,
      duration: 500,
      easing: easings.easeInOutCubic,
    },
  });
  return (
    <div className="relative">
      {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
      <button
        type="button"
        className="group focus:outline-non inline-flex items-center rounded-md bg-white text-base font-medium text-gray-500 hover:text-gray-900"
        aria-expanded="false"
        onClick={() =>
          setShowProps({
            toOpacity: 1,
            fromOpacity: 0,
          })
        }
      >
        <span>Pages</span>
        {/* Heroicon name: solid/chevron-down Item active: "text-gray-600", Item inactive: "text-gray-400" */}
        <svg
          className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <animated.div
        style={navbarProps}
        className="absolute z-10 -ml-4 mt-3 w-screen max-w-md px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <NavbarItems items={pages} />
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ExpandableNavItem;
