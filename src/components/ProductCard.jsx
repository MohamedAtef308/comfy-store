import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, price, image }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="card w-full  shadow-xl hover:shadow-2xl transition duration-300"
    >
      <figure className="p-4">
        <img
          src={image}
          alt={title}
          className="rounded-xl h-64 md:h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize tracking-wider">{title}</h2>
        <span className="text-secondary">{price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
