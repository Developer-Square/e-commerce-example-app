/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

interface IInfoSectionProps {
  title: string;
  content: string;
}

const data: Record<string, any>[] = [
  {
    title: 'Who We Are ?',
    content:
      'Contextual advertising programs sometimes have strict policies that need to be adhered too. Let’s take Google as an example.',
  },
  {
    title: 'What We Do ?',
    content:
      'In this digital generation where information can be easily obtained within seconds, business cards still have retained their importance.',
  },
  {
    title: 'Why Choose Us ?',
    content:
      'A two or three storey house is the ideal way to maximise the piece of earth on which our home sits, but for older or infirm people.',
  },
];

const InfoSection = ({ title, content }: IInfoSectionProps) => (
  <div className="mb-7">
    <h4 className="mb-2.5 text-2xl font-bold text-[#111]">{title}</h4>
    <p className="mb-0 text-sm text-[#3d3d3d] md:text-base">{content}</p>
  </div>
);

const Info = () => {
  return (
    <section className="pt-24 pb-16">
      <div className="container-sm container">
        <div className="mb-9">
          <img src="/assets/images/about/about-us.jpg" alt="about-us" />
        </div>
        <div className="info-section">
          {data.map((item, index) => (
            <InfoSection
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
