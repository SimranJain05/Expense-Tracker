import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../interface/Svgs/GoogleIcon";
import LogoIcon from "../interface/Svgs/LogoIcon";
import EyeOnIcon from "../interface/Svgs/EyeOnIcon";
import EyeOffIcon from "../interface/Svgs/EyeOffIcon";
import useSignIn from "../hooks/useSignIn";

export default function SignIn() {
  const {
    handleSiginClick,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    googleClick,
  } = useSignIn();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center App">
      <div className="container max-w-md">
        {/* <LogoIcon /> */}
        <h1 className="text-center text-3xl">Sign In</h1>
        <div className="w-full mt-5 text-md text-center">
          <button
            onClick={googleClick}
            className="flex justify-center items-center gap-2 w-full bg-gray-100 border rounded-md py-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            <GoogleIcon /> Continue with Google
          </button>
        </div>
        <p className="text-center my-2 text-md">or</p>
        <form onSubmit={handleSiginClick} className="flex flex-col gap-2">
          <input
            className="w-full focus:outline-none border py-2 px-4 rounded-md"
            type="email"
            value={email}
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="w-full focus:outline-none border py-2 px-4 rounded-md pr-10"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
            >
              {!showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
            </button>
          </div>
          <button
            className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 w-full text-sm"
            type="submit"
          >
            CONTINUE
          </button>
        </form>
        <div className="bottom-text">
          No account? <Link to="/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
