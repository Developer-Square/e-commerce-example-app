/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

interface IClientNumberSection {
  number: number | string;
  text: string;
}

const ClientNumberSection = ({ number, text }: IClientNumberSection) => (
  <div className="mb-2 flex">
    <h2 className="mr-2.5 text-6xl font-bold">{number}</h2>
    <span className="flex items-center text-lg font-bold text-[#3d3d3d]">
      {text}
    </span>
  </div>
);

const ClientNumbers = () => {
  return (
    <section className="pt-24">
      <div className="container-sm client-section container border-b border-[#e5e5e5] pb-16 text-[#111]">
        <ClientNumberSection number={25} text={'Our Clients'} />
        <ClientNumberSection number={12} text={'Total Categories'} />
        <ClientNumberSection number={'98%'} text={'Happy Customers'} />
      </div>
    </section>
  );
};

export default ClientNumbers;
