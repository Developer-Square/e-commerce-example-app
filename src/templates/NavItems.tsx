import Link from 'next/link';
import React from 'react';

import { ExpandableNavItem } from '@/lib/common';

type Props = {
  pages: Record<string, any>[];
  navbarProps: any;
  menuVisibility: boolean;
  handleActiveItems: Function;
  setMenuVisibility: Function;
};

const navItems = ['Home', 'Shop', 'Pages', 'Contacts', 'Signin'];

const NavItems = ({
  pages,
  navbarProps,
  menuVisibility,
  handleActiveItems,
  setMenuVisibility,
}: Props) => {
  const handleMenuItemClick = (evt: any) => {
    handleActiveItems(evt);
    setMenuVisibility(false);
  };
  return (
    <>
      {navItems.map((item, index) => (
        <>
          {index === 2 ? (
            <ExpandableNavItem
              key={index}
              pages={pages}
              useSpringProps={navbarProps}
              menuVisibility={menuVisibility}
              setMenuVisibility={setMenuVisibility}
            />
          ) : (
            <li
              key={index}
              className="navbar-item"
              onClick={(e): void => handleMenuItemClick(e)}
            >
              <Link href={`${item === 'Home' ? '/' : `${item.toLowerCase()}`}`}>
                <a href="#" className="text-base font-bold text-gray-900">
                  {item}
                </a>
              </Link>
            </li>
          )}
        </>
      ))}
    </>
  );
};

export default NavItems;
