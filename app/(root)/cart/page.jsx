"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import IncrementDecrementCounter from "@/components/products/IncrementDecrementCounter";
import {
  addProductByQuantity,
  addProducts,
  removeProducts,
  removeSpecificProduct,
} from "@/features/cartSlice";

const relatedProducts = [
  {
    id: 1,
    name: "Billfold Wallet",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    color: "Natural",
  },
  // More products...
];

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const { deliveryCharge, noOfProducts, products, subtotal, total } =
    useSelector((state) => state.cartR);

  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [orderErrorData, setOrderErrorData] = useState({
    fullName: "",
    phone: "",
    address: "",
    productQty: "",
  });

  const onChangeValue = (event) => {
    console.log(event.target.name);
    setOrderData((prevOrder) => {
      return {
        ...prevOrder,

        [event.target.name]: event.target.value,
      };
    });
  };

  function placeOrder() {
    setOrderErrorData({
      fullName: "",
      phone: "",
      address: "",
      productQty: "",
    });

    let orderDetails = {
      ...orderData,
      deliveryCharge,
      productQty: noOfProducts,
      products: [...products],
      subtotal,
      total,
    };

    const { fullName, phone, address, productQty } = orderDetails;
    if (fullName == "" || phone == "" || address == "" || productQty == 0) {
      setOrderErrorData((prevOrderErrorData) => {
        return {
          ...prevOrderErrorData,
          fullName: fullName == "" ? "Enter your name" : "",
          phone: phone == "" ? "Enter your phone" : "",
          address: address == "" ? "Enter your address" : "",
          productQty: productQty == 0 ? "Cart can not be empty" : "",
        };
      });
      return;
    }

    console.log(orderDetails);
  }
  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section
          aria-labelledby="cart-heading"
          className="lg:col-span-7 space-y-4"
        >
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul
            role="list"
            className="divide-y  divide-gray-200 border-b border-t border-gray-200"
          >
            {products.length == 0 && (
              <p className="text-sm p-4 text-gray-900 capitalize">
                Cart is empty
              </p>
            )}
            {products.map((product, productIdx) => (
              <li key={product.id} className="flex py-6 sm:py-10">
                <div className="shrink-0">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="size-24 rounded-md object-cover sm:size-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            href={`/product-details/${product.id}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.title}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ৳ {product.price}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <IncrementDecrementCounter
                        qty={product.quantity}
                        onChangeQty={(type) => {
                          type == "increment"
                            ? dispatch(addProducts(product))
                            : dispatch(removeProducts(product));
                        }}
                      />
                      <div className="absolute right-0 top-0">
                        <button
                          onClick={() =>
                            dispatch(removeSpecificProduct(product))
                          }
                          type="button"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                        >
                          <span className="sr-only">Remove</span>
                          <XMarkIconMini
                            aria-hidden="true"
                            className="size-5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    {product.availabilityStatus == "In Stock" ? (
                      <CheckIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-green-500"
                      />
                    ) : (
                      <ClockIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-300"
                      />
                    )}

                    <span>
                      {product.availabilityStatus == "In Stock"
                        ? "In stock"
                        : `Ships in ${product.leadTime}`}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* delivery info  */}
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-2 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 ">
            <p className="text-lg font-semibold text-gray-900 p-2 md:p-4">
              Delivery Address
            </p>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 p-2 md:p-4 ">
              <label
                htmlFor="fullName"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Full Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6"
                  onChange={(e) => onChangeValue(e)}
                  value={orderData.fullName}
                  required
                />
                <p className="text-xs text-red-500">
                  {orderErrorData.fullName}
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 p-2 md:p-4">
              <label
                htmlFor="phone"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Phone
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="phone"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6"
                  onChange={(e) => onChangeValue(e)}
                  value={orderData.phone}
                  required
                />
                <p className="text-xs text-red-500">{orderErrorData.phone}</p>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6  p-2 md:p-4">
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="address"
                  name="address"
                  type="text"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6"
                  onChange={(e) => onChangeValue(e)}
                  value={orderData.address}
                  required
                />
                <p className="text-xs text-red-500">{orderErrorData.address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ৳ {subtotal}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Delivery Charge</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ৳ {deliveryCharge}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">৳ {total}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-gray-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
              disabled={products.length == 0 ? true : false}
              onClick={placeOrder}
            >
              Checkout
            </button>
          </div>
        </section>
      </div>

      {/* Related products */}
      <section aria-labelledby="related-heading" className="mt-24">
        <h2 id="related-heading" className="text-lg font-medium text-gray-900">
          You may also like&hellip;
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group relative">
              <img
                alt={relatedProduct.imageAlt}
                src={relatedProduct.imageSrc}
                className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={relatedProduct.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {relatedProduct.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {relatedProduct.color}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {relatedProduct.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
