import { BoltIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function MainLogo({ showName = false, ...props }) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-1">
      <BoltIcon className="h-10 w-auto text-gray-600" />
      {showName && (
        <p className="text-2xl font-bold text-white italic">Blazor</p>
      )}
    </div>
  );
}
