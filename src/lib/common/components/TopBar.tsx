import React from 'react';

import MobileMenu from '@/templates/MobileMenu';
import NavItems from '@/templates/NavItems';

import SearchWishCartButton from './SearchWishCartButton';

type Props = {
  menuVisibility: boolean;
  setMenuVisibility: Function;
  navbarProps: any;
  pages: Record<string, any>[];
};

const TopBar = ({
  menuVisibility,
  setMenuVisibility,
  navbarProps,
  pages,
}: Props) => {
  return (
    <div className="container-sm container relative bg-white">
      <div className="mx-auto max-w-7xl pr-4 sm:pr-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="w-16 rounded-full"
                src="/assets/images/Logo - dark surface.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-900 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              {/* Heroicon name: outline/menu */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden space-x-10 md:flex">
            <NavItems
              menuVisibility={menuVisibility}
              setMenuVisibility={setMenuVisibility}
              navbarProps={navbarProps}
              pages={pages}
            />
          </nav>
          <SearchWishCartButton placement="web" />
        </div>
      </div>
      <MobileMenu
        pages={pages}
        navbarProps={navbarProps}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
      />
    </div>
  );
};

export default TopBar;
