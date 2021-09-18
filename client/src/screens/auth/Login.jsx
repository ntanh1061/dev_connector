import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Login from "../../components/auth/Login";
import { login } from "../../store/reducers/auth";

const ScreenLogin = () => {
  const dispatch = useDispatch();
  const { isAuthenticate } = useSelector((state) => state.auth);

  if (isAuthenticate) {
    return <Redirect to="/dashboard" />;
  }

  const loginHandler = (user) => {
    dispatch(login(user));
  };

  return <Login onLogin={loginHandler} />;
};

export default ScreenLogin;
