import React, {
  useEffect,
  // useContext
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/reducers/authReducer";
// import AppContext from "../store/index";

const CallbackPage = () => {
  // const appCtx = useContext(AppContext);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.replace("/");
    } else {
      // appCtx.handleUserLogin();
      dispatch(login());
    }
  }, [dispatch, isUserLoggedIn]);
  return <div></div>;
};

export default CallbackPage;
