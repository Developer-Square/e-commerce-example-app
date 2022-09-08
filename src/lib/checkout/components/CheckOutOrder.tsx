import React from 'react';

import { CheckBoxComponent } from './CheckOutForm';

const items = [
  {
    title: '01. Vanilla salted caramel ',
    price: '$ 300.0',
  },
  {
    title: '02. German chocolate ',
    price: '$ 170.0',
  },
  {
    title: '03. Sweet autumn ',
    price: '$ 170.0',
  },
  {
    title: '04. Cluten free mini dozen ',
    price: '$ 110.0',
  },
];

const CheckOutItems = () => (
  <ul className="mb-4 flex flex-col text-base text-[#444444]">
    {items.map((item, index) => (
      <div key={index} className="mb-3.5 flex justify-between">
        <li>{item.title}</li>
        <li>{item.price}</li>
      </div>
    ))}
  </ul>
);

const CheckOutOrder = () => {
  return (
    <div className="mt-5 bg-[#f3f2ee] p-7 text-[#111] md:mt-0 md:ml-8 md:h-full md:w-1/2 lg:w-1/3">
      <h4 className="mb-7 border-b border-[#d7d7d7] text-2xl font-bold uppercase">
        Your order
      </h4>
      <div className="mb-5 flex justify-between text-base">
        <p>Product</p>
        <p>Total</p>
      </div>
      <CheckOutItems />
      <ul className="mb-6 border-y border-[#d7d7d7] py-3.5 text-base text-[#111]">
        <li className="flex justify-between leading-10">
          <span>Subtotal</span>
          <span className="font-bold text-[#e53637]">$ 750.99</span>
        </li>
        <li className="flex justify-between leading-10">
          <span>Total</span>
          <span className="font-bold text-[#e53637]">$ 750.99</span>
        </li>
      </ul>
      <CheckBoxComponent title="Create an account?" type="account" />
      <CheckBoxComponent title="Check Payment" />
      <CheckBoxComponent title="Paypal" />
      <div className="flex justify-center">
        <a href="#" className="black-btn">
          Place Order
        </a>
      </div>
    </div>
  );
};

export default CheckOutOrder;
