import React from "react";
import { useLoaderData } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

const OrdersList = () => {
  dayjs.extend(advancedFormat);
  const { data: orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total orders: {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.attributes.name}</td>
                <td>{order.attributes.address}</td>
                <td>{order.attributes.numItemsInCart}</td>
                <td>{order.attributes.orderTotal}</td>
                <td className="hidden sm:block">
                  {dayjs(order.attributes.createdAt).format(
                    "hh:mm a - MMM Do, YYYY"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
