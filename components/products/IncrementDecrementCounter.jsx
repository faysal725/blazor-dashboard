"use client";
import React, { useState } from "react";

export default function IncrementDecrementCounter({ qty = 0, onChangeQty }) {
  const [quantity, setQuantity] = useState(qty);

  const handleIncrement = () => {
    if (quantity > 99) {
      return;
    }
    setQuantity((prevQty) => prevQty + 1);
    onChangeQty('increment');
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prevQty) => prevQty - 1);
    onChangeQty('decrement');
  };
  return (
    <div className="flex bg-white w-fit rounded overflow-hidden outline outline-1 outline-gray-700">
      <button
        onClick={() => handleDecrement()}
        className="px-2 bg-gray-700 text-white cursor-pointer text-xl"
      >
        -
      </button>
      <input
        type="number"
        className="appearance-none rounded-md  py-1.5  text-base text-gray-900 outline outline-1 -outline-offset-1 outline-none focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center w-10"
        min={1}
        max={99}
        value={quantity}
        readOnly
      />
      <button
        onClick={() => handleIncrement()}
        className="px-2 bg-gray-700 text-white cursor-pointer text-xl"
      >
        +
      </button>
    </div>
  );
}
