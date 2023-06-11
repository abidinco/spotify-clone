import Spotify from "../../spotify/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      if (localStorage.getItem("accessToken")) {
        state.isUserLoggedIn = true;
      } else {
        Spotify.getAccessToken();
      }
    },
    logout: (state) => {
      state.isUserLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
