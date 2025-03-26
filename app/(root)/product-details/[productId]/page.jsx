import { Fragment } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import ImageGallery from "@/components/products/ImageGallery";
import ProductCard from "@/components/products/ProductCard";
import { notFound } from "next/navigation";
import AddToCartBtn from "@/components/products/AddToCartBtn";


const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const rootApi = process.env.NEXT_PUBLIC_API_URL;

export default async function ProductDetails({ params }) {
  const { productId } = params;
  let productDetails;
  let relatedProducts = []

  // getting getProductDetails
  async function getProductDetails(productId) {
    const detailsRequest = await fetch(
      `${rootApi}/products/${productId}`
    );

    if (!detailsRequest.ok) {
      notFound();
    }

    const details = await detailsRequest.json();

    return details;
  }


  
  // getting getrelatedProducts
  async function getRelatedProducts(categoryName) {
    const productsRequest = await fetch(
      `${rootApi}/products/category/${categoryName}?sortBy=rating&order=desc&limit=4&select=title,price,rating,thumbnail,id`
    );

    if (!productsRequest.ok) {
      notFound();
    }

    const {products} = await productsRequest.json();

    return products;
  }

  productDetails = await getProductDetails(productId);
  relatedProducts = await getRelatedProducts(productDetails.category)



  return (
    <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <ImageGallery productImages={productDetails.images} />

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {productDetails.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
              ৳ {productDetails.price}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        Math.floor(productDetails.rating) > rating
                          ? "text-yellow-500"
                          : "text-gray-300",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                dangerouslySetInnerHTML={{ __html: productDetails.description }}
                className="space-y-6 text-base text-gray-700"
              />
            </div>

            <div className="mt-6">
              <div className="mt-10 flex">
                <AddToCartBtn productData={productDetails}/>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
                >
                  <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="related-heading"
          className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
        >
          <h2 id="related-heading" className="text-xl font-bold text-gray-900">
            Customers also bought
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
