import React from 'react';

import { Meta } from '@/layouts/Meta';
import { ContactForm, Map } from '@/lib/contacts';
import { Main } from '@/templates/Main';

const Contacts = () => {
  return (
    <Main
      meta={
        <Meta
          title="Jewellery and Hand Carvings E-Commerce"
          description="An ecommerce site for selling jewellery and hand carvings in Kenya"
        />
      }
    >
      <section className="text-[#111]">
        <Map />
        <ContactForm />
      </section>
    </Main>
  );
};

export default Contacts;
