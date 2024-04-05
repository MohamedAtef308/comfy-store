import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://strapi-store-server.onrender.com/api",
});

export const formatPrice = (price) => {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format((price / 100).toFixed(2));
};

export const generateAmount = (length) => {
  return Array.from({ length: length }, (_, i) => {
    return i + 1;
  });
};
