import React from "react";
import { formatPrice, generateAmount } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({
  cartID,
  title,
  price,
  image,
  amount,
  company,
  productColor,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem({ cartID }));
  };

  const handleEdit = (event) => {
    dispatch(editItem({ cartID, amount: parseInt(event.target.value) }));
  };

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            onChange={handleEdit}
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
          >
            {generateAmount(amount + 5).map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>
        {/* REMOVE */}
        <button
          onClick={handleRemove}
          className="mt-2 link link-primary link-hover text-sm"
        >
          Remove
        </button>
      </div>
      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
