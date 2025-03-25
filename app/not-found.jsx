import React from "react";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-center justify-center">
      <p className="text-2xl md:text-4xl font-bold text-gray-700 uppercase">oops!</p>
      <h1 className="text-[10rem] md:text-[20rem] font-bold text-gray-700 uppercase">404</h1>
      <p className="text-xl font-semibold text-gray-700">Sorry we couldn't find the page.</p>
    </section>
  );
}
