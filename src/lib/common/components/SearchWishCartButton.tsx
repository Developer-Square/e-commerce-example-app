/* eslint-disable tailwindcss/no-custom-classname */
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import type { ICartItems } from "@/lib/add-to-cart/components/ShoppingCartTable";

type Props = {
  placement: string;
};

const SearchWishCartButton = ({ placement }: Props) => {
  const [cart, setCart] = useState<ICartItems[]>([]);

  useEffect(() => {
    // fetch cartItems from localStorage
    const cartItems = localStorage.getItem("cartItems") || "[]";
    // @ts-ignore
    const cartItemsArray = JSON.parse(cartItems);
    setCart(cartItemsArray);
  }, []);

  return (
    <div
      className={`${
        placement === "web" ? "hidden justify-end" : "flex justify-center"
      } items-center md:flex md:flex-1 lg:w-0`}
    >
      <div className="dropdown">
        <button className="btn-ghost btn-circle btn mr-2">
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
      <Link href="/wishlist">
        <button className="mr-5">
          <label className="btn-ghost btn-circle btn">
            <FontAwesomeIcon icon={faHeart} style={{ height: "1.2em" }} />
          </label>
        </button>
      </Link>
      <Link href="/add-to-cart">
        <button className="mr-5">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            </div>
          </label>
        </button>
      </Link>
    </div>
  );
};

export default SearchWishCartButton;
