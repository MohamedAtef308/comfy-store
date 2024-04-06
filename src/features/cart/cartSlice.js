import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, { payload }) => {
      const i = state.cartItems.findIndex(
        (item) => item.cartID === payload.cartID
      );
      if (i > -1) {
        state.cartItems[i].amount += payload.amount;
      } else {
        state.cartItems.push(payload);
      }
      state.numItemsInCart += payload.amount;
      state.cartTotal += payload.amount * payload.price;
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      if (typeof Storage === "undefined") {
        console.log("can't access local storage");
      } else {
        localStorage.setItem("cart", JSON.stringify(state));
      }
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      state = defaultState;
    },
    removeItem: (state, { payload }) => {},
    editItem: (state, { payload }) => {},
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
