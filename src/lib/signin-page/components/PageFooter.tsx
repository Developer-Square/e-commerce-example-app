/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

type Props = {
  pageState: string;
  setLoginOpacity: Function;
  setSignUpOpacity: Function;
  setPageState: Function;
  setForgotPasswordOpacity: Function;
};

const PageFooter = ({
  pageState,
  setLoginOpacity,
  setSignUpOpacity,
  setPageState,
  setForgotPasswordOpacity,
}: Props) => {
  if (pageState === 'signup') {
    return (
      <>
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
      </>
    );
  }

  if (pageState === 'forgot') {
    return (
      <>
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
      </>
    );
  }
  return (
    <>
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
    </>
  );
};

export default PageFooter;
