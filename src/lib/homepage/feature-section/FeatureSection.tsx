/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

type Props = {
  content: string;
  image: string;
};

const Section = ({ content, image }: Props) => {
  return (
    <div className="mb-10 flex flex-col items-center md:flex-row">
      <img
        className="mobile-image w-full"
        src={`/assets/images/banner/${image}`}
        alt="feature section"
      />
      {/* This is done for purely aesthetics, just so as the UI can look similar to the design */}
      {content === 'Accessories' ? (
        <img
          className="web-image w-full"
          src={`/assets/images/banner/${image}`}
          alt="feature section"
        />
      ) : null}
      <div className="image-text relative w-full">
        <div
          className={`w-full max-w-xs md:absolute md:top-1/4 md:left-10 ${
            content !== 'Accessories' ? 'lg:left-96' : ''
          }`}
        >
          <p className="mb-2.5 max-w-full pt-6 text-4xl font-bold text-[#111]">
            {content}
          </p>
          <li className="navbar-item w-32">
            <a href="#" className="shop-now">
              Shop Now
            </a>
          </li>
        </div>
      </div>
      {content !== 'Accessories' ? (
        <img
          className="web-image"
          src={`/assets/images/banner/${image}`}
          alt="feature section"
        />
      ) : null}
    </div>
  );
};

const FeatureSections = () => {
  return (
    <section>
      <div className="container mx-auto mt-24 px-4">
        <div className="column-1">
          <Section content="Clothing Collections 2030" image="banner-1.jpg" />
          <Section content="Accessories" image="banner-2.jpg" />
          <Section content="Shoe Spring 2030" image="banner-3.jpg" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSections;
