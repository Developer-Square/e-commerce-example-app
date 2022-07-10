/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import {
  faBlog,
  faCaretDown,
  faCartShopping,
  faCircleQuestion,
  faCreditCard,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { animated, easings } from 'react-spring';

import {
  config,
  ExpandableNavItem,
  FontAwesomeIcon,
  SearchWishCartButton,
  useSpring,
} from '@/lib/common';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const pages = [
  {
    title: 'About Us',
    content: 'Read our story on how and why we made this site',
    icon: faBlog,
  },
  {
    title: 'Shop Details',
    content: 'All the product details you need to make a decision',
    icon: faStore,
  },
  {
    title: 'Shopping Cart',
    content: 'View all the items in cart',
    icon: faCartShopping,
  },
  {
    title: 'Check Out',
    content: 'Finished shopping? Buy the goods and have them delivered.',
    icon: faCreditCard,
  },
  {
    title: 'FAQs',
    content: 'Need some answers? Visit our Faqs section',
    icon: faCircleQuestion,
  },
];

const Main = (props: IMainProps) => {
  const [showProps, setShowProps] = useState<Record<string, number>>({
    toOpacity: 0,
    fromOpacity: 0,
  });
  const [menuVisibility, setMenuVisibility] = useState(false);
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
      duration: 570,
      easing: easings.easeInOutCubic,
    },
  });

  useMemo((): void => {
    if (menuVisibility) {
      setShowProps({
        toOpacity: 1,
        fromOpacity: 0,
      });
    } else {
      setShowProps({
        toOpacity: 0,
        fromOpacity: 1,
      });
    }
  }, [menuVisibility]);

  const handleActiveItems = (e: any) => {
    const navbarItems = document.querySelectorAll('.navbar-item');
    Array.from(navbarItems).map((item) => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="logo"
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
              <li
                className="navbar-item"
                onClick={(e): void => handleActiveItems(e)}
              >
                <a
                  href="#"
                  className="text-base font-bold text-gray-900"
                  onClick={(): void => setMenuVisibility(false)}
                >
                  Home{' '}
                </a>
              </li>
              <li
                className="navbar-item"
                onClick={(e): void => handleActiveItems(e)}
              >
                <a
                  href="#"
                  className="text-base font-bold text-gray-900"
                  onClick={(): void => setMenuVisibility(false)}
                >
                  Shop{' '}
                </a>
              </li>

              <ExpandableNavItem
                pages={pages}
                useSpringProps={navbarProps}
                menuVisibility={menuVisibility}
                setMenuVisibility={setMenuVisibility}
              />
              <li
                className="navbar-item"
                onClick={(e): void => handleActiveItems(e)}
              >
                <a
                  href="#"
                  className="text-base font-bold text-gray-900"
                  onClick={(): void => setMenuVisibility(false)}
                >
                  Contacts{' '}
                </a>
              </li>
              <li
                className="navbar-item"
                onClick={(e): void => handleActiveItems(e)}
              >
                <a
                  href="#"
                  className="text-base font-bold text-gray-900"
                  onClick={(): void => setMenuVisibility(false)}
                >
                  Signin{' '}
                </a>
              </li>
            </nav>
            <SearchWishCartButton placement="web" />
          </div>
        </div>
        {/* Mobile menu */}
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
                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
      </div>

      <div className="content py-5 text-xl">{props.children}</div>

      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  );
};

export { Main };
