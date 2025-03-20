import Header from "@/components/Header";
import Table from "@/components/Table";
import React from "react";

export default async function UsersPage() {
  const rootApi = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${rootApi}/users?limit=10&skip=10&select=firstName,lastName,email,phone,image,role`
  );
  const usersResponse = await data.json();
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
          "S/L",
          "firstName",
          "lastName",
          "email",
          "phone",
          "image",
          "role",
        ]}
        rowData={users}
        enableEdit={true}
        editLink="/dashboard/users/edit"
      />
    </div>
  );
}
