import React from 'react';

interface IImagesProps {
  imgSrc: string;
  name: string;
  title: string;
}

const Images = ({ imgSrc, name, title }: IImagesProps) => (
  <div className="mb-7">
    <img
      src={`/assets/images/about/${imgSrc}`}
      alt="Profile photo"
      className="mb-6"
    />
    <h4 className="text-2xl font-bold">{name}</h4>
    <span className="text-base text-[#b7b7b7]">{title}</span>
  </div>
);

const Team = () => {
  return (
    <section className="pt-24 pb-16">
      <div className="container-sm container flex flex-col text-[#111]">
        <div className="mb-11 text-center">
          <span className="sub-title">Our Team</span>
          <h2 className="section-title">Meet Our Team</h2>
        </div>
        <div>
          <Images
            imgSrc="Linus-Profile-Photo.jpg"
            name="Linus Saisi"
            title="Backend Developer"
          />
          <Images
            imgSrc="Sophie-Profile-Pic-cropped-6.jpeg"
            name="Sophie Karima"
            title="Data Analyst"
          />
          <Images
            imgSrc="Ryan's-Profile-Pic-cropped-2.jpeg"
            name="Ryan Njoroge"
            title="Frontend Developer"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
