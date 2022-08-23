/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import { animated, config, useSpring } from 'react-spring';

interface IClientNumberSection {
  clientNumber: number;
  text: string;
  type?: string;
}

const ClientNumberSection = ({
  clientNumber,
  text,
  type,
}: IClientNumberSection) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: clientNumber,
    delay: 200,
    config: config.molasses,
  });

  return (
    <div className="mb-2 flex">
      <div className="flex">
        <animated.div className="mr-1 text-6xl font-bold">
          {number.to((n) => n.toFixed(0))}
        </animated.div>
        {type === 'percentage' ? (
          <span className="mr-2.5 text-6xl font-bold">%</span>
        ) : null}
      </div>
      <span className="flex items-center text-lg font-bold text-[#3d3d3d]">
        {text}
      </span>
    </div>
  );
};

const ClientNumbers = () => {
  return (
    <section className="pt-24">
      <div className="container-sm client-section container border-b border-[#e5e5e5] pb-16 text-[#111]">
        <ClientNumberSection clientNumber={25} text={'Our Clients'} />
        <ClientNumberSection clientNumber={12} text={'Total Categories'} />
        <ClientNumberSection
          clientNumber={98}
          type="percentage"
          text={'Happy Customers'}
        />
      </div>
    </section>
  );
};

export default ClientNumbers;
