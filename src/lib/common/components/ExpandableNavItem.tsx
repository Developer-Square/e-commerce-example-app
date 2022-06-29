/* eslint-disable import/no-cycle */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React, { useState } from 'react';
import { easings } from 'react-spring';

import { animated, config, useSpring } from '@/lib/common/index';

const NavbarItems = ({ items }: Record<string, any>[]) => {
  return <div></div>;
};

const ExpandableNavItem = () => {
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
        className="group inline-flex items-center rounded-md bg-white text-base font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-expanded="false"
        onClick={() =>
          setShowProps({
            toOpacity: 1,
            fromOpacity: 0,
          })
        }
      >
        <span>Solutions</span>
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
      {/*           
            'Solutions' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1" */}
      <animated.div
        style={navbarProps}
        className="absolute z-10 -ml-4 mt-3 w-screen max-w-md px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <a
              href="#"
              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
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
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Analytics</p>
                <p className="mt-1 text-sm text-gray-500">
                  Get a better understanding of where your traffic is coming
                  from.
                </p>
              </div>
            </a>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ExpandableNavItem;
