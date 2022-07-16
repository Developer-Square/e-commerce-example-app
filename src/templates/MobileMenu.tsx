/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { animated } from 'react-spring';

import { SearchWishCartButton } from '@/lib/common';

type Props = {
  pages: Record<string, any>[];
  navbarProps: any;
  menuVisibility: boolean;
  setMenuVisibility: Function;
};

const MobileMenu = ({
  navbarProps,
  menuVisibility,
  setMenuVisibility,
  pages,
}: Props) => {
  return (
    <animated.div
      style={navbarProps}
      className="menu-container absolute inset-x-0 top-0 origin-top-right p-2 transition md:hidden"
    >
      <div className="h-full divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-900 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={(): void => setMenuVisibility(!menuVisibility)}
              >
                <span className="sr-only">Close menu</span>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="my-5 flex justify-center font-bold">
              <span className="mr-4 cursor-pointer">Signin</span>
              <span className="cursor-pointer">FAQs</span>
            </div>
            <div className="my-5 flex justify-center">
              <SearchWishCartButton placement="mobile" />
            </div>
            <nav className="grid gap-y-8">
              <a
                href="#"
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              >
                <span className="ml-3 text-base font-bold text-gray-900">
                  {' '}
                  Home{' '}
                </span>
              </a>

              <a
                href="#"
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              >
                <span className="ml-3 text-base font-bold text-gray-900">
                  {' '}
                  Shop{' '}
                </span>
              </a>

              <span className="ml-3 text-base font-bold text-gray-900">
                <div className="dropdown">
                  <label tabIndex={0} className="cursor-pointer">
                    Pages{' '}
                    <span className="ml-0.5">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu w-52 bg-base-100 p-2"
                  >
                    {pages.slice(0, 4).map((page, index) => (
                      <li key={index}>{<a>{page.title}</a>}</li>
                    ))}
                  </ul>
                </div>
              </span>

              <a
                href="#"
                className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              >
                <span className="ml-3 text-base font-bold text-gray-900">
                  {' '}
                  Contacts{' '}
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default MobileMenu;
