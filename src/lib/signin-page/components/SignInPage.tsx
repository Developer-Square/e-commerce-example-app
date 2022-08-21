/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import React, { useState } from 'react';

import { config, useSpring } from '@/lib/common/index';
import JewelleryIcon from '@/public/assets/images/icons/jewelry.png';

import PageFooter from './PageFooter';
import PageView from './PageView';

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

  // This add a smooth opacity animation when the user switches to the signup or forgot password view.
  const loginProps = useSpring({
    to: { opacity: loginOpacity.to },
    from: { opacity: loginOpacity.from },
    reset: true,
    reverse: false,
    delay: 401,
    config: config.molasses,
  });

  const signUpProps = useSpring({
    to: { opacity: signUpOpacity.to },
    from: { opacity: signUpOpacity.from },
    reset: true,
    reverse: false,
    delay: 400,
    config: config.molasses,
  });

  const forgotPasswordProps = useSpring({
    to: { opacity: forgotPasswordOpacity.to },
    from: { opacity: forgotPasswordOpacity.from },
    reset: true,
    reverse: false,
    delay: 400,
    config: config.molasses,
  });
  return (
    <section
      className={`flex h-screen w-full items-center justify-center bg-[#dde5f4]`}
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
          <PageView
            loginProps={loginProps}
            signUpProps={signUpProps}
            forgotPasswordProps={forgotPasswordProps}
            pageState={pageState}
          />
          <div className="card-actions flex w-full justify-center">
            <PageFooter
              pageState={pageState}
              setPageState={setPageState}
              setLoginOpacity={setLoginOpacity}
              setSignUpOpacity={setSignUpOpacity}
              setForgotPasswordOpacity={setForgotPasswordOpacity}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
