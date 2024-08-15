import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../interface/Svgs/GoogleIcon";
import LogoIcon from "../interface/Svgs/LogoIcon";
import EyeOnIcon from "../interface/Svgs/EyeOnIcon";
import EyeOffIcon from "../interface/Svgs/EyeOffIcon";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

export default function SignUp() {
  const {
    handleSignupClick,
    name,
    setName,
    email,
    setEmail,
    password,
    handlePasswordChange,
    showPassword,
    toggleShowPassword,
    passwordStrength,
  } = useSignUp();
  const { googleClick } = useSignIn();

  const buttonStyle =
    passwordStrength === "strong"
      ? "bg-gray-900 hover:bg-gray-800"
      : "bg-gray-200 cursor-not-allowed";

  return (
    <div className=" flex flex-col p-2 items-center justify-center App">
      <div className="container max-w-md">
        {/* <LogoIcon /> */}
        <h1 className="text-center text-3xl">Sign Up</h1>
        <div className="w-full mt-5 text-md text-center">
          <button
            onClick={googleClick}
            className="flex justify-center items-center gap-2 w-full bg-gray-100 border rounded-md py-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            <GoogleIcon /> Continue with Google
          </button>
        </div>
        <p className="text-center my-2 text-md">or</p>
        <form onSubmit={handleSignupClick} className="flex flex-col gap-2">
          <input
            className="w-full focus:outline-none border py-2 px-4 rounded-md"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
          <input
            className="w-full focus:outline-none border py-2 px-4 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <div className="relative">
            <input
              className="w-full focus:outline-none border py-2 px-4 rounded-md pr-10"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-2 focus:outline-none"
            >
              {!showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
            </button>
          </div>
          {password && (
            <div
              className={`text-sm uppercase ${
                passwordStrength === "strong"
                  ? "text-green-500"
                  : passwordStrength === "moderate"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {passwordStrength}
            </div>
          )}
          <div className="text-sm text-gray-500 mt-2">
            A strong password should contain at least:
            <ul className="list-disc list-inside">
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 number</li>
              <li>1 special characters (@$!%*?&)</li>
              <li>Be at least 8 characters long</li>
            </ul>
            You will only be able to continue if you make a strong password.
          </div>
          <button
            className={`${buttonStyle} rounded-md text-white py-2 px-4 mt-2 w-full text-sm`}
            type="submit"
            disabled={passwordStrength !== "strong"}
          >
            CONTINUE
          </button>
        </form>
        <div className="bottom-text">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
