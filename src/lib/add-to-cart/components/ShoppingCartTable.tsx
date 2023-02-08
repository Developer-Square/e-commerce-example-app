import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface ICartItems {
  name: string;
  price: string;
  img: string;
  color?: string;
}

const CartItem = ({ name, price, img }: ICartItems) => (
  <>
    <tr>
      <td className="flex flex-col py-7 md:flex-row md:items-center ">
        <div>
          <img src={img} className="h-24 w-24" alt="cart-item" />
        </div>
        <div className="mt-5 md:ml-5 md:mt-0">
          <h6 className="mb-2.5 w-3/4 text-sm font-semibold md:mb-1">{name}</h6>
          <h5 className="font-bold text-[#0d0d0d]">{price}</h5>
        </div>
      </td>
      <td>
        <select className="select-warning select mr-3 max-w-xs">
          <option disabled selected>
            1
          </option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </td>
      <td>
        <h5 className="font-bold text-[#0d0d0d]">{price}</h5>
      </td>
      <td>
        <div className="remove-cart-item cursor-pointer rounded-full bg-[#f3f2ee] py-2 px-3 text-center text-sm">
          <FontAwesomeIcon icon={faX} />
        </div>
      </td>
    </tr>
  </>
);

const ShoppingCartTable = () => {
  const [cart, setCart] = useState<ICartItems[]>([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems" || "[]");
    // @ts-ignore
    setCart(JSON.parse(cartItems));
  }, []);

  return (
    <>
      <div className="lg:mr-6 lg:w-3/4 xl:w-3/5">
        <table className="mb-7 w-full">
          <thead>
            <tr className="text-left text-base uppercase">
              <th className="pb-6">Product</th>
              <th className="pb-6">Quantity</th>
              <th className="pb-6">Total</th>
              <th className="pb-6"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <CartItem
                key={index}
                name={item.name}
                price={item.price}
                img={item.img}
              />
            ))}
          </tbody>
        </table>
        <div className="shopping-cart-btn flex flex-col">
          <a
            href="#"
            className="shop-now continue-shopping mx-auto inline-block w-3/4 border border-[#e1e1e1] bg-[#fff] py-3.5 px-8 text-center text-[#000] md:mt-5"
          >
            Continue shopping
          </a>
          <a href="#" className="black-btn update-cart mt-5 w-3/5">
            Update cart
          </a>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartTable;
