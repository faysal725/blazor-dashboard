"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Paginator({ totalPage, currentPage, disable=false }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currPage = currentPage;

  function generatePaginationArray(totalPages, currentPage) {
    const paginationArray = [];

    if (totalPages <= 7) {
      // If total pages are 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i);
      }
      return paginationArray;
    }

    if (currentPage <= 4) {
      // Show first 5 pages, ellipsis, and last page
      for (let i = 1; i <= 5; i++) {
        paginationArray.push(i);
      }
      paginationArray.push("...");
      paginationArray.push(totalPages);
      return paginationArray;
    }

    if (currentPage >= totalPages - 3) {
      // Show first page, ellipsis, and last 5 pages
      paginationArray.push(1);
      paginationArray.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationArray.push(i);
      }
      return paginationArray;
    }

    // Show first page, ellipsis, current page +/- 2, ellipsis, and last page
    paginationArray.push(1);
    paginationArray.push("...");
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      paginationArray.push(i);
    }
    paginationArray.push("...");
    paginationArray.push(totalPages);
    return paginationArray;
  }

  const pages = generatePaginationArray(totalPage, currPage);

  function createPageURL(pageNumber) {
    if (pageNumber === "...") {
      return "";
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  createPageURL(currentPage);
  // console.log(createPageURL(currentPage), "paginator");


  if (disable) {
    return <></>
  }

  return (
    <div className="flex justify-center py-5">
      <div className="flex justify-center gap-x-2">
        {pages.map((page, index) => {
          return (
            <Link
              key={index*Math.random()}
              href={page === "..." ? "#" : createPageURL(page)}
              className={`text-xs p-2 px-3 cursor-pointer rounded transition-all duration-150 ${
                currentPage == page && "bg-gray-900 text-white "
              } ${
                page === "..."
                  ? ""
                  : "border-2 border-gray-900/50 hover:bg-gray-900 hover:text-white "
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
