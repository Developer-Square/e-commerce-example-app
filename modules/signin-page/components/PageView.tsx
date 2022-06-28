/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { animated, FontAwesomeIcon, TextBox } from '@/modules/common/index';

type Props = {
  pageState: string;
  signUpProps: any;
  loginProps: any;
  forgotPasswordProps: any;
};

const PageView = ({
  pageState,
  signUpProps,
  loginProps,
  forgotPasswordProps,
}: Props) => {
  if (pageState === 'signup') {
    return (
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
          <TextBox title="Password" type="password" placeholder="***********" />
        </animated.div>
        <animated.div style={signUpProps} className="w-full">
          <TextBox
            title="Confirm Password"
            type="password"
            placeholder="***********"
          />
        </animated.div>
      </>
    );
  }

  if (pageState === 'forgot') {
    return (
      <>
        <animated.div style={forgotPasswordProps} className="w-full">
          <div className="alert alert-info mb-4 text-white shadow-lg">
            <div>
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#fff' }} />
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
    );
  }
  return (
    <>
      <animated.div style={loginProps} className="w-full">
        <TextBox
          title="Email Address"
          type="text"
          placeholder="Username@gmail.com"
        />
      </animated.div>
      <animated.div style={loginProps} className="w-full">
        <TextBox title="Password" type="password" placeholder="***********" />
      </animated.div>
    </>
  );
};

export default PageView;
