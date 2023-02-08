import Link from "next/link";
import React from "react";

const CartDiscout = ({ total }: { total: string }) => (
  <>
    <div>
      <div className="mt-10 mb-14">
        <h6 className="mb-6 text-base font-bold uppercase">Discount Codes</h6>
        <div className="form-control">
          <div>
            <input
              type="text"
              placeholder="Coupon code"
              className="coupon-code input-bordered input w-2/3 rounded-none focus:outline-none"
            />
            <span className="black-btn">apply</span>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f2ee] px-7 pt-9 pb-10 text-base">
        <h6 className="mb-3 text-base uppercase">Cart total</h6>
        <ul className="mb-6 text-[#444444]">
          <li className="flex justify-between leading-10">
            Subtotal
            <span className="font-bold text-[#e53637]">$ {total}</span>
          </li>
          <li className="flex justify-between leading-10">
            Total
            <span className="font-bold text-[#e53637]">$ {total}</span>
          </li>
        </ul>
        <Link href="/checkout">
          <a href="#" className="black-btn w-full text-center">
            Proceed to checkout
          </a>
        </Link>
      </div>
    </div>
  </>
);

export default CartDiscout;
