import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

import Spinner from "../components/layout/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticate, isLoading } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <Spinner />
        ) : isAuthenticate ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
