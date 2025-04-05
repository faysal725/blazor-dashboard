
import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Table from "@/components/Table";
import { createPaginationData } from "@/lib/paginationAction";
import React from "react";

export default async function OrdersPage(
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

  const rootApi = process.env.NEXT_LOCAL_API_URL;
  // console.log(`${rootApi}/orders`)
  const data = await fetch(`${rootApi}/admin/orders`);

  // if (!data.ok) {
  //   notFound();
  // }
  const productsResponse = await data.json();
  console.log(productsResponse);

  // const paginationData = await createPaginationData(
  //   productsResponse,
  //   currentPage
  // );

  // const products = productsResponse.products;
  // console.log(products);

  return (
    <div>
      <Header
        title="Orders"
        link="/admin/dashboard/products/create"
        buttonTitle="Add Product"
      />

      {/* table  */}
      {/* <Table
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
        editLink="/admin/dashboard/products/edit"
      />

      <Paginator
        totalPage={paginationData.totalPage}
        currentPage={paginationData.currentPage}
        disable={products.length == 0}
      /> */}
    </div>
  );
}
