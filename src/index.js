import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { AppContextProvider } from "./store";
import store from "./store";
import App from "./App";
import "./index.css";
import { GlobalHistory } from "./utils";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <AppContextProvider> */}
        <GlobalHistory />
        <App />
        {/* used for resetFocus() like this: ("#empty").focus() at SideBarLink.js:51 */}
        <div id="empty" tabIndex="-1" />
        {/* </AppContextProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
