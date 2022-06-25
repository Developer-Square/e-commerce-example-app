/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

import JewelleryIcon from '@/public/assets/images/icons/jewelry.png';

const Signin = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-[#dde5f4]">
      <div className="card w-96 bg-[#f1f7fe] text-slate-800">
        <div className="card-body flex items-center justify-center">
          <div className="mb-4">
            <Image
              src={JewelleryIcon}
              alt="jewellry icon"
              width={100}
              height={100}
            />
          </div>
          <div className="mb-4 w-full rounded-3xl bg-white p-2">
            <label className="label pl-4 pb-0">Email Address</label>
            <div className="flex items-center pl-4">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                placeholder="Username@gmail.com"
                className="input-ghost input w-full max-w-xs pl-1 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full rounded-3xl bg-white p-2">
            <label className="label pl-4 pb-0">Password</label>
            <div className="flex items-center pl-4">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="***********"
                className="input-ghost input w-full max-w-xs pl-1 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn">Login</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
