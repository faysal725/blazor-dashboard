import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product-details/${product.id}`} className="group relative">
      <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
        <img
          alt={product.title}
          src={product.thumbnail}
          className="size-full object-cover"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <div>
          <span className="absolute inset-0" />
          {product.title}
        </div>
      </h3>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((rate) => (
          <StarIcon
          key={rate}
            className={`${
              rate <= Math.floor(product.rating)
                ? "text-yellow-500"
                : "text-yellow-50"
            } h-5 w-5`}
          />
        ))}
      </div>
      <p className="mt-1 text-sm font-medium text-gray-900">৳ {product.price}</p>
    </Link>
  );
}
