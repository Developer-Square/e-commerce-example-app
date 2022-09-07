/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { CartDiscout, CartHeader, ShoppingCartTable } from '@/lib/add-to-cart';
import { Main } from '@/templates/Main';

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
        <CartHeader />
        <div className="container-sm container pb-20 lg:flex">
          <ShoppingCartTable />
          <CartDiscout />
        </div>
      </section>
    </Main>
  );
};

export default AddToCart;
