/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/no-unescaped-entities */
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";

import {
  animated,
  FontAwesomeIcon,
  SubmitButton,
  TextBox,
} from "@/lib/common/index";
import type { IUser, IUserCreateParams } from "@/lib/users/users.types";

type Props = {
  pageState: string;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  signUpProps: any;
  loginProps: any;
  setLoginOpacity: React.Dispatch<React.SetStateAction<any>>;
  setSignUpOpacity: React.Dispatch<React.SetStateAction<any>>;
  forgotPasswordProps: any;
};

const PageView = ({
  pageState,
  signUpProps,
  loginProps,
  forgotPasswordProps,
  setLoginOpacity,
  setSignUpOpacity,
  setPageState,
}: Props) => {
  const [name, setName] = useState<IUser["name"]>("");
  const [email, setEmail] = useState<IUser["email"]>("");
  const [password, setPassword] = useState<IUser["password"]>("");
  const [confirmPassword, setConfirmPassword] = useState<IUser["password"]>("");
  const [loading, setLoading] = useState(false);

  const ButtonContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="card-actions mt-5 flex w-full justify-center">
      {children}
    </div>
  );

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body: IUserCreateParams = { name, email, password };

    try {
      const res = await axios.post("/api/auth/register", body);
      if (res.status === 201) {
        setLoading(false);
        setPageState("signin");
        setLoginOpacity({ to: 1, from: 0 });
        setSignUpOpacity({ to: 0, from: 1 });
      }
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();
    const body = { username: name, password };

    try {
      const res = await axios.post("/api/auth/login", body);
      if (res.status === 200) {
        setLoading(false);
        Router.push("/");
      }
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  // TODO: Add forgot password logic
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = { email };
    try {
      await axios.post("/api/auth/forgot-password", body);
      setLoading(false);
      // TODO: Add notification for "please check your email"
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  if (pageState === "signup") {
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
          <SubmitButton loading={loading} title="Sign Up" />
        </ButtonContainer>
      </form>
    );
  }

  if (pageState === "forgot") {
    return (
      <form className="w-full" onSubmit={handleForgotPassword}>
        <animated.div style={forgotPasswordProps} className="w-full">
          <div className="alert alert-info mb-4 text-white shadow-lg">
            <div>
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#fff" }} />
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
          <SubmitButton loading={loading} title="Send" />
        </ButtonContainer>
      </form>
    );
  }
  return (
    <form className="w-full" onSubmit={handleLogin}>
      <animated.div style={loginProps} className="w-full">
        <TextBox
          title="Username"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
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
        <SubmitButton loading={loading} title="Login" />
      </ButtonContainer>
    </form>
  );
};

export default PageView;
