/* eslint-disable tailwindcss/no-custom-classname */
import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type Props = {
  placement: string;
};

const SearchWishCartButton = ({ placement }: Props) => {
  return (
    <div
      className={`${
        placement === 'web' ? 'hidden justify-end' : 'flex justify-center'
      } items-center md:flex md:flex-1 lg:w-0`}
    >
      <div className="dropdown">
        <button className="btn btn-ghost btn-circle mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <input
              type="text"
              placeholder="Search..."
              className="input-bordered input-info input w-full max-w-xs bg-transparent"
            />
          </li>
        </ul>
      </div>

      <button className="mr-5">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <Link href="/add-to-cart">
        <button className="mr-5">
          <FontAwesomeIcon icon={faCartArrowDown} />
          <span className="ml-1">$ 0.00</span>
        </button>
      </Link>
    </div>
  );
};

export default SearchWishCartButton;
