"use client";

import { addProducts } from "@/features/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function AddToCartBtn({ productData }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addProducts({ ...productData, quantity: 1 }))}
      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full cursor-pointer"
    >
      Add to bag
    </button>
  );
}
