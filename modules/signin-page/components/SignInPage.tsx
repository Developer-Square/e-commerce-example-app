/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React, { useState } from 'react';

import {
  animated,
  config,
  FontAwesomeIcon,
  TextBox,
  useSpring,
} from '@/modules/common/index';
import JewelleryIcon from '@/public/assets/images/icons/jewelry.png';

const SignInPage = () => {
  const [loginOpacity, setLoginOpacity] = useState<Record<string, number>>({
    to: 1,
    from: 0,
  });
  const [signUpOpacity, setSignUpOpacity] = useState<Record<string, number>>(
    {}
  );
  const [forgotPasswordOpacity, setForgotPasswordOpacity] = useState<
    Record<string, number>
  >({});
  const [pageState, setPageState] = useState('signin');

  // When the user switches to the signup page, hide the login input fields.
  const loginProps = useSpring({
    to: { opacity: loginOpacity.to },
    from: { opacity: loginOpacity.from },
    reset: true,
    reverse: false,
    delay: 300,
    config: config.molasses,
  });

  const signUpProps = useSpring({
    to: { opacity: signUpOpacity.to },
    from: { opacity: signUpOpacity.from },
    reset: true,
    reverse: false,
    delay: 300,
    config: config.molasses,
  });

  const forgotPasswordProps = useSpring({
    to: { opacity: forgotPasswordOpacity.to },
    from: { opacity: forgotPasswordOpacity.from },
    reset: true,
    reverse: false,
    delay: 300,
    config: config.molasses,
  });
  return (
    <section
      className={`flex ${
        pageState === 'signup' ? 'h-full' : 'h-screen'
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
          ) : null}{' '}
          {pageState === 'signup' ? (
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
          ) : null}
          {pageState === 'forgot' ? (
            <>
              <animated.div style={forgotPasswordProps} className="w-full">
                <div className="alert alert-info mb-4 text-white shadow-lg">
                  <div>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      style={{ color: '#fff' }}
                    />
                    <span>
                      You'll receive an email with a link to reset your passord.
                    </span>
                  </div>
                </div>
                <TextBox
                  title="Email Address"
                  type="text"
                  placeholder="Username@gmail.com"
                />
              </animated.div>
            </>
          ) : null}
          <div className="card-actions mt-5 flex w-full justify-center">
            <button className="btn w-full rounded-3xl bg-[#3e4684]">
              {pageState === 'signin' ? 'Login' : null}
              {pageState === 'signup' ? 'Signup' : null}
              {pageState === 'forgot' ? 'Send' : null}
            </button>
            {pageState === 'forgot' ? (
              <button
                className="btn mt-2 w-full rounded-3xl bg-red-500"
                onClick={() => {
                  setLoginOpacity({ to: 1, from: 0 });
                  setForgotPasswordOpacity({ to: 0, from: 1 });
                  setPageState('signin');
                }}
              >
                Back
              </button>
            ) : null}
            {pageState === 'signin' ? (
              <div className="my-5 flex w-full justify-between text-sm font-semibold">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setLoginOpacity({ to: 0, from: 1 });
                    setSignUpOpacity({ to: 1, from: 0 });
                    setPageState('signup');
                  }}
                >
                  Signup
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setLoginOpacity({ to: 0, from: 1 });
                    setForgotPasswordOpacity({ to: 1, from: 0 });
                    setPageState('forgot');
                  }}
                >
                  Forgot Password
                </span>
              </div>
            ) : null}
            {pageState === 'signup' ? (
              <div className="mt-5 flex w-full text-sm font-semibold">
                <span className="flex w-full ">
                  Already have an account?
                  <p
                    className="cursor-pointer pl-1 font-bold"
                    onClick={() => {
                      setLoginOpacity({ to: 1, from: 0 });
                      setSignUpOpacity({ to: 0, from: 1 });
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

export default SignInPage;
