import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import Login from "../../components/auth/Login";
import { login } from "../../store/reducers/auth";

const ScreenLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticate) {
      history.push("/dashboard");
    }
  }, [isAuthenticate]);

  const loginHandler = (user) => {
    dispatch(login(user));
  };

  return <Login onLogin={(user) => loginHandler(user)} />;
};

export default ScreenLogin;
