import React from 'react';

import { Meta } from '@/layouts/Meta';
import {
  ExtendedBreadCrumb,
  ItemDisplay,
  ProductDetails,
} from '@/lib/shop-details';
import RelatedProducts from '@/lib/shop-details/components/RelatedProducts';
import { Main } from '@/templates/Main';

const ShopDetails = () => {
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <section>
        <div className="mb-24 bg-[#f3f2ee] pt-10 pb-14">
          <div className="container-sm container">
            <ExtendedBreadCrumb />
            <ItemDisplay />
          </div>
        </div>
        <ProductDetails />
      </section>
      <RelatedProducts />;
    </Main>
  );
};

export default ShopDetails;
