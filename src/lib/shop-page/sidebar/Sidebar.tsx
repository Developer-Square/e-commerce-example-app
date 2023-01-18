/* eslint-disable tailwindcss/no-custom-classname */
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
export const size = ['xs', 's', 'm', 'xl', '2xl', '3xl', '4xl'];
export const colors = [
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
  <div
    tabIndex={0}
    className="container-sm container collapse-arrow rounded-box collapse font-bold"
  >
    <div className="collapse-title text-base font-bold uppercase text-[#111]">
      {title}
    </div>
    <div className="">
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
              <li className="size-item" key={index}>
                {item}
              </li>
            ))
          : null}
        {title === 'Colors'
          ? items.map((item, index) => (
              <li
                className={`color colors-item`}
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

const Sidebar = () => {
  return (
    <section className="sidebar py-24">
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
  );
};

export default Sidebar;
