import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Testimonial = () => {
  return (
    <section className="bg-[#f3f2ee]">
      <div className="container-sm container">
        <div className="flex flex-col justify-center py-14 px-10">
          <FontAwesomeIcon icon={faQuoteRight} className="!h-14" />
          <p className="mb-6 pt-3 text-xl italic text-[#111]">
            “Going out after work? Take your butane curling iron with you to the
            office, heat it up, style your hair before you leave the office and
            you won’t have to make a trip back home.”
          </p>
          <div className="flex justify-center">
            <div className="mr-5">
              <img
                src="/assets/images/about/testimonial-1.jpg"
                alt="testimonial"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <h5 className="mb-1 text-lg font-bold text-[#111]">
                Augusta Schultz
              </h5>
              <p className="italic text-[#b7b7b7]">Fashion Design</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/assets/images/about/testimonial-pic.jpg"
          alt="testimonial"
          className="testimonial"
        />
      </div>
    </section>
  );
};

export default Testimonial;
