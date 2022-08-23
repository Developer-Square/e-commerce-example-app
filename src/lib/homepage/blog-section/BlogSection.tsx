/* eslint-disable tailwindcss/no-custom-classname */
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import React from 'react';

interface IBlogProps {
  title: string;
  date: string;
  img: string;
}

const Blog = ({ title, date, img }: IBlogProps): ReactElement => (
  <div className="relative mb-11 flex flex-col">
    <img src={`/assets/images/blog/${img}.jpg`} alt="blog image" />
    <div className="blog-text flex w-10/12 flex-col bg-[#fff]">
      <div className="mb-2.5 flex">
        <FontAwesomeIcon icon={faCalendar} className="calendar" />
        <span className="ml-2.5 text-xs text-[#3d3d3d]">{date}</span>
      </div>
      <p className="mb-2.5 text-lg font-bold text-[#0d0d0d]">{title}</p>
      <li className="navbar-item list-none">
        <a
          href="#"
          className="shop-now underline decoration-2 underline-offset-4"
        >
          Read More
        </a>
      </li>
    </div>
  </div>
);

const BlogSection = () => {
  return (
    <section className="pt-24 pb-11">
      <div className="container mx-auto">
        <div className="mb-11">
          <span className="sub-title mb-4 block text-center">Latest News</span>
          <h2 className="main-title text-center">Fashion New Trends</h2>
        </div>
        <div className="blogs-container grid px-3.5">
          <Blog
            title="What Curling Irons Are The Best Ones"
            date="16 February 2020"
            img="blog-1"
          />
          <Blog
            title="Eternity Bands Do Last Forever"
            date="21 February 2020"
            img="blog-2"
          />
          <Blog
            title="The Health Benefits Of Sunglasses"
            date="28 February 2020"
            img="blog-3"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
