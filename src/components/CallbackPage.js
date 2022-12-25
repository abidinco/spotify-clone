import React, { useEffect, useContext } from "react";
import AppContext from "../store/index";

const CallbackPage = () => {
  const appCtx = useContext(AppContext);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.replace("/");
    } else {
      appCtx.handleLogin();
    }
  }, []);
  return <div></div>;
};

export default CallbackPage;
