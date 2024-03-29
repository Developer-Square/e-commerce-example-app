/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  faHeart,
  faSearch,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { MobileView } from "react-device-detect";
import { toast } from "react-toastify";

interface ProductProps {
  image: string;
  title: string;
  price: string;
  category: string;
}

const Label = ({ category }: { category: string }) => (
  <>
    {category !== "best-sellers" ? (
      <span
        className={`label ${
          category === "new-arrivals" ? "text-[#111]" : "text-[#fff]"
        } ${
          category === "new-arrivals" ? "bg-[#fff]" : "bg-[#111]"
        } absolute left-0 top-5 inline-block px-4 pt-1 pb-0.5 text-xs font-bold uppercase`}
      >
        {category === "new-arrivals" ? "New" : "Sale"}
      </span>
    ) : null}
  </>
);

const Product = ({
  image,
  title,
  price,
  category,
}: ProductProps): ReactElement => {
  const [selectedColor, setselectedColor] = useState("bg-[#404a47]");

  const convertTitle = (_title: string): string => {
    return _title.toLowerCase().replace(/\s/g, "-");
  };

  const router = useRouter();

  // Changes the color when a user click on the the colors
  const handleColorSelect = (e: any, _title: string, color: string) => {
    setselectedColor(color);

    const result = convertTitle(_title);
    const productColorContainer = document.querySelector(
      `#${result}`
    )?.children;
    if (productColorContainer?.length) {
      Array.from(productColorContainer).map((colorItems) => {
        colorItems.classList.remove("active-select");
        return null;
      });
    }
    e.currentTarget.classList.add("active-select");
  };

  const handleProductPush = () => {
    router.push("/shop-details");
  };

  const handleAddToCart = (
    img: string,
    name: string,
    price: string,
    color: string,
    type?: string
  ) => {
    // Todo: Add a notification to the user that the item has been added to the cart.

    const cartItems = localStorage.getItem("cartItems") || "[]";
    const cartItemsArray = JSON.parse(cartItems);

    if (cartItemsArray.length) {
      cartItemsArray.push({ img, name, price, color });
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([{ img, name, price, color }])
      );
    }
    toast(`${name} added to ${type === "wishlist" ? "wishlist" : "cart"}`, {
      type: "success",
    });
  };

  return (
    <div className="product__item relative mb-10 flex h-full w-full flex-col items-center">
      <Label category={category} />
      <ul className="product__hover invisible absolute -right-52 top-5 opacity-0 transition-all duration-700">
        <li
          className="relative mb-2.5 bg-white px-2.5 pt-2 pb-1"
          // Todo: Add a function to add an item to the wishlist
          onClick={() =>
            handleAddToCart(
              `/assets/images/product/${image}`,
              title,
              price,
              selectedColor,
              "wishlist"
            )
          }
        >
          <a href="#">
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </li>
        <li className="bg-white px-2.5 pt-2 pb-1">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </li>
      </ul>
      <img
        className="w-full cursor-pointer bg-center"
        src={`/assets/images/product/${image}`}
        alt="product section"
        onClick={handleProductPush}
      />
      <div className="mt-6 flex w-full justify-between">
        <div className="relative w-full">
          <h6 className="mb-1.5 text-left text-base font-semibold text-[#111]">
            {title}
          </h6>
          <div className="rating">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalf} />
          </div>
          <a
            href="#"
            className="add-cart invisible absolute top-0 left-0 text-base font-bold text-[#e53637] opacity-0 transition-all duration-300"
            onClick={() =>
              handleAddToCart(
                `/assets/images/product/${image}`,
                title,
                price,
                selectedColor
              )
            }
          >
            + Add To Cart
          </a>
          <p className="text-lg font-bold text-[#0d0d0d]">{price}</p>
          <div
            className="product__color__select absolute right-0 bottom-0 opacity-0 transition-all duration-500"
            id={convertTitle(title)}
          >
            <label
              htmlFor="pc-4"
              className="product-select bg-[#5e64d1]"
              onClick={(e: any): void =>
                handleColorSelect(e, title, "bg-[#5e64d1]")
              }
            >
              <input type="radio" className="invisible absolute" id="pc-4" />
            </label>
            <label
              className="active-select product-select bg-[#404a47]"
              htmlFor="pc-5"
              onClick={(e: any): void =>
                handleColorSelect(e, title, "bg-[#404a47]")
              }
            >
              <input type="radio" className="invisible absolute" id="pc-5" />
            </label>
            <label
              className="product-select bg-[#d5a667]"
              htmlFor="pc-6"
              onClick={(e: any): void =>
                handleColorSelect(e, title, "bg-[#d5a667]")
              }
            >
              <input type="radio" className="invisible absolute" id="pc-6" />
            </label>
          </div>
        </div>
        <MobileView>
          <div className="flex w-28 list-none flex-col">
            <ul className="flex">
              <li className="mr-5">
                <a href="#">
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </li>
            </ul>
            <a href="#" className="text-base font-bold text-[#e53637]">
              + Add To Cart
            </a>
          </div>
        </MobileView>
      </div>
    </div>
  );
};

export default Product;
