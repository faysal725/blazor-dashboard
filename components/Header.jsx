import Link from "next/link";
import React from "react";

export default function Header({ title, link, buttonTitle }) {
  return (
    <div className="flex justify-between items-center  pb-10 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl text-gray-900">{title}</p>

      {link && (
        <Link
          href={link}
          className="text-xs bg-gray-900  px-6 p-2 rounded text-white"
        >
          {buttonTitle}
        </Link>
      )}
    </div>
  );
}
