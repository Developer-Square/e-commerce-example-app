import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { ExtendedBreadCrumb } from '@/lib/shop-details';
import { Main } from '@/templates/Main';

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
      <td className="flex flex-col py-7">
        <div>
          <img
            src={`/assets/images/shopping-cart/${image}.jpg`}
            alt="cart-item"
          />
        </div>
        <div className="mt-5">
          <h6 className="mb-2.5 w-3/4 text-sm font-semibold">{title}</h6>
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
        <div className="cursor-pointer rounded-full bg-[#f3f2ee] py-2 px-3 text-center text-sm">
          <FontAwesomeIcon icon={faX} />
        </div>
      </td>
    </tr>
  </>
);

const AddToCart = () => {
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <section className="text-[#111]">
        <div className="mb-24 bg-[#f3f2ee] py-8">
          <div className="container-sm container">
            <h2 className="text-2xl font-bold ">Shopping Cart</h2>
            <ExtendedBreadCrumb currentPage="Shopping Cart" />
          </div>
        </div>
        <div className="container-sm container pb-20">
          <div>
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
            <div className="flex flex-col">
              <a
                href="#"
                className="shop-now mx-auto inline-block w-3/4 border border-[#e1e1e1] bg-[#fff] py-3.5 px-8 text-center text-[#000]"
              >
                Continue shopping
              </a>
              <a
                href="#"
                className="shop-now mx-auto mt-5 inline-block w-3/5 bg-[#000] py-3.5 px-8 text-center text-[#fff]"
              >
                Update cart
              </a>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default AddToCart;
