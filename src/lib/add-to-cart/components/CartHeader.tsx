import React from "react";

import { ExtendedBreadCrumb } from "@/lib/shop-details";

const CartHeader = ({ page }: { page: string }) => {
  return (
    <div className="mb-24 bg-[#f3f2ee] py-8">
      <div className="container-sm container">
        <h2 className="text-2xl font-bold text-[#111]">
          {page === "cart" ? "Shopping Cart" : "Wishlist"}
        </h2>
        <ExtendedBreadCrumb
          currentPage={page === "cart" ? "Shopping Cart" : "Wishlist"}
        />
      </div>
    </div>
  );
};

export default CartHeader;
