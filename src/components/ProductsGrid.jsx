import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
import { formatPrice } from "../utils";

const ProductsGrid = () => {
  const { data: products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-flow-col-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.attributes.title}
          image={product.attributes.image}
          price={formatPrice(product.attributes.price)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
