"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function CartButton() {
  // useStore((state) => console.log(state))
  const { deliveryCharge, noOfProducts, products, subtotal } = useSelector(
    (state) => state.cartR
  );
  return (
    <div className="ml-4 flow-root lg:ml-8">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {noOfProducts}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}
