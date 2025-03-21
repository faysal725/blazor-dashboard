import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Table from "@/components/Table";
import { createPaginationData } from "@/lib/paginationAction";
import React from "react";

export default async function ProductsPage(
  props = {
    searchParams: {
      query,
      page,
    },
  }
) {
  // queries
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // getting user Data
  const rootApi = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${rootApi}/products?limit=7&skip=${
      10 * currentPage
    }&select=id,title,category,price,thumbnail,rating,stock,`
  );

  if (!data.ok) {
    notFound();
  }
  const productsResponse = await data.json();
  const paginationData = await createPaginationData(
    productsResponse,
    currentPage
  );

  const products = productsResponse.products;
  console.log(products);

  return (
    <div>
      <Header
        title="Products"
        link="/dashboard/products/create"
        buttonTitle="Add Product"
      />

      {/* table  */}
      <Table
        headTitles={[
          "id",
          "title",
          "category",
          "price",
          "thumbnail",
          "rating",
          "stock",
        ]}
        rowData={products}
        enableEdit={true}
        editLink="/dashboard/products/edit"
      />

      <Paginator
        totalPage={paginationData.totalPage}
        currentPage={paginationData.currentPage}
        disable={products.length == 0}
      />
    </div>
  );
}
