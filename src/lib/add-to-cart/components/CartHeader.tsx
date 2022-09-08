import React from 'react';

import { ExtendedBreadCrumb } from '@/lib/shop-details';

const CartHeader = () => {
  return (
    <div className="mb-24 bg-[#f3f2ee] py-8">
      <div className="container-sm container">
        <h2 className="text-2xl font-bold text-[#111]">Shopping Cart</h2>
        <ExtendedBreadCrumb currentPage="Shopping Cart" />
      </div>
    </div>
  );
};

export default CartHeader;
