/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */

import React from 'react';

import { ErrorBoundary } from '@/modules/errors';
import { SignInPage } from '@/modules/signin-page';

const Signin = () => (
  <ErrorBoundary>
    <SignInPage />
  </ErrorBoundary>
);

export default Signin;
