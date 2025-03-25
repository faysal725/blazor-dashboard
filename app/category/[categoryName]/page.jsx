import CategoryHeader from "@/components/category/CategoryHeader";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

let BASE_URL = "http://localhost:3000";

const rootApi = process.env.NEXT_PUBLIC_API_URL;

async function SubCategoryProducts({ subcategoryName }) {
  const response = await fetch(
    `${rootApi}/products/category/${subcategoryName}?sortBy=rating&order=desc&limit=5&select=title,price,rating,thumbnail,id`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const { products } = await response.json();
  // console.log("Products for", subcategoryName, products);

  return (
    <section className="space-y-6  ">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold capitalize cursor-pointer">
          {subcategoryName}
        </p>

        <Link
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default async function CategoryPage({ params }) {
  const { categoryName } = params;
  // console.log(categoryName);
  let mainCategory;

  // getting sub categories
  async function getCategories(mainCategory) {
    const categoryRequest = await fetch(
      `${BASE_URL}/api/categories?category=${mainCategory}`
    );

    if (!categoryRequest.ok) {
      notFound();
    }

    const categories = await categoryRequest.json();

    return categories;
  }

  mainCategory = await getCategories(categoryName);

  if (mainCategory.length == 0) {
    <p>No category to show</p>;
  }
  console.log(mainCategory);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      {/* main category  */}
      <CategoryHeader
        categoryName={mainCategory.category}
        imageUrl={mainCategory.image}
      />
      <div className="space-y-10 py-5">
        {mainCategory.subcategories.map((categoryName, index) => (
          <SubCategoryProducts
            subcategoryName={categoryName}
            key={categoryName}
          />
        ))}
      </div>
    </section>
  );
}
