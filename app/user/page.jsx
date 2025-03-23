import UserForm from "@/components/UserForm";
import React from "react";

export default function UserLoginPage() {
  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <UserForm />
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="/shopeholic.jpg"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
