/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactElement } from 'react';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Breadcrumb } from '@/lib/common';
import { ShopItems, Sidebar } from '@/lib/shop-page';
import { Main } from '@/templates/Main';

const Shop = (): ReactElement => {
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <Breadcrumb
        currentTitle="Shop"
        previousLink="home"
        previousTitle="Home"
      />
      <div className="gap-6 lg:flex">
        <Sidebar />
        <ShopItems />
      </div>
    </Main>
  );
};

export default Shop;
