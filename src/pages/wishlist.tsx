/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from "react";

import { Meta } from "@/layouts/Meta";
import { CartDiscout, CartHeader, WishListCartTable } from "@/lib/add-to-cart";
import { Main } from "@/templates/Main";

const WishList = () => {
  // Todo: Add a function to calculate the total price after discount
  // const [subtotal, setSubTotal] = useState('')
  const [total, setTotal] = useState("");
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <section className="text-[#0d0d0d]">
        <CartHeader page="" />
        <div className="container-sm container pb-20 lg:flex">
          <WishListCartTable setTotal={setTotal} />
          <CartDiscout total={total} />
        </div>
      </section>
    </Main>
  );
};

export default WishList;
