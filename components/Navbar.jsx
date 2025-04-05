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
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import MainLogo from "@/components/MainLogo";
import CartButton from "./cart/CartButton";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "@/features/userSlice";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/category/women",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "/category/women",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "/category/women",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "/category/women",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
      href: "/category/women",
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
      href: "/category/men",
    },
    {
      name: "Accessories",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
      href: "/category/accessories",
    },
    {
      name: "Vehicals",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
      href: "/category/vehicals",
    },
  ],
  pages: [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "#" },
  ],
};
const currencies = ["BDT"];
export default function Navbar() {
  const { name, email, id } = useSelector((state) => state.userR);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const logout = useLogout()



  return (
    <>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>

                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  href="/user"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create an account
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  href="/user"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {/* Currency selector */}
              <form>
                <div className="-ml-2 inline-grid grid-cols-1 text-base font-medium sm:text-sm/6 text-white">
                  BDT
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Currency selector */}
              <form>
                <div className="inline-grid grid-cols-1 text-base font-medium sm:text-sm/6 text-white">
                  BDT
                </div>
              </form>

              <div className="flex items-center space-x-6">
                {id && (
                  <>
                    <Link
                      href="/user"
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Welcome! {name}
                    </Link>

                    <button
                      onClick={() => logout()}
                      className="text-sm font-medium text-white hover:text-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!id && (
                  <>
                    <Link
                      href="/user"
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Sign in
                    </Link>

                    <Link
                      href="/user"
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Create an account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Link href="/">
                    <span className="sr-only">Your Company</span>

                    <MainLogo />
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <div className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.categories.map((category) => (
                        <div key={category.name} className="flex cursor-pointer">
                          <Link className="relative flex" href={category.href}>
                            <button className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-indigo-600">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out group-data-[open]:bg-indigo-600"
                              />
                            </button>
                          </Link>

                        </div>
                      ))}

                      {navigation.pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Search */}
                  <a
                    href="#"
                    className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <Link href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <MainLogo />
                </Link>

                <div className="flex flex-1 items-center justify-end">
                  {/* <a
                    href="#"
                    className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                  >
                    Search
                  </a> */}

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    {/* <a
                      href="#"
                      className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                    >
                      <span className="sr-only">Help</span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-6"
                      />
                    </a>
                    <a
                      href="#"
                      className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                    >
                      Help
                    </a> */}

                    {/* Cart */}
                    <CartButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
