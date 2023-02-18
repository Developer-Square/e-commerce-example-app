/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import React from "react";

import { ExpandableNavItem } from "@/lib/common";

type Props = {
  pages: Record<string, any>[];
  navbarProps: any;
  menuVisibility: boolean;
  setMenuVisibility: Function;
};

const navItems = ["Home", "Shop", "Pages", "Contacts", "Signin"];

const NavItems = ({
  pages,
  navbarProps,
  menuVisibility,
  setMenuVisibility,
}: Props) => {
  return (
    <>
      {navItems.map((item, index) => (
        <div key={index}>
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
              className={`navbarItem ${item.toLowerCase()}`}
              onClick={(): void => setMenuVisibility(false)}
            >
              <Link
                href={`${item === "Home" ? "/" : `${item.toLowerCase()}`}`}
                className="text-base font-bold text-gray-900"
              >
                {item}
              </Link>
            </li>
          )}
        </div>
      ))}
    </>
  );
};

export default NavItems;
