import React from "react";

export default function CategoryHeader({
  categoryName = "Some category",
  imageUrl = "#",
}) {
  return (
    <section
      className={` flex justify-center bg-cover bg-no-repeat bg-center py-52 relative`}
      style={{ backgroundImage: "url('" + imageUrl + "')" }}
    >
        <span className="absolute top-0 right-0 w-full h-full bg-black/40 z-0"></span>
      <p className="text-5xl cursor-pointer text-white capitalize z-10">
        {categoryName}
      </p>
    </section>
  );
}
