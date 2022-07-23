/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

type Props = {
  content: string;
  image: string;
};

const Section = ({ content, image }: Props) => {
  return (
    <div className="mb-10 flex flex-col items-center md:flex-row">
      <div className="image-text relative w-full">
        <div className="absolute top-1/4 left-10 w-full max-w-xs">
          <p className="mb-2.5 max-w-full pt-6 text-4xl font-bold text-[#111]">
            {content}
          </p>
          <li className="navbar-item w-32">
            <a
              href="#"
              className="letter-spacing py-1 text-sm font-bold uppercase text-[#111]"
            >
              Shop Now
            </a>
          </li>
        </div>
      </div>
      <img
        className=""
        src={`/assets/images/banner/${image}`}
        alt="feature section"
      />
    </div>
  );
};

const FeatureSections = () => {
  return (
    <div className="container mx-auto mt-24 px-4">
      <div className="column-1">
        <Section content="Clothing Collections 2030" image="banner-1.jpg" />
        <Section content="Accessories" image="banner-2.jpg" />
        <Section content="Shoe Spring 2030" image="banner-3.jpg" />
      </div>
    </div>
  );
};

export default FeatureSections;
