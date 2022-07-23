/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const FeatureSections = () => {
  return (
    <div className="container mx-auto mt-24 px-4">
      <div className="column-1">
        <div className="flex flex-col">
          <img src="/assets/images/banner/banner-1.jpg" alt="feature section" />
          <p className="mb-2.5 max-w-full pt-6 text-4xl font-bold text-[#111]">
            Clothing Collections 2030
          </p>
          <li className="">
            <a
              href="#"
              className="letter-spacing py-1 text-sm font-bold uppercase text-[#111]"
            >
              Shop Now
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default FeatureSections;
