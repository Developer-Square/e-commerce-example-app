import React from 'react';

import { Meta } from '@/layouts/Meta';
import { CheckOutForm, CheckOutHeader } from '@/lib/checkout';
import { Main } from '@/templates/Main';

const Checkout = () => {
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
        <CheckOutHeader />
        <div className="container-sm container text-[#0d0d0d]">
          <div>
            <CheckOutForm />
            <div></div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Checkout;
