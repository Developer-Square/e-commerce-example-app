/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactElement } from 'react';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Breadcrumb, Pagination } from '@/lib/common';
import { ErrorBoundary } from '@/lib/error-handling';
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
      <ErrorBoundary>
        <Breadcrumb
          currentTitle="Shop"
          previousLink="home"
          previousTitle="Home"
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="container-sm container w-full gap-6 lg:flex">
          <Sidebar />
          <ShopItems />
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <Pagination />
      </ErrorBoundary>
    </Main>
  );
};

export default Shop;
