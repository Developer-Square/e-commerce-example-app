/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-cycle */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';

import { animated, FontAwesomeIcon } from '@/lib/common/index';

type Props = {
  pages: Record<string, any>[];
  useSpringProps: any;
  menuVisibility: boolean;
  setMenuVisibility: Function;
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
          className="hover:bg-gray-150 -m-3 flex items-center rounded-lg p-3"
          key={index}
        >
          <FontAwesomeIcon icon={item.icon} />
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{item.title}</p>
            <p className="text-gray-550 mt-1 text-sm">{item.content}</p>
          </div>
        </a>
      ))}
    </>
  );
};

const ExpandableNavItem = ({
  pages,
  useSpringProps,
  menuVisibility,
  setMenuVisibility,
}: Props) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="group focus:outline-non inline-flex items-center rounded-md bg-white text-base font-bold text-gray-900"
        aria-expanded="false"
        onClick={() => setMenuVisibility(!menuVisibility)}
      >
        <span>Pages</span>
        <svg
          className="ml-2 h-5 w-5 text-gray-900"
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
        style={useSpringProps}
        className={`absolute z-10 -ml-4 mt-3 w-screen max-w-md px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 ${
          menuVisibility ? 'block' : 'hidden'
        }`}
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
