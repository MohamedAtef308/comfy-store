import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

export const loader = async () => {
  try {
    const response = await customFetch.get("/products?featured=true");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
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
