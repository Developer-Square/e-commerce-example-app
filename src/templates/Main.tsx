/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import {
  faBlog,
  faCartShopping,
  faCircleQuestion,
  faCreditCard,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { easings } from 'react-spring';

import { config, ExpandableNavItem, useSpring } from '@/lib/common';
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
                  alt=""
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
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0"></div>
          </div>
        </div>

        {/* <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  --> */}
        <div className="absolute inset-x-0 top-0 origin-top-right p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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
                  >
                    <span className="sr-only">Close menu</span>
                    {/* <!-- Heroicon name: outline/x --> */}
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
                <nav className="grid gap-y-8">
                  <a
                    href="#"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    {/* <!-- Heroicon name: outline/chart-bar --> */}
                    <svg
                      className="h-6 w-6 shrink-0 text-indigo-600"
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {' '}
                      Analytics{' '}
                    </span>
                  </a>

                  <a
                    href="#"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    {/* <!-- Heroicon name: outline/cursor-click --> */}
                    <svg
                      className="h-6 w-6 shrink-0 text-indigo-600"
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
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {' '}
                      Engagement{' '}
                    </span>
                  </a>

                  <a
                    href="#"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    {/* <!-- Heroicon name: outline/shield-check --> */}
                    <svg
                      className="h-6 w-6 shrink-0 text-indigo-600"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {' '}
                      Security{' '}
                    </span>
                  </a>

                  <a
                    href="#"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    {/* <!-- Heroicon name: outline/view-grid --> */}
                    <svg
                      className="h-6 w-6 shrink-0 text-indigo-600"
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {' '}
                      Integrations{' '}
                    </span>
                  </a>

                  <a
                    href="#"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    {/* <!-- Heroicon name: outline/refresh --> */}
                    <svg
                      className="h-6 w-6 shrink-0 text-indigo-600"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {' '}
                      Automations{' '}
                    </span>
                  </a>
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Pricing{' '}
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Docs{' '}
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Help Center{' '}
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Guides{' '}
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Events{' '}
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {' '}
                  Security{' '}
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  {' '}
                  Sign up{' '}
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    {' '}
                    Sign in{' '}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
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
