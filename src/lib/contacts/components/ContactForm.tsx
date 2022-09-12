import React from 'react';

import TextInput from '@/lib/checkout/components/TextInput';

import TextArea from './TextArea';

const ContactTitle = () => (
  <div className="mb-10">
    <span className="sub-title mb-4">Information</span>
    <h2 className="mb-5 text-4xl font-bold">Contact Us</h2>
    <p className="text-base text-[#707070]">
      As you might expect of a company that began as a high-end interiors
      contractor, we pay strict attention.
    </p>
  </div>
);

const ContactInfo = () => (
  <ul>
    <li className="mb-6">
      <h4 className="mb-2 text-2xl font-bold">Kenya</h4>
      <p className="text-base leading-7">
        31832-00600 Ngara Road <br /> +254 703418580
      </p>
    </li>
  </ul>
);

const ContactForm = () => {
  return (
    <div className="container-sm container py-24 md:flex">
      <div className="mr-8 md:w-1/2">
        <ContactTitle />
        <ContactInfo />
      </div>
      <div className="md:w-1/2">
        <TextInput title="Name" />
        <TextInput title="Email" />
        <TextArea title="Message" />
        <a href="#" className="black-btn mt-6">
          Send Message
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
