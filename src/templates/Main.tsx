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

import { config, SearchWishCartButton, useSpring } from '@/lib/common';
import { AppConfig } from '@/utils/AppConfig';

import MobileMenu from './MobileMenu';
import NavItems from './NavItems';

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
              <NavItems
                menuVisibility={menuVisibility}
                setMenuVisibility={setMenuVisibility}
                navbarProps={navbarProps}
                pages={pages}
                handleActiveItems={handleActiveItems}
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
