/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useState } from 'react';

import {
  animated,
  FontAwesomeIcon,
  SubmitButton,
  TextBox,
} from '@/lib/common/index';
import type { IUser, IUserCreateParams } from '@/lib/users/users.types';

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
  const [name, setName] = useState<IUser['name']>('');
  const [email, setEmail] = useState<IUser['email']>('');
  const [password, setPassword] = useState<IUser['password']>('');
  const [confirmPassword, setConfirmPassword] = useState<IUser['password']>('');

  const ButtonContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="card-actions mt-5 flex w-full justify-center">
      {children}
    </div>
  );

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const body: IUserCreateParams = { name, email, password };

    try {
      await axios.post('/api/register', body);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const body: Pick<IUser, 'name' | 'password'> = { name, password };

    try {
      await axios.post('/api/login', body);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  // TODO: Add forgot password logic
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
  }

  if (pageState === 'signup') {
    return (
      <form className="w-full" onSubmit={handleRegister}>
        <animated.div style={signUpProps} className="w-full">
          <TextBox
            title="Username"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            required
          />
        </animated.div>
        <animated.div style={signUpProps} className="w-full">
          <TextBox
            title="Email Address"
            type="text"
            placeholder="Username@gmail.com"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </animated.div>
        <animated.div style={signUpProps} className="mb-4 w-full">
          <TextBox
            title="Password"
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
          />
        </animated.div>
        <animated.div style={signUpProps} className="w-full">
          <TextBox
            title="Confirm Password"
            type="password"
            placeholder="***********"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword((e.target as HTMLInputElement).value)
            }
            required
          />
        </animated.div>
        <ButtonContainer>
          <SubmitButton title="Sign Up" />
        </ButtonContainer>
      </form>
    );
  }

  if (pageState === 'forgot') {
    return (
      <form className="w-full" onSubmit={handleForgotPassword}>
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
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </animated.div>
        <ButtonContainer>
          <SubmitButton title="Send" />
        </ButtonContainer>
      </form>
    );
  }
  return (
    <form className="w-full" onSubmit={handleLogin}>
      <animated.div style={loginProps} className="w-full">
        <TextBox
          title="Email Address"
          type="text"
          placeholder="Username@gmail.com"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
        />
      </animated.div>
      <animated.div style={loginProps} className="w-full">
        <TextBox
          title="Password"
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          required
        />
      </animated.div>
      <ButtonContainer>
        <SubmitButton title="Login" />
      </ButtonContainer>
    </form>
  );
};

export default PageView;
