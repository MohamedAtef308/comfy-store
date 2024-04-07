import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { runLocalStorage } from "../../utils";

// UTILITY
const getThemeFromLocalStorage = () => {
  return runLocalStorage(() => {
    return localStorage.getItem("theme") || "winter";
  });
};

// INITIAL
const initialState = {
  user: { username: "Bojack" },
  theme: getThemeFromLocalStorage(),
};

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, payload) => {
      console.log("login");
    },
    logout: (state) => {
      runLocalStorage(() => {
        localStorage.removeItem("user");
      });
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {

      state.theme = state.theme === "winter" ? "night" : "winter";

      runLocalStorage(() => {
        localStorage.setItem("theme", state.theme);
      });

      document.documentElement.setAttribute("data-theme", state.theme);
    },
  },
});

export const { loginUser, logout, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
