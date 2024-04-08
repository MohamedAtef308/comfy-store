import React from "react";
import { Form, redirect } from "react-router-dom";
import { TextInput, SubmitBtn } from "./index";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features";
import { toast } from "react-toastify";

export const action = (store) => {
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

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <TextInput label="first name" name="name" type="text" />
      <TextInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
