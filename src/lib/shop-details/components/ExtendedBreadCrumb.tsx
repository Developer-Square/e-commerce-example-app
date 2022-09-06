import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const ExtendedBreadCrumb = ({ currentPage }: { currentPage: string }) => {
  return (
    <div className="mb-7 text-2xl font-bold text-[#111]">
      <div className="flex md:justify-center">
        <Link href={`/`}>
          <h4 className="mr-2 text-sm font-normal">Home</h4>
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="mt-1 mr-2 !h-3" />
        <Link href={`/shop`}>
          <h4 className="mr-2 text-sm font-normal">Shop</h4>
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="mt-1 !h-3" />
        <p className="ml-2 text-sm font-normal text-[#b7b7b7]">{currentPage}</p>
      </div>
    </div>
  );
};

export default ExtendedBreadCrumb;
