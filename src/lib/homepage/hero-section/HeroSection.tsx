/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSection = () => {
  return (
    <section className="hero">
      <Swiper
        navigation={true}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/images/hero/hero-1.jpg" alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/hero/hero-2.jpg" alt="slide-2" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
