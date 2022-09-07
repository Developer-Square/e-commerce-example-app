import React from 'react';

import { Meta } from '@/layouts/Meta';
import { ProductDetails, ShopDetailsHeader } from '@/lib/shop-details';
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
        <ShopDetailsHeader />
        <ProductDetails />
        <RelatedProducts />;
      </section>
    </Main>
  );
};

export default ShopDetails;
