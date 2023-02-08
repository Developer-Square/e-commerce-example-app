import React from "react";

import { Meta } from "@/layouts/Meta";
import { ContactForm } from "@/lib/contacts";
import { Main } from "@/templates/Main";

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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.033586048502!2d36.968045114669934!3d-1.1363954991710858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fc955678a67%3A0xb42cac64d8e16dea!2sSpur%20Mall!5e0!3m2!1sen!2ske!4v1675829012359!5m2!1sen!2ske"
          height="500"
          style={{ border: 0, width: "100%" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <ContactForm />
      </section>
    </Main>
  );
};

export default Contacts;
