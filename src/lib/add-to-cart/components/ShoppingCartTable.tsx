import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const cartInfo = [
  { title: 'T-shirt Contrast Pocket', price: '$98.49', image: 'cart-1' },
  { title: 'Diagonal Textured Cap', price: '$32.50', image: 'cart-2' },
  { title: 'Basic Flowing Scarf', price: '$47.00', image: 'cart-3' },
  { title: 'Basic Black Bag', price: '$30.00', image: 'cart-4' },
];

const CartItem = ({
  title,
  price,
  image,
}: {
  title: string;
  price: string;
  image: string;
}) => (
  <>
    <tr>
      <td className="flex flex-col py-7 md:flex-row md:items-center ">
        <div>
          <img
            src={`/assets/images/shopping-cart/${image}.jpg`}
            alt="cart-item"
          />
        </div>
        <div className="mt-5 md:ml-5 md:mt-0">
          <h6 className="mb-2.5 w-3/4 text-sm font-semibold md:mb-1">
            {title}
          </h6>
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

const ShoppingCartTable = () => (
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
          {cartInfo.map((item, index) => (
            <CartItem
              key={index}
              title={item.title}
              price={item.price}
              image={item.image}
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

export default ShoppingCartTable;
