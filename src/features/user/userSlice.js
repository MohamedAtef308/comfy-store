import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-toastify"

// UTILITY
const getThemeFromLocalStorage = () => {
  if (typeof Storage !== "undefined") {
    return localStorage.getItem("theme") || "winter";
  } else {
    console.log("Local storage isn't available");
  }
};


// INITIAL
const initialState ={
    user: { username: "Bojack"},
    theme: getThemeFromLocalStorage()
}


// SLICE
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loginUser: (state, payload) => {
            console.log("login");
        },
        logout: (state) => {
            console.log("logout");
        },
        toggleTheme: (state) => {
            state.theme = (state.theme === "winter") ? "night" : "winter";

            if (typeof Storage !== "undefined") {
              localStorage.setItem("theme", state.theme);
            } else {
              console.log("Local storage isn't available");
            }

            document.documentElement.setAttribute("data-theme", state.theme);
        }
    },
})

export const { loginUser, logout, toggleTheme} = userSlice.actions;
export default userSlice.reducer;