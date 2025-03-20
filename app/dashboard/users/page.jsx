import Header from "@/components/Header";
import React from "react";

export default async function UsersPage() {
    // const data = await fetch('https://dummyjson.com/products')
    // const users = await data.json()
    // console.log(users)
  return (
    <div>
      <Header title="User" link="/dashboard/users/create" buttonTitle="Add User" />

      {/* table  */}

    </div>
  );
}
