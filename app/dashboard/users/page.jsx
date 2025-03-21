import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Table from "@/components/Table";
import { createPaginationData } from "@/lib/paginationAction";
import React from "react";

export default async function UsersPage(
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
    `${rootApi}/users?limit=8&skip=${
      10 * currentPage
    }&select=firstName,lastName,email,phone,image,role`
  );

  const usersResponse = await data.json();
  const paginationData = await createPaginationData(usersResponse, currentPage);

  const users = usersResponse.users;
  return (
    <div>
      <Header
        title="User"
        link="/dashboard/users/create"
        buttonTitle="Add User"
      />

      {/* table  */}
      <Table
        headTitles={[
          "id",
          "firstName",
          "lastName",
          "email",
          "phone",
          "image",
          "role",
          "edit",
        ]}
        rowData={users}
        enableEdit={true}
        editLink="/dashboard/users/edit"
      />

      <Paginator
        totalPage={paginationData.totalPage}
        currentPage={paginationData.currentPage}
        disable={users.length == 0}
      />
    </div>
  );
}
