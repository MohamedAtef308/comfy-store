import React from "react";
import { customFetch } from "../utils";
import { Filters, ProductsContainer, PaginationContainer } from "../components";

export const loader = (queryClient) => {
  return async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);

      const response = await queryClient.ensureQueryData({
        queryKey: ["products", request.url],
        queryFn: async () =>
          await customFetch.get("/products", {
            params: params,
          }),
      });
      return {
        data: response.data.data,
        meta: response.data.meta,
        params: params,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
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
