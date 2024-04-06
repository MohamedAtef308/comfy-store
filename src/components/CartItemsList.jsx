import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const { cartItems } = useSelector((store) => store.cart);
  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} {...item} />
      ))}
    </div>
  );
};

export default CartItemsList;
