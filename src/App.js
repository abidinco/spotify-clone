import React, {
  useEffect,
  // , useContext
} from "react";
import Layout from "./components/Layout";
// import AppContext from "../src/store/index";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/reducers/authReducer";

function App() {
  // const appCtx = useContext(AppContext);
  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    let now = new Date();
    // This logic checks isUserLoggedIn or not.
    // If (now_in_milliseconds > tokenExpiry) delete accessToken from localStorage
    // Else handleUserLogin()
    if (
      localStorage.getItem("accessTokenExpiry") &&
      now.getTime() > localStorage.getItem("accessTokenExpiry")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
    } else if (localStorage.getItem("accessToken")) {
      dispatch(login());
      // appCtx.handleUserLogin();
    }
  }, [userLoggedIn]);

  return <Layout />;
}

export default App;
