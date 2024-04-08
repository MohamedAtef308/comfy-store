import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { runLocalStorage } from "../../utils";

// UTILITY
const getThemeFromLocalStorage = () => {
  return runLocalStorage(() => {
    return localStorage.getItem("theme") || "winter";
  });
};

// UTILITY
const getUserFromLocalStorage = () => {
  return runLocalStorage(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
};

// INITIAL
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      const user = {...payload.user, token: payload.jwt};
      state.user = user;
      runLocalStorage( () => {
        localStorage.setItem("user", JSON.stringify(user));
      })
    },
    logout: (state) => {
      runLocalStorage(() => {
        localStorage.removeItem("user");
      });
      state.user = null;
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
