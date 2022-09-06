/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const imageSources = [
  'client-1',
  'client-2',
  'client-3',
  'client-4',
  'client-5',
  'client-6',
  'client-7',
  'client-8',
];

const Partners = () => {
  return (
    <section className="pb-6">
      <div className="container-sm container">
        <div>
          <div className="mb-11 text-center">
            <span className="sub-title">Partners</span>
            <h2 className="section-title">Happy Clients</h2>
          </div>
          <div className="partner-section grid grid-cols-2">
            {imageSources.map((img, index) => (
              <div className="mb-16 flex justify-center" key={index}>
                <img src={`/assets/images/clients/${img}.png`} alt="clients" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
