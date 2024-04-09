import React from "react";
import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { clearCart } from "../features";
import { customFetch, formatPrice } from "../utils";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// LOADER
export const loader = (store) => {
  return () => {
    const { user } = store.getState().user;
    if (!user) {
      toast.warn("You must be logged in to checkout");
      return redirect("/login");
    }
    return null;
  };
};

// ACTION
export const action = (store, queryClient) => {
  return async ({ request }) => {
    const { name, address } = Object.fromEntries(await request.formData());
    const { user } = store.getState().user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
    const info = {
      data: {
        address: address || "Egypt",
        cartItems,
        chargeTotal: orderTotal,
        name: name || "Mohamed",
        numItemsInCart,
        orderTotal: formatPrice(orderTotal).toString(),
      },
    };

    try {
      const response = await customFetch.post("/orders", info, {
        headers: { Authorization: "Bearer " + user.token },
      });
      queryClient.removeQueries(["orders"]);

      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || "Error Happened!");
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };
};

// COMPONENT
const Checkout = () => {
  const { cartTotal } = useSelector((store) => store.cart);
  if (cartTotal <= 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 item-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
