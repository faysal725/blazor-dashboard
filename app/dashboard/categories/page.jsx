



import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Table from "@/components/Table";
import { createPaginationData } from "@/lib/paginationAction";
import React from "react";

export default async function CategoriesPage(
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
    `${rootApi}/products/categories`
  );

  const categoryResponse = await data.json();
  // const paginationData = await createPaginationData(usersResponse, currentPage);

  const categories = categoryResponse;
  return (
    <div>
      <Header
        title="Categories"
      />

      {/* table  */}
      <Table
        headTitles={[
          "name",
          "slug",
        ]}
        rowData={categories}
      />

      {/* <Paginator
        totalPage={paginationData.totalPage}
        currentPage={paginationData.currentPage}
        disable={users.length == 0}
      /> */}
    </div>
  );
}
