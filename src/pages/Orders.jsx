import React from "react";
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from "../components";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

// LOADER
export const loader = (store, queryClient) => {
  return async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { user } = store.getState().user;

    if (!user) {
      toast.warn("Login Required");
      return redirect("/login");
    }

    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: { Authorization: "Bearer " + user.token },
      });

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || "Error Happened!");

      if (error?.response?.status === 401 || 403) return redirect("/login");
      return redirect("/");
    }
  };
};

// COMPONENT
const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) return <SectionTitle text="No orders found" />;

  return (
    <div>
      <SectionTitle text="Your orders" />
      <OrdersList />
      {/* <PaginationContainer /> */}
      <ComplexPaginationContainer />
    </div>
  );
};

export default Orders;
