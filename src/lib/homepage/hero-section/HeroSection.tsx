/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { a, useTrail } from 'react-spring';
import { Autoplay, EffectCreative, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface HeroProps {
  imgSource: string;
  altTag: string;
  title: string;
  subtitle: string;
  text: string;
  open: boolean;
}

// Custom component to add an effect to the HeroTextSection.
const Trail = ({ open, children }: { open: boolean; children: ReactNode }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    height: open ? 130 : 0,
    from: { opacity: 0, height: 0 },
  });
  return (
    <div>
      {/* @ts-ignore */}
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="trailsText" style={style}>
          <a.div style={index === 1 ? { height } : {}}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const HeroTextSection = ({
  imgSource,
  altTag,
  title,
  subtitle,
  text,
  open,
}: HeroProps) => {
  return (
    <>
      <img src={imgSource} alt={altTag} />
      <div className="top-9/50 md:left-1/10 hero-container absolute left-2.5 text-left sm:left-7">
        <Trail open={open}>
          <h6 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#e53637]">
            {subtitle}
          </h6>
          <h2 className="title mb-6 text-4xl font-bold text-[#111111] md:w-9/12">
            {title}
          </h2>
          <p className="mb-7 w-3/4 text-sm font-normal text-[#3d3d3d] md:w-8/12">
            {text}
          </p>
          <a
            href="#"
            className="inline-block bg-[#000] py-3.5 px-8 text-sm font-bold uppercase text-[#fff]"
          >
            Shop now <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
          </a>
        </Trail>
      </div>
    </>
  );
};

const HeroSection = () => {
  const [openSlideOne, setOpenSlide0ne] = useState(true);
  const [openSlideTwo, setOpenSlideTwo] = useState(true);

  // Changes which slide will receive the useTrail effect.
  const changeEffect = () => {
    const activeSlide = document.querySelector('.swiper-slide-visible');
    const image = activeSlide?.firstChild;
    if (image) {
      // @ts-ignore
      if (image.alt === 'slide-1') {
        setOpenSlide0ne(true);
        setOpenSlideTwo(false);
      } else {
        setOpenSlide0ne(false);
        setOpenSlideTwo(true);
      }
    }
  };

  const addListener = () => {
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => changeEffect());
      nextBtn.addEventListener('click', () => changeEffect());
    }
  };

  useEffect(() => {
    addListener();
  }, []);
  return (
    <section className="hero">
      <Swiper
        navigation={true}
        loop={true}
        centeredSlides={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, EffectCreative, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="relative md:mx-auto">
          <HeroTextSection
            imgSource="/assets/images/hero/hero-1.jpg"
            title="Fall - Winter Collections 2030"
            altTag="slide-1"
            subtitle="Summer Collection"
            text="A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality."
            open={openSlideOne}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroTextSection
            imgSource="/assets/images/hero/hero-2.jpg"
            title="Fall - Winter Collections 2030"
            altTag="slide-2"
            subtitle="Summer Collection"
            text="A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality."
            open={openSlideTwo}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
