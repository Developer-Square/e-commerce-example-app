/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import TextBox from 'modules/common/TextBox';
import Image from 'next/image';
import React, { useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import JewelleryIcon from '@/public/assets/images/icons/jewelry.png';

const Signin = () => {
  const [opacity, setOpacity] = useState<Record<string, number>>({
    to: 1,
    from: 0,
  });
  const [pageState, setPageState] = useState('signin');

  const loginProps = useSpring({
    to: { opacity: opacity.to },
    from: { opacity: opacity.from },
    reset: true,
    reverse: false,
    delay: 200,
    config: config.molasses,
  });
  const signUpProps = useSpring({
    to: { opacity: opacity.from },
    from: { opacity: opacity.to },
    reset: true,
    reverse: false,
    delay: 200,
    config: config.molasses,
  });
  return (
    <section className="flex h-screen w-full items-center justify-center bg-[#dde5f4]">
      <div className="card w-96 bg-[#f1f7fe] text-slate-800">
        <animated.div
          style={loginProps}
          className="card-body flex items-center justify-center"
        >
          <div className="mb-4">
            <Image
              src={JewelleryIcon}
              alt="jewellry icon"
              width={100}
              height={100}
            />
          </div>
          <animated.div style={loginProps} className="w-full">
            <TextBox
              title="Email Address"
              type="text"
              placeholder="Username@gmail.com"
            />
          </animated.div>
          <animated.div style={loginProps} className="w-full">
            <TextBox
              title="Password"
              type="password"
              placeholder="***********"
            />
          </animated.div>
          <animated.div style={signUpProps} className="w-full">
            <TextBox
              title="Email Address"
              type="text"
              placeholder="Username@gmail.com"
            />
          </animated.div>
          <div className="card-actions mt-5 flex w-full justify-center">
            <button className="btn w-full rounded-3xl bg-[#3e4684]">
              {pageState === 'signin' ? 'Login' : 'Signup'}
            </button>

            <div className="my-6 flex w-full justify-between text-sm font-semibold">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setOpacity({ to: 0, from: 1 });
                  setPageState('signup');
                }}
              >
                Signup
              </span>
              <span className="cursor-pointer">Forgot password</span>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default Signin;
