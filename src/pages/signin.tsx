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

  // When the user switches to the signup page, hide the login input fields.
  const loginProps = useSpring({
    to: { opacity: opacity.to },
    from: { opacity: opacity.from },
    reset: true,
    reverse: false,
    delay: 300,
    config: config.molasses,
  });
  const signUpProps = useSpring({
    to: { opacity: opacity.from },
    from: { opacity: opacity.to },
    reset: true,
    reverse: false,
    delay: 300,
    config: config.molasses,
  });
  return (
    <section
      className={`flex ${
        pageState === 'signin' ? 'h-screen' : 'h-full'
      } w-full items-center justify-center bg-[#dde5f4]`}
    >
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
          {pageState === 'signin' ? (
            <>
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
            </>
          ) : (
            <>
              <animated.div style={signUpProps} className="w-full">
                <TextBox title="Username" type="text" placeholder="John Doe" />
              </animated.div>
              <animated.div style={signUpProps} className="w-full">
                <TextBox
                  title="Email Address"
                  type="text"
                  placeholder="Username@gmail.com"
                />
              </animated.div>
              <animated.div style={signUpProps} className="mb-4 w-full">
                <TextBox
                  title="Password"
                  type="password"
                  placeholder="***********"
                />
              </animated.div>
              <animated.div style={signUpProps} className="w-full">
                <TextBox
                  title="Confirm Password"
                  type="password"
                  placeholder="***********"
                />
              </animated.div>
            </>
          )}
          <div className="card-actions mt-5 flex w-full justify-center">
            <button className="btn w-full rounded-3xl bg-[#3e4684]">
              {pageState === 'signin' ? 'Login' : 'Signup'}
            </button>
            {pageState === 'signin' ? (
              <div className="my-5 flex w-full justify-between text-sm font-semibold">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setOpacity({ to: 0, from: 1 });
                    setPageState('signup');
                  }}
                >
                  Signup
                </span>
                <span className="cursor-pointer">Forgot Password</span>
              </div>
            ) : null}
            {pageState === 'signup' ? (
              <div className="mt-5 flex w-full text-sm font-semibold">
                <span className="flex w-full ">
                  Already have an account?
                  <p
                    className="cursor-pointer pl-1 font-bold"
                    onClick={() => {
                      setOpacity({ to: 1, from: 0 });
                      setPageState('signin');
                    }}
                  >
                    Login
                  </p>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
