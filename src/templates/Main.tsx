/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import {
  faBlog,
  faCartShopping,
  faCircleQuestion,
  faCreditCard,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { easings } from 'react-spring';

import { config, useSpring } from '@/lib/common';
import Footer from '@/lib/common/components/Footer';
import TopBar from '@/lib/common/components/TopBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const pages = [
  {
    title: 'About Us',
    content: 'Read our story on how and why we made this site',
    icon: faBlog,
  },
  {
    title: 'Shop Details',
    content: 'All the product details you need to make a decision',
    icon: faStore,
  },
  {
    title: 'Shopping Cart',
    content: 'View all the items in cart',
    icon: faCartShopping,
  },
  {
    title: 'Check Out',
    content: 'Finished shopping? Buy the goods and have them delivered.',
    icon: faCreditCard,
  },
  {
    title: 'FAQs',
    content: 'Need some answers? Visit our Faqs section',
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

  const handleActiveItems = (e: any) => {
    const navbarItems = document.querySelectorAll('.navbar-item');
    Array.from(navbarItems).map((item) => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}
      <TopBar
        navbarProps={navbarProps}
        pages={pages}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
        handleActiveItems={handleActiveItems}
      />
      <div className="content text-xl">{props.children}</div>

      <Footer />
    </div>
  );
};

export { Main };
