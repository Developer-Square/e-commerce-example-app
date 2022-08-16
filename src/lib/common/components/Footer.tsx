import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { AppConfig } from '@/utils/AppConfig';

interface IFooterItems {
  title: string;
  items: string[];
}

const FooterItems = ({ title, items }: IFooterItems) => (
  <div className="mb-7">
    <h6 className="mb-5 font-bold uppercase tracking-widest text-[#fff]">
      {title}
    </h6>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="leading-9">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#111] pt-16">
      <div className="container grid grid-cols-1 text-sm text-[#b7b7b7]">
        <div className="mb-7">
          <a href="#">
            <img
              className="mb-7 w-auto"
              src="/assets/images/footer-logo.png"
              alt="footer-logo"
            />
          </a>
          <p className="mb-7 font-normal">
            The customer is at the heart of our unique business model, which
            includes design.
          </p>
          <a href="#">
            <img src="/assets/images/payment.png" alt="payment" />
          </a>
        </div>
        <FooterItems
          title="Shopping"
          items={['Clothing Store', 'Trending Shoes', 'Accessories', 'Sale']}
        />
        <FooterItems
          title="Contact"
          items={[
            'Contact Us',
            'Payment Methods',
            'Delivery',
            'Return & Exchanges',
          ]}
        />
        <div className="mb-7">
          <h6 className="mb-5 font-bold uppercase tracking-widest text-[#fff]">
            Newsletter
          </h6>
          <p className="mb-3.5">
            Be the first to know about new arrivals, look books, sales & promos!
          </p>
          <form className="relative">
            <input
              className="w-full border-b-2 border-[#fff] bg-transparent py-3.5 text-sm text-[#fff] focus:outline-none"
              type="text"
              placeholder="Your email"
            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute top-5 right-0 h-6"
              />
            </button>
          </form>
        </div>
        <div className="py-8 text-center text-sm text-[#fff]">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. All rights
          reserved | This template is made with{' '}
          <span>
            <FontAwesomeIcon icon={faHeart} className="h-4 text-[#e53637]" />
          </span>{' '}
          by{' '}
          <span className="font-bold text-[#e53637]">
            {' '}
            <a href="https://www.techive.org/" target="_blank" rel="noreferrer">
              tecHive
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
