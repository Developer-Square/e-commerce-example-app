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
              onClick={(e): void => handleActiveItems(e)}
            >
              <a
                href="#"
                className="text-base font-bold text-gray-900"
                onClick={(): void => setMenuVisibility(false)}
              >
                {item}
              </a>
            </li>
          )}
        </>
      ))}
    </>
  );
};

export default NavItems;
