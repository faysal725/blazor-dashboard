"use server";

export async function createPaginationData(apiData, currentPage = 1) {
  let totalPage = Math.floor(apiData.total / 10 );
    console.log(apiData.total, apiData.limit, apiData.skip)
  return {
    totalPage,
    currentPage
  }
}
