/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState } from 'react';

import { useCountdown } from '@/hooks/useCountdown';

import ShowCounter from './components/ShowCounter';

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

const WeeklyDeal = () => {
  const [days, hours, minutes, seconds] = useCountdown(dateTimeAfterThreeDays);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (days && hours && minutes && seconds) {
      setTotal(days + hours + minutes + seconds);
    }
  }, [days, hours, minutes, seconds]);
  return (
    <section className="bg-[#f3f2ee] py-32 lg:py-16">
      <div className="container mx-auto mt-16 px-4 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="relative mb-10">
          <img
            src="/assets/images/product-sale.png"
            className="w-full"
            alt="product-sale"
          />
          <div className="absolute right-0 -top-9 h-24 w-24 rounded-full bg-[#111111] pt-5 text-center">
            <span className="d-block mb-0.5 text-base text-[#fff]">
              Sale Of
            </span>
            <h5 className="text-xl font-bold text-[#fff]">$29.99</h5>
          </div>
        </div>
        <div>
          <div>
            <span className="sub-title">Deal Of The Week</span>
            <h2 className="main-title mb-6">Multi-pocket Chest Bag Black</h2>
            {total <= 0 ? (
              <h4>Expired</h4>
            ) : (
              <ShowCounter
                days={days || 0}
                hours={hours || 0}
                minutes={minutes || 0}
                seconds={seconds || 0}
              />
            )}
            <a
              href="#"
              className="shop-now inline-block bg-[#000] py-3.5 px-8 text-[#fff]"
            >
              Shop now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeal;
