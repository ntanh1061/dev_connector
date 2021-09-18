import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Register from "../../components/auth/Register";
import { register } from "../../store/reducers/auth";
import { setAlert } from "../../store/reducers/alert-reducer";

const ScreenRegister = () => {
  const dispatch = useDispatch();
  const { isAuthenticate } = useSelector((state) => state.auth);

  if (isAuthenticate) {
    return <Redirect to="/dashboard" />;
  }

  const onRegister = (user) => {
    if (user?.password !== user?.confirmPassword) {
      dispatch(
        setAlert({
          message: "Password not Match",
          type: "danger",
        })
      );
    } else {
      dispatch(register(user));
    }
  };

  return <Register onRegister={(user) => onRegister(user)} />;
};

export default ScreenRegister;
