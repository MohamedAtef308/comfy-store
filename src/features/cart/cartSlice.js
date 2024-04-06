import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// INITIAL STATE
const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

//UTILITY
const getCartFromStorage = () => {
  if (typeof Storage === "undefined") {
    console.log("can't access local storage");
  } else {
    return JSON.parse(localStorage.getItem("cart")) || defaultState;
  }
};

// UTILITY
const storeCartToStorage = (state) => {
  if (typeof Storage === "undefined") {
    console.log("can't access local storage");
  } else {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

// CART SLICE
const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromStorage(),
  reducers: {
    // ADD ITEM
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
      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
    },

    // CLEAR CART
    clearCart: (state) => {
      state = defaultState;
      storeCartToStorage(state);
    },

    // REMOVE ITEM
    removeItem: (state, { payload }) => {
      console.log(payload);

      const removedItem = state.cartItems.find(
        (item) => item.cartID === payload.cartID
      );
      const updatedCart = state.cartItems.filter(
        (item) => item.cartID !== payload.cartID
      );
      state.cartItems = updatedCart;
      state.cartTotal -= removedItem.amount * removedItem.price;
      state.numItemsInCart -= removedItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },

    // EDIT ITEM
    editItem: (state, { payload }) => {

      const i = state.cartItems.findIndex(
        (item) => item.cartID === payload.cartID
      );
      const amountDiff = payload.amount - state.cartItems[i].amount;
      console.log(amountDiff);
      state.numItemsInCart += amountDiff;
      state.cartTotal += amountDiff * state.cartItems[i].price;
      state.cartItems[i].amount = payload.amount;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Cart edited");
    },

    // UTILITY
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      storeCartToStorage(state);
    },
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
