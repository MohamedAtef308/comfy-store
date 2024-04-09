import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatPrice, customFetch, generateAmount } from "../utils";
import { addItem } from "../features";

export const loader = (queryClient) => {
  return async ({ params }) => {
    try {
      const response = await queryClient.ensureQueryData({
        queryKey: ["product", params.id],
        queryFn: async() => (
          await customFetch.get(`/products/${params.id}`)
        )
      })
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const handleAddItem = () => {
    dispatch(
      addItem({
        cartID: product.id + productColor,
        productID: product.id,
        image,
        title,
        price,
        colors,
        company,
        amount,
        productColor,
      })
    );
  };

  return (
    <section>
      {/* navigation */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* product */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* info */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarPrice}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setProductColor(color);
                  }}
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor && "border-2 border-secondary"
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>
          {/* amount */}
          <div className="form-control w-full max-w-xs ">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              value={amount}
              onChange={handleAmount}
              id="amount"
              className="select select-secondary select-bordered select-md"
            >
              {generateAmount(3).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          {/* cart button */}
          <div className="mt-10">
            <button
              type="button"
              onClick={handleAddItem}
              className="btn btn-secondary btn-md"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
