import React, { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useLoaderData } from "react-router-dom";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  console.log(meta);
  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (targetLayout) => {
    return `text-xl btn btn-circle btn-sm ${
      targetLayout === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4>
          {meta.pagination.total} product{meta.pagination.total > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              setLayout("grid");
            }}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            onClick={() => {
              setLayout("list");
            }}
            className={setActiveStyles("grid")}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* products */}

      <div>
        {meta.pagination.total === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
