/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import type { ICartItems } from "@/lib/add-to-cart/components/ShoppingCartTable";
import { addFilteredProducts, isFiltering } from "@/lib/products/product.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

type Props = {
  placement: string;
};

const SearchWishCartButton = ({ placement }: Props) => {
  const [cart, setCart] = useState<ICartItems[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const products = useAppSelector((state) => state.products.productsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch cartItems from localStorage
    const cartItems = localStorage.getItem("cartItems") || "[]";
    // @ts-ignore
    const cartItemsArray = JSON.parse(cartItems);
    setCart(cartItemsArray);
  }, []);

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    dispatch(isFiltering(true));

    setSearchTimeout(
      setTimeout(() => {
        // If the user clears the search text, then show all the products
        if (e.target.value === "") {
          dispatch(addFilteredProducts([]));
          dispatch(isFiltering(false));
          return;
        }
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        if (filteredProducts.length > 0) {
          dispatch(addFilteredProducts(filteredProducts));
        } else {
          dispatch(addFilteredProducts([]));
        }
      }, 500)
    );
  };

  return (
    <>
      <div
        className={`form-control ${
          placement === "web"
            ? "searchBar hidden justify-end md:!mx-0 md:flex md:pl-5 lg:!ml-8 lg:pl-0"
            : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="input-bordered input-info input w-full max-w-xs bg-transparent outline-none focus:outline-none md:w-32 lg:w-full"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div
        className={`${
          placement === "web"
            ? "cartWishBtns hidden justify-end md:!mx-0"
            : "flex justify-center"
        } items-center md:flex md:flex-1`}
      >
        <Link href="/wishlist">
          <button className="md:mr-0 lg:mr-5">
            <label className="btn-ghost btn-circle btn">
              <FontAwesomeIcon icon={faHeart} style={{ height: "1.2em" }} />
            </label>
          </button>
        </Link>
        <Link href="/add-to-cart">
          <button className="md:mr-0 lg:mr-5">
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
    </>
  );
};

export default SearchWishCartButton;
