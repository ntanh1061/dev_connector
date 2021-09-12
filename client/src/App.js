import React, { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./routes/Routes";
import setAuthToken from "./utils/setAuthToken";
import { authorizeUser, logout } from "./store/reducers/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch(authorizeUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) {
        console.log("LOGOUT");
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Routes />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default App;
