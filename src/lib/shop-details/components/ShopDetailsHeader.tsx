import React from 'react';

import ExtendedBreadCrumb from './ExtendedBreadCrumb';
import ItemDisplay from './ItemDisplay';

const ShopDetailsHeader = () => {
  return (
    <div className="mb-24 bg-[#f3f2ee] pt-10 pb-14">
      <div className="container-sm container">
        <ExtendedBreadCrumb currentPage="Product Details" />
        <ItemDisplay />
      </div>
    </div>
  );
};

export default ShopDetailsHeader;
