import React from 'react';

import { ExtendedBreadCrumb } from '@/lib/shop-details';

const CheckOutHeader = () => {
  return (
    <div className="mb-24 bg-[#f3f2ee] py-8">
      <div className="container-sm container">
        <h2 className="text-2xl font-bold text-[#111]">Checkout</h2>
        <ExtendedBreadCrumb currentPage="Checkout" />
      </div>
    </div>
  );
};

export default CheckOutHeader;
