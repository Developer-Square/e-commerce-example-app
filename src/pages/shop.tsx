/* eslint-disable tailwindcss/no-custom-classname */
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const categories = [
  'Bags (20)',
  'Clothing (20)',
  'Shoes (20)',
  'Accessories (20)',
  'Kids Shoes (20)',
  'Bikes (20)',
  'Laptops (20)',
];
const branding = ['Louis Vutton', 'Chanel', 'Hermes', 'Gucci'];
const filterPrice = [
  '$0.00 - $50.00',
  '$50.00 - $100.00',
  '$100.00 - $150.00',
  '$150.00 - $200.00',
  '$200.00 - $250.00',
  '250.00+',
];
const size = ['xs', 's', 'm', 'xl', '2xl', '3xl', '4xl'];
const colors = [
  '#0b090c',
  '#20315f',
  '#f1af4d',
  '#636068',
  '#57594d',
  '#e8bac4',
  '#d6c1d7',
  '#ed1c24',
];
const tags = [
  'product',
  'bags',
  'shoes',
  'fashion',
  'clothing',
  'hats',
  'accessories',
];

interface ISidebarItemsProps {
  title: string;
  items: string[];
}

const SidebarItems = ({ title, items }: ISidebarItemsProps) => (
  <div tabIndex={0} className="collapse collapse-arrow rounded-box font-bold">
    <div className="collapse-title text-base font-bold uppercase text-[#111]">
      {title}
    </div>
    <div className="collapse-content">
      <ul className="text-sm font-normal text-[#898989]">
        {title === 'Categories' ||
        title === 'Branding' ||
        title === 'Filter Price'
          ? items.map((item, index) => (
              <li className="leading-8" key={index}>
                {item}
              </li>
            ))
          : null}
        {title === 'Size'
          ? items.map((item, index) => (
              <li
                className="mr-2 mt-2.5 inline-block cursor-pointer border border-[#e5e5e5] py-1.5 px-6 text-sm font-bold uppercase text-[#111]"
                key={index}
              >
                {item}
              </li>
            ))
          : null}
        {title === 'Colors'
          ? items.map((item, index) => (
              <li
                className={`color relative mr-2.5 mb-2.5 inline-block h-8 w-8 cursor-pointer rounded-full after:absolute after:-top-1 after:-left-1 after:h-9 after:w-9 after:rounded-full after:border-2 after:border-[#e5e5e5] after:content-[""]`}
                style={{ background: `${item}` }}
                key={index}
              ></li>
            ))
          : null}
        {title === 'Tags'
          ? items.map((item, index) => (
              <li
                className="mr-1.5 mb-2.5 inline-block bg-[#f1f5f8] py-1.5 px-4 text-xs font-bold uppercase text-[#404040] transition-all duration-300"
                key={index}
              >
                {item}
              </li>
            ))
          : null}
      </ul>
    </div>
  </div>
);

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
      <section className="bg-[#f3f2ee]">
        <div className="container-sm container py-10 text-2xl font-bold text-[#111]">
          Shop
          <div className="mt-2 flex">
            <Link href="/home">
              <h4 className="mr-2 text-sm font-normal">Home</h4>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="mt-1 !h-3" />
            <p className="ml-2 text-sm font-normal text-[#b7b7b7]">Shop</p>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-sm container relative mb-10">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full border border-[#e5e5e5] pl-5 text-sm text-[#b7b7b7]"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-2.5 right-6 h-3.5"
          />
        </div>
        <SidebarItems title="Categories" items={categories} />
        <SidebarItems title="Branding" items={branding} />
        <SidebarItems title="Filter Price" items={filterPrice} />
        <SidebarItems title="Size" items={size} />
        <SidebarItems title="Colors" items={colors} />
        <SidebarItems title="Tags" items={tags} />
      </section>
    </Main>
  );
};

export default Shop;
