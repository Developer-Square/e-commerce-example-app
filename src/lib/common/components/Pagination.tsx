/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

const Pagination = () => {
  return (
    <div className="container-sm container mb-16 flex justify-center">
      <div className="btn-group">
        <button className="pagination-btn btn-active btn">1</button>
        <button className="pagination-btn btn">2</button>
        <button className="pagination-btn btn">3</button>
        <button className="pagination-btn btn-disabled btn">...</button>
        <button className="pagination-btn btn">9</button>
        <button className="pagination-btn btn">10</button>
      </div>
    </div>
  );
};

export default Pagination;
