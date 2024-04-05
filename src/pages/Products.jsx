import React from "react";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Filters, ProductsContainer, PaginationContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/products");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Products = () => {

  return (
    <div>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </div>
  );
};

export default Products;
