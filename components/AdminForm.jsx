"use client";

import React, { useState } from "react";
import { BoltIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";

export default function AdminForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [adminErrorData, setAdminErrorData] = useState({
    name: "",
    email: "",
    password: "",
    common: "",
  });

  const submitForm = (event) => {
    event.preventDefault();
    eraseErrors();

    let email = adminData.email;
    let password = adminData.password;

    handleLogin({ email, password });
  };

  function eraseErrors() {
    setAdminErrorData({
      name: "",
      email: "",
      password: "",
      common: "",
    });
  }
  const handleLogin = async (adminData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(document.cookie);
      redirect("/admin/dashboard");
    } else {
      //   alert(data.message);
      setAdminErrorData((prevState) => {
        return {
          ...prevState,
          common: data.message,
        };
      });
    }
  };

  const handleRegister = async (adminData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(document.cookie);
      redirect("/admin/dashboard");
    } else {
      //   alert(data.message);
      setAdminErrorData((prevState) => {
        return {
          ...prevState,
          common: data.message,
        };
      });
    }
  };

  const onChange = (event) => {
    setAdminData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="mt-2">
      <p className="text-xs text-white text-center">{adminErrorData.common}</p>
      <div>
        <form onSubmit={submitForm} method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
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
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                onChange={onChange}
                value={adminData.email}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                onChange={onChange}
                value={adminData.password}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
