/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__items set-bg">
        <img src="/assets/images/hero/hero-1.jpg" alt="Hero" />
      </div>
      <div className="hero__items set-bg">
        <img src="/assets/images/hero/hero-2.jpg" alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
