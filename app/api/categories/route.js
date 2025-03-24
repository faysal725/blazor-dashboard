// app/api/categories/route.js
import { NextResponse } from "next/server";

// Hardcoded category data with images
const categories = {
  men: {
    subcategories: ["mens-shirts", "mens-shoes", "mens-watches"],
    image: "/categoryImages/men.jpg", // Example path in public/
  },
  women: {
    subcategories: [
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
    image: "/categoryImages/women.jpg",
  },
  accessories: {
    subcategories: [
      "beauty",
      "fragrances",
      "furniture",
      "groceries",
      "home-decoration",
      "kitchen-accessories",
      "laptops",
      "mobile-accessories",
      "motorcycle",
      "skin-care",
      "smartphones",
      "sports-accessories",
      "sunglasses",
      "tablets",
      "tops",
      "vehicle",
    ],
    image: "/categoryImages/accessories.jpg",
  },
};

// GET handler
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    // Return subcategories and image for the specified main category
    const categoryData = categories[category.toLowerCase()];
    if (categoryData) {
      return NextResponse.json(
        {
          category,
          subcategories: categoryData.subcategories,
          image: categoryData.image,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
  }

  // Return full category list with images if no category is specified
  const fullCategories = Object.fromEntries(
    Object.entries(categories).map(([key, value]) => [
      key,
      { subcategories: value.subcategories, image: value.image },
    ])
  );
  return NextResponse.json(fullCategories, { status: 200 });
}
