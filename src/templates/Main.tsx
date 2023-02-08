/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import { faBlog, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { easings } from "react-spring";

import { config, useSpring } from "@/lib/common";
import Footer from "@/lib/common/components/Footer";
import TopBar from "@/lib/common/components/TopBar";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const pages = [
  {
    title: "About Us",
    content: "Read our story on how and why we made this site",
    icon: faBlog,
  },
  {
    title: "FAQs",
    content: "Need some answers? Visit our Faqs section",
    icon: faCircleQuestion,
  },
];

const Main = (props: IMainProps) => {
  const [showProps, setShowProps] = useState<Record<string, number>>({
    toOpacity: 0,
    fromOpacity: 0,
  });
  const [menuVisibility, setMenuVisibility] = useState(false);
  const navbarProps = useSpring({
    to: {
      opacity: showProps.toOpacity,
    },
    from: {
      opacity: showProps.fromOpacity,
    },
    reset: true,
    reverse: false,
    config: {
      ...config.molasses,
      duration: 570,
      easing: easings.easeInOutCubic,
    },
  });

  useMemo((): void => {
    if (menuVisibility) {
      setShowProps({
        toOpacity: 1,
        fromOpacity: 0,
      });
    } else {
      setShowProps({
        toOpacity: 0,
        fromOpacity: 1,
      });
    }
  }, [menuVisibility]);

  const removeActiveItems = () => {
    const navbarItems = document.querySelectorAll(".navbarItem");
    Array.from(navbarItems).map((item) => item.classList.remove("active"));
  };

  const addActiveItems = (item: string) => {
    const navbarItem = document.querySelector(`.${item}`);
    if (navbarItem) {
      removeActiveItems();
      navbarItem.classList.add("active");
    }
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("shop")) {
      addActiveItems("shop");
    } else if (url.includes("contacts")) {
      addActiveItems("contacts");
    } else if (url.includes("signin")) {
      addActiveItems("signin");
    } else if (url.includes("home")) {
      addActiveItems("home");
    } else {
      removeActiveItems();
    }
  }, []);

  return (
    <div className="w-full text-gray-700 antialiased">
      {props.meta}
      <TopBar
        navbarProps={navbarProps}
        pages={pages}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
      />
      <div className="content text-xl">{props.children}</div>

      <Footer />
    </div>
  );
};

export { Main };
