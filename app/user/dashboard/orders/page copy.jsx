import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Table from "@/components/Table";
import { createPaginationData } from "@/lib/paginationAction";
import React from "react";

export default async function OrderPage(
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

  // // getting user Data
  const rootApi = process.env.NEXT_LOCAL_API_URL;
  // console.log(`${rootApi}/orders`)

  const data = await fetch(`${rootApi}/orders`);
  // let responseData = await data.json()

  // console.log(responseData)
  // , {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(orderDetails),
  //   credentials: "include",
  // }


  // const orderResponse = await data.json();

  // await console.log(data.json());
  // // const paginationData = await createPaginationData(usersResponse, currentPage);

  // const orders = orderResponse;
  // console.log(orders);

  async function fetchOrders() {
    console.log(`${rootApi}/orders`, 'this is the')
    const res = await fetch(`${rootApi}/orders`, {
      method: 'GET', // or 'POST' if applicable
      credentials: 'include', // Ensures cookies are sent
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');
    console.log(data)
  }

  
  await fetchOrders();


  // async function fetchOrders() {
  //   console.log(`${rootApi}/orders`, 'its the api')
  //   const res = await fetch(`http://localhost:3000/api/orders`, {
  //     method: 'GET', // or 'POST' if applicable
  //   });
  //   const data = await res.json();
  //   if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');
  //   console.log(data)
  // }

  


  // async function fetchOrders() {
    
  //   console.log(`${rootApi}/orders`, 'its the api')
  //   const res = await fetch('https://dummyjson.com/products/search?q=phone', {
  //     method: 'GET', // or 'POST' if applicable
  //     credentials: 'include', 
  //   });
  //   const data = await res.json();
  //   if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');
  //   console.log(data)
  // }

  // useEffect(() => {
  //    fetchOrders();
  // }, [])

  return (
    <div>
      <Header title="Orders" />

      {/* table  */}
      {/* <Table
        headTitles={[
          "name",
          "slug",
        ]}
        rowData={categories}
      /> */}

      {/* <Paginator
        totalPage={paginationData.totalPage}
        currentPage={paginationData.currentPage}
        disable={users.length == 0}
      /> */}
    </div>
  );
}
