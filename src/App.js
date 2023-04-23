import Layout from "./components/Layout";
import React, { useEffect, useContext } from "react";
import AppContext from "../src/store/index";

function App() {
  const appCtx = useContext(AppContext);
  useEffect(() => {
    let now = new Date();
    // If now > tokenExpiry delete accessToken
    if (
      localStorage.getItem("accessTokenExpiry") &&
      now.getTime() > localStorage.getItem("accessTokenExpiry")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
    } else if (localStorage.getItem("accessToken")) {
      appCtx.handleUserLogin();
    }
  }, [appCtx.userLoggedIn]);

  return <Layout />;
}

export default App;
