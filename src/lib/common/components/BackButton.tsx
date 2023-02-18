import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const BackButton = () => {
  return (
    <Link href="/" legacyBehavior>
      <div className="absolute mt-5 ml-10 flex cursor-pointer items-center sm:ml-5">
        <FontAwesomeIcon icon={faArrowLeft} />
        <p className="ml-2 font-bold">Go back to Previous Page</p>
      </div>
    </Link>
  );
};

export default BackButton;
