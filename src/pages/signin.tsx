/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */

import React from 'react';

import BackButton from '@/lib/common/components/BackButton';
import { ErrorBoundary } from '@/lib/error-handling';
import { SignInPage } from '@/lib/signin-page';

const Signin = () => (
  <ErrorBoundary>
    <BackButton />
    <SignInPage />
  </ErrorBoundary>
);

export default Signin;
