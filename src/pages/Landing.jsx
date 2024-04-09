import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

export const loader = (queryClient) => {
  return async () => {
    try {
      const response = await queryClient.ensureQueryData({
        queryKey: ["featuredProducts"],
        queryFn: async () => await customFetch.get("/products?featured=true"),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
