"use client";

import React, { useState } from "react";
import { BoltIcon } from "@heroicons/react/20/solid";
import { redirect, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUserData } from "@/features/userSlice";

export default function UserForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"; // Default to '/' if no callbackUrl

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userErrorData, setUserErrorData] = useState({
    name: "",
    email: "",
    password: "",
    common: "",
  });

  const submitForm = (event) => {
    event.preventDefault();
    eraseErrors();

    let name = userData.name;
    let email = userData.email;
    let password = userData.password;

    console.log(userData);

    if (isSignUp) {
      handleRegister({ name, email, password });
    } else {
      handleLogin({ email, password });
    }
  };

  function eraseErrors() {
    setUserErrorData({
      name: "",
      email: "",
      password: "",
      common: "",
    });
  }
  const handleLogin = async (userData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      dispatch(addUserData(data.userData));
      redirect(callbackUrl);
    } else {
      //   alert(data.message);
      setUserErrorData((prevState) => {
        return {
          ...prevState,
          common: data.message,
        };
      });
    }
  };

  const handleRegister = async (userData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (res.ok) {
      // console.log(data);
      dispatch(addUserData(data.userData));
      redirect(callbackUrl);
    } else {
      //   alert(data.message);
      setUserErrorData((prevState) => {
        return {
          ...prevState,
          common: data.message,
        };
      });
    }
  };

  const onChange = (event) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <BoltIcon className="text-gray-900 h-10 w-auto" />
        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
          <span className="mr-1">{isSignUp ? "Sign In" : "Sign Up"}</span>
          to your account
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500">
          {isSignUp ? "Already have account? " : "Dont have account?"}
          <span
            onClick={() => setIsSignUp((prevState) => !prevState)}
            className="font-semibold text-gray-900 hover:text-gray-500 cursor-pointer ml-2"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>

      <div className="mt-5">
        <p className="text-base text-red-500 text-center">
          {userErrorData.common}
        </p>
        <div>
          <form onSubmit={submitForm} method="POST" className="space-y-6">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                    onChange={onChange}
                    value={userData.name}
                  />
                  <p className="text-xs text-red-500">{userErrorData.name}</p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                  onChange={onChange}
                  value={userData.email}
                />
                <p className="text-xs text-red-500">{userErrorData.email}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                  onChange={onChange}
                  value={userData.password}
                />
                <p className="text-xs text-red-500">{userErrorData.password}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                {isSignUp ? "Register" : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
