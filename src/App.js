import Layout from './components/Layout';
import React, { useEffect, useContext } from "react";
import AppContext from '../src/store/index';

function App() {
  const appCtx = useContext(AppContext);
  useEffect(() => {
    if(localStorage.getItem("accessToken")) {
      appCtx.handleLogin();
    }
  }, []);

  return (
    <Layout />
  );
}

export default App;