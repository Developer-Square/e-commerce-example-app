import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type Props = {
  previousLink: string;
  previousTitle: string;
  currentTitle: string;
};

const Breadcrumb = ({ previousLink, previousTitle, currentTitle }: Props) => {
  return (
    <section className="bg-[#f3f2ee]">
      <div className="container-sm container py-10 text-2xl font-bold text-[#111]">
        {currentTitle}
        <div className="mt-2 flex">
          <Link href={`/${previousLink}`} legacyBehavior>
            <h4 className="mr-2 text-sm font-normal">{previousTitle}</h4>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="mt-1 !h-3" />
          <p className="ml-2 text-sm font-normal text-[#b7b7b7]">
            {currentTitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
