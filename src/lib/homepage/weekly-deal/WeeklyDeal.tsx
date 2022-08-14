/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const WeeklyDeal = () => {
  return (
    <section className="bg-[#f3f2ee] pt-36 pb-32">
      <div className="container mx-auto mt-16 px-4">
        <div className="relative mb-10">
          <img src="/assets/images/product-sale.png" alt="product-sale" />
          <div className="absolute right-0 -top-9 h-24 w-24 rounded-full bg-[#111111] pt-5 text-center">
            <span className="d-block mb-0.5 text-base text-[#fff]">
              Sale Of
            </span>
            <h5 className="text-xl font-bold text-[#fff]">$29.99</h5>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1">
          <div className="categories__deal__countdown">
            <span className="subtitle">Deal Of The Week</span>
            <h2 className="mb-6 text-4xl font-bold text-[#111]">
              Multi-pocket Chest Bag Black
            </h2>
            <div className="categories__deal__countdown__timer" id="countdown">
              <div className="cd-item">
                <span>3</span>
                <p>Days</p>
              </div>
              <div className="cd-item">
                <span>1</span>
                <p>Hours</p>
              </div>
              <div className="cd-item">
                <span>50</span>
                <p>Minutes</p>
              </div>
              <div className="cd-item">
                <span>18</span>
                <p>Seconds</p>
              </div>
            </div>
            <a href="#" className="primary-btn">
              Shop now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeal;
